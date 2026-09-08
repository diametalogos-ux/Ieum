import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: '개인정보처리방침 · 이음',
  description: '이음(Ieum) 모바일 청첩장 서비스의 개인정보처리방침입니다.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="mx-auto w-full max-w-3xl px-6 pt-28 pb-20 md:pt-32">
        <p className="text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase">
          Privacy Policy
        </p>
        <h1 className="font-serif mt-3 text-3xl font-semibold text-neutral-900 md:text-4xl">
          개인정보처리방침
        </h1>
        <p className="mt-3 text-xs text-neutral-500">
          시행일: 2026년 9월 8일 · 최종 개정: 2026년 9월 8일
        </p>

        <div className="mt-10 space-y-10 text-sm leading-relaxed text-neutral-700">
          <p>
            이음(이하 &quot;서비스&quot;)의 운영자 유다희(이하 &quot;운영자&quot;)는
            이용자의 개인정보를 소중하게 여기며, 「개인정보 보호법」 등 관련
            법령을 준수합니다. 본 방침은 서비스 이용 과정에서 수집되는 개인정보의
            처리에 관한 사항을 안내드립니다.
          </p>

          <Section num="1" title="수집하는 개인정보 항목">
            <p>운영자는 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.</p>

            <SubHeading>가. 회원가입 · 로그인 시</SubHeading>
            <ul className="ml-4 list-disc space-y-1">
              <li>이메일 주소, 이름, 프로필 이미지 (Google OAuth 통해 자동 수집)</li>
              <li>Supabase 사용자 식별자</li>
            </ul>

            <SubHeading>나. 청첩장 제작 및 관리 시 (이용자가 직접 입력)</SubHeading>
            <ul className="ml-4 list-disc space-y-1">
              <li>신랑·신부 및 양가 부모의 성명, 연락처</li>
              <li>예식일시, 예식장 이름·주소·우편번호</li>
              <li>계좌 정보 (은행명, 계좌번호, 예금주)</li>
              <li>사진 이미지 (메인 사진, 갤러리, 공유 이미지)</li>
              <li>인사말, 방명록 및 참석여부 메시지 등 텍스트 콘텐츠</li>
            </ul>

            <SubHeading>다. 하객(비회원)이 남기는 정보</SubHeading>
            <ul className="ml-4 list-disc space-y-1">
              <li>참석여부(RSVP): 이름, 참석/미참석, 인원, 식사여부, 연락처(선택), 메시지</li>
              <li>방명록: 이름, 메시지</li>
              <li>하객 사진 업로드: 이름(선택), 메시지(선택), 이미지</li>
            </ul>

            <SubHeading>라. 서비스 이용 과정에서 자동 수집</SubHeading>
            <ul className="ml-4 list-disc space-y-1">
              <li>IP 주소, 접속 로그, 브라우저 정보</li>
              <li>인증 세션 쿠키</li>
            </ul>
          </Section>

          <Section num="2" title="개인정보 수집 및 이용 목적">
            <ul className="ml-4 list-disc space-y-1">
              <li>회원 가입·본인 확인·로그인 등 서비스 이용에 따른 본인 확인</li>
              <li>모바일 청첩장 제작·저장·공유·관리 기능 제공</li>
              <li>하객의 참석여부 응답·방명록·사진 업로드 등 커뮤니케이션 기능 제공</li>
              <li>화환 주문 시 배송정보 자동 전달 (제3자 제공 항 참조)</li>
              <li>서비스 안정성 확보 및 이용 통계 분석</li>
              <li>공지사항 전달 및 이용자 문의 대응</li>
            </ul>
          </Section>

          <Section num="3" title="개인정보의 보유 및 이용 기간">
            <p>
              운영자는 이용자의 개인정보를 회원 탈퇴 시까지 보유하며, 회원 탈퇴 시
              즉시 파기합니다. 다만, 관련 법령에 따라 보존이 필요한 경우 아래
              기간 동안 보관합니다.
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>서비스 이용 로그, 접속 기록 등: 3개월 (통신비밀보호법)</li>
            </ul>
          </Section>

          <Section num="4" title="개인정보의 제3자 제공">
            <p>
              운영자는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.
              다만, 아래의 경우에 한하여 최소한의 범위 내에서 제공합니다.
            </p>

            <SubHeading>가. 화환 서비스 이용 시 (선택)</SubHeading>
            <ul className="ml-4 list-disc space-y-1">
              <li>
                <strong>제공받는 자:</strong> 꽃비(꽃비 비즈니스 쇼핑몰)
              </li>
              <li>
                <strong>제공 목적:</strong> 화환 상품 주문·결제·배송을 위한
                배송지 및 수령인 정보 자동 입력
              </li>
              <li>
                <strong>제공 항목:</strong> 수령인 성명·관계·연락처, 예식장 주소
                및 상세주소, 예식일시, 청첩장 URL
              </li>
              <li>
                <strong>보유 및 이용 기간:</strong> 꽃비의 자체 개인정보처리방침에 따름
              </li>
            </ul>
            <p className="text-xs text-neutral-500">
              화환 상품의 결제·배송·환불·고객문의는 꽃비에서 직접 처리하며,
              해당 서비스 이용 시 꽃비의 약관 및 개인정보처리방침이 별도로 적용됩니다.
            </p>

            <SubHeading>나. 법적 의무에 따른 제공</SubHeading>
            <p>
              법령에 근거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라
              수사기관의 요구가 있는 경우에 한하여 제공합니다.
            </p>
          </Section>

          <Section num="5" title="개인정보 처리 위탁">
            <p>
              운영자는 서비스 제공을 위해 아래와 같이 개인정보 처리 업무를
              위탁하고 있습니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50">
                    <th className="px-3 py-2 text-left font-medium">수탁업체</th>
                    <th className="px-3 py-2 text-left font-medium">위탁 업무</th>
                    <th className="px-3 py-2 text-left font-medium">소재</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="px-3 py-2">Supabase, Inc.</td>
                    <td className="px-3 py-2">회원 인증, 데이터베이스, 파일 저장</td>
                    <td className="px-3 py-2">미국</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Vercel, Inc.</td>
                    <td className="px-3 py-2">웹 호스팅 및 배포</td>
                    <td className="px-3 py-2">미국</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Google LLC</td>
                    <td className="px-3 py-2">OAuth 로그인</td>
                    <td className="px-3 py-2">미국</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">카카오</td>
                    <td className="px-3 py-2">지도 표시, 카카오톡 공유</td>
                    <td className="px-3 py-2">대한민국</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-neutral-500">
              위탁 계약 시 「개인정보 보호법」 제26조에 따라 위탁 업무 수행 목적
              외 개인정보 처리 금지, 기술적·관리적 보호조치, 재위탁 제한,
              수탁자에 대한 관리·감독 등을 계약서에 명시합니다.
            </p>
          </Section>

          <Section num="6" title="국외 이전에 관한 사항">
            <p>
              Supabase, Vercel, Google 등 일부 수탁업체는 미국에 서버가 위치해
              있어 이용자의 개인정보가 미국으로 이전될 수 있습니다. 국외 이전 시
              「개인정보 보호법」에 따른 안전조치를 준수합니다.
            </p>
          </Section>

          <Section num="7" title="이용자의 권리와 행사 방법">
            <p>이용자는 언제든지 아래 권리를 행사할 수 있습니다.</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>개인정보 열람 요구</li>
              <li>오류 정정 및 삭제 요구</li>
              <li>처리 정지 요구</li>
              <li>회원 탈퇴 및 개인정보 삭제 요구</li>
            </ul>
            <p>
              권리 행사는 서비스 내 계정 설정 또는 아래의 문의처로 이메일을
              보내는 방법으로 가능합니다. 요청 접수 후 7일 이내에 처리합니다.
            </p>
          </Section>

          <Section num="8" title="개인정보의 파기 절차 및 방법">
            <ul className="ml-4 list-disc space-y-1">
              <li>
                <strong>파기 시점:</strong> 회원 탈퇴 요청 시 즉시, 관련 법령상
                보존이 필요한 경우 해당 기간 종료 후 파기
              </li>
              <li>
                <strong>파기 방법:</strong> 전자적 파일 형태의 정보는 복구
                불가능한 방법으로 영구 삭제, 종이 문서는 분쇄 파기
              </li>
            </ul>
          </Section>

          <Section num="9" title="개인정보의 안전성 확보 조치">
            <ul className="ml-4 list-disc space-y-1">
              <li>Supabase의 Row Level Security를 통한 접근 통제</li>
              <li>HTTPS 통신 암호화</li>
              <li>OAuth 인증 기반의 안전한 로그인</li>
              <li>서비스 접근 권한 최소화</li>
            </ul>
          </Section>

          <Section num="10" title="아동의 개인정보 보호">
            <p>
              이 서비스는 만 19세 이상의 성인 이용자를 대상으로 제공됩니다.
              운영자는 만 14세 미만 아동의 개인정보를 의도적으로 수집하지 않으며,
              수집 사실이 확인될 경우 즉시 파기합니다.
            </p>
          </Section>

          <Section num="11" title="쿠키 및 자동수집 기술">
            <p>
              서비스는 로그인 상태 유지를 위해 인증 세션 쿠키를 사용합니다.
              이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으며, 이 경우
              일부 서비스 이용에 제한이 있을 수 있습니다.
            </p>
          </Section>

          <Section num="12" title="개인정보 보호책임자">
            <div className="rounded-2xl bg-neutral-50 p-5">
              <p className="font-medium text-neutral-900">개인정보 보호책임자</p>
              <ul className="mt-2 space-y-0.5 text-xs">
                <li>성명: 유다희</li>
                <li>
                  이메일:{' '}
                  <a
                    href="mailto:tkdkagody@gmail.com"
                    className="text-neutral-800 underline underline-offset-2"
                  >
                    tkdkagody@gmail.com
                  </a>
                </li>
              </ul>
              <p className="mt-3 text-[11px] text-neutral-500">
                개인정보 관련 문의는 위 이메일로 접수해 주시면 신속히
                답변드리겠습니다.
              </p>
            </div>
          </Section>

          <Section num="13" title="개정에 관한 사항">
            <p>
              본 방침은 법령·정책 또는 서비스 변경 사항에 따라 수정될 수
              있으며, 개정 시 시행일 최소 7일 전부터 서비스 내에 공지합니다.
              중대한 변경 시에는 30일 전에 공지합니다.
            </p>
          </Section>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-neutral-100 pt-6 text-xs text-neutral-500">
          <Link href="/terms" className="hover:text-neutral-900">
            → 서비스 이용약관
          </Link>
          <Link href="/" className="hover:text-neutral-900">
            홈으로
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}

function Section({
  num,
  title,
  children,
}: {
  num: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="font-serif text-lg font-semibold text-neutral-900">
        제{num}조 · {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[13px] font-medium text-neutral-800">{children}</p>
  )
}
