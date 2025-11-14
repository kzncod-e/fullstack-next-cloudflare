import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import("next").NextConfig} */
const nextConfig = {
    /* config options here */
     cloudflare: {
    wrangler: {
      remote: false,
    },
  },
};


    initOpenNextCloudflareForDev();


export default nextConfig;
