/** biome-ignore-all lint/style/noNonNullAssertion: <we will make sure it's not null> */
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { getDb } from "@/db";
import type { AuthUser } from "@/modules/auth/models/user.model";

/**
 * Cached auth instance singleton so we don't create a new instance every time
 */
let cachedAuth: ReturnType<typeof betterAuth> | null = null;

/**
 * Create auth instance dynamically to avoid top-level async issues
 */
async function getAuth() {
    if (cachedAuth) {
        return cachedAuth;
    }

    const { env: cloudflareEnv } = await getCloudflareContext();
    // cloudflare context env has a generated type; cast to any so we can
    // read custom env vars like BETTER_AUTH_TRUSTED_ORIGINS without TypeScript errors
    const env = cloudflareEnv as any;
    const db = await getDb();

    cachedAuth = betterAuth({
        secret: env.BETTER_AUTH_SECRET,
        database: drizzleAdapter(db, {
            provider: "sqlite",
        }),
        // Trusted origins for OAuth callbacks and CORS-sensitive flows.
        // Accept a comma-separated list via BETTER_AUTH_TRUSTED_ORIGINS or
        // fallback to common local dev origins (3000 for Next, 8787 for wrangler dev).
        trustedOrigins: (env.BETTER_AUTH_TRUSTED_ORIGINS
            ? String(env.BETTER_AUTH_TRUSTED_ORIGINS).split(",").map((s) => s.trim())
            : [env.BETTER_AUTH_URL ?? "http://localhost:3000", "http://localhost:8787"]
        ).filter(Boolean),
        emailAndPassword: {
            enabled: true,
        },
        socialProviders: {
            google: {
                enabled: true,
                clientId: env.GOOGLE_CLIENT_ID!,
                clientSecret: env.GOOGLE_CLIENT_SECRET!,
            },
        },
        plugins: [nextCookies()],
    });

    return cachedAuth;
}
/**
 * Get the current authenticated user from the session
 * Returns null if no user is authenticated
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
    try {
        const auth = await getAuth();
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return null;
        }

        return {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
        };
    } catch (error) {
        console.error("Error getting current user:", error);
        return null;
    }
}

/**
 * Get the current authenticated user or throw an error
 * Use this when authentication is required
 */
export async function requireAuth(): Promise<AuthUser> {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Authentication required");
    }

    return user;
}

/**
 * Check if a user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
    const user = await getCurrentUser();
    return user !== null;
}

/**
 * Get the auth instance for use in server actions and API routes
 */
export async function getAuthInstance() {
    return await getAuth();
}

/**
 * Get session information
 */
export async function getSession() {
    try {
        const auth = await getAuth();
        return await auth.api.getSession({
            headers: await headers(),
        });
    } catch (error) {
        console.error("Error getting session:", error);
        return null;
    }
}
