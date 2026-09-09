import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 폰/외부 기기에서 dev 서버 접속 시 hydration 활성화
  allowedDevOrigins: [
    '192.168.29.24',
    '*.ngrok-free.dev',
    '*.ngrok-free.app',
    '*.ngrok.io',
  ],
  // 서비스 분리 이전에 배포/공유된 URL 하위호환 유지
  async redirects() {
    return [
      { source: '/invite/:slug', destination: '/wedding/invite/:slug', permanent: true },
    ]
  },
};

export default nextConfig;
