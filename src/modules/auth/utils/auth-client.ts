import { createAuthClient } from "better-auth/react";

// Create the auth client for client-side usage
// The baseURL is automatically determined from the current origin in the browser
// This ensures social sign-in redirects work correctly whether running on
// localhost:3000 (next dev), localhost:8787 (wrangler dev), or production
export const authClient = createAuthClient({
    baseURL:
        typeof window !== "undefined"
            ? window.location.origin
            : "",
});
