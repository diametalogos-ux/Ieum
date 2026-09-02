import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 폰/외부 기기에서 dev 서버 접속 시 hydration 활성화
  allowedDevOrigins: [
    '192.168.29.24',
    '*.ngrok-free.dev',
    '*.ngrok-free.app',
    '*.ngrok.io',
  ],
};

export default nextConfig;
