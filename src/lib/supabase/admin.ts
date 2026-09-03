import { createClient } from '@supabase/supabase-js'

/**
 * 서버-서버 컨텍스트 전용 관리자 클라이언트.
 * RLS 를 우회하므로 절대 클라이언트 코드에 import 하지 말 것.
 * 사용처: 꽃비 등 외부 서비스가 인증 없이 호출하는 콜백 라우트.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되지 않았습니다. .env.local 과 배포 환경변수를 확인하세요.'
    )
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
