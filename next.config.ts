import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows live-reload (HMR) when the site is opened from another device on the
  // local network (e.g. a phone) via this machine's LAN IP instead of localhost.
  allowedDevOrigins: ["192.168.1.230"],
};

export default nextConfig;
