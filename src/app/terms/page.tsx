import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: '서비스 이용약관 · 이음',
  description: '이음(Ieum) 모바일 청첩장 서비스의 이용약관입니다.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="mx-auto w-full max-w-3xl px-6 pt-28 pb-20 md:pt-32">
        <p className="text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase">
          Terms of Service
        </p>
        <h1 className="font-serif mt-3 text-3xl font-semibold text-neutral-900 md:text-4xl">
          서비스 이용약관
        </h1>
        <p className="mt-3 text-xs text-neutral-500">
          시행일: 2026년 9월 8일
        </p>

        <div className="mt-10 space-y-10 text-sm leading-relaxed text-neutral-700">
          <p>
            이 약관은 유다희(이하 &quot;운영자&quot;)가 제공하는 모바일 청첩장
            서비스 &quot;이음(Ieum)&quot;(이하 &quot;서비스&quot;) 이용에 관한
            운영자와 이용자 간의 권리·의무·책임사항 등을 정함을 목적으로 합니다.
          </p>

          <Section num="1" title="용어의 정의">
            <ul className="ml-4 list-disc space-y-1">
              <li>
                <strong>서비스:</strong> 운영자가 제공하는 모바일 청첩장 제작·저장·공유 및 관리 기능
              </li>
              <li>
                <strong>이용자:</strong> 본 약관에 동의하고 서비스를 이용하는 모든 회원
              </li>
              <li>
                <strong>회원:</strong> Google 계정으로 로그인하여 서비스 이용 계정을 발급받은 자
              </li>
              <li>
                <strong>게시물:</strong> 이용자가 서비스 내에 등록·업로드한 모든 텍스트·이미지·데이터
              </li>
              <li>
                <strong>하객:</strong> 회원의 청첩장 링크를 통해 방명록·참석여부·사진 등을 남기는 비회원
              </li>
            </ul>
          </Section>

          <Section num="2" title="약관의 효력 및 변경">
            <ul className="ml-4 list-disc space-y-1">
              <li>본 약관은 서비스에 접속·이용하는 모든 이용자에게 적용됩니다.</li>
              <li>
                운영자는 관련 법령에 위배되지 않는 범위 내에서 약관을 개정할 수
                있으며, 개정 시 최소 7일 전부터 서비스 내에 공지합니다.
              </li>
              <li>
                이용자가 개정 약관에 동의하지 않을 경우 서비스 이용을 중단하고
                회원 탈퇴할 수 있습니다.
              </li>
            </ul>
          </Section>

          <Section num="3" title="이용계약의 성립">
            <ul className="ml-4 list-disc space-y-1">
              <li>
                이용계약은 이용자가 본 약관 및 개인정보처리방침에 동의하고,
                Google 계정으로 로그인을 완료한 시점에 성립합니다.
              </li>
              <li>
                이용자는 하나의 계정만 생성할 수 있으며, 타인의 정보를 도용하여
                가입할 수 없습니다.
              </li>
              <li>
                서비스는 만 19세 이상의 성인을 대상으로 제공됩니다.
              </li>
            </ul>
          </Section>

          <Section num="4" title="서비스의 내용">
            <ul className="ml-4 list-disc space-y-1">
              <li>모바일 청첩장 제작 및 편집</li>
              <li>제작한 청첩장의 링크 기반 공유</li>
              <li>하객의 참석여부(RSVP), 방명록, 사진 업로드 기능</li>
              <li>화환 주문 위탁 링크 제공 (제7조 참조)</li>
              <li>기타 운영자가 서비스 안정성과 사용자 편의를 위해 제공하는 부가 기능</li>
            </ul>
            <p className="text-xs text-neutral-500">
              운영자는 서비스 개선을 위해 사전 공지 후 일부 기능을 변경·추가·중단할 수 있습니다.
            </p>
          </Section>

          <Section num="5" title="서비스의 이용">
            <ul className="ml-4 list-disc space-y-1">
              <li>서비스는 연중무휴 24시간 제공을 원칙으로 합니다.</li>
              <li>
                시스템 점검·정기 유지보수·불가항력적 사유로 일시 중단될 수
                있으며, 사전 공지 또는 사후 안내를 통해 이용자에게 알립니다.
              </li>
              <li>
                청첩장은 계정 유지 기간 동안 무기한 보관되며, 회원 탈퇴 시
                모든 게시물이 삭제됩니다.
              </li>
            </ul>
          </Section>

          <Section num="6" title="이용자의 의무">
            <p>이용자는 다음 행위를 해서는 안 됩니다.</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>타인의 개인정보·계정을 도용하는 행위</li>
              <li>타인의 저작권·초상권 등 지적재산권을 침해하는 게시물 등록</li>
              <li>음란·폭력·차별 등 공서양속에 반하는 내용의 게시</li>
              <li>서비스의 정상적 운영을 방해하는 행위 (크롤링, 어뷰징 등)</li>
              <li>영리 목적의 광고·홍보성 콘텐츠 게시</li>
            </ul>
            <p>
              이용자는 자신이 등록한 게시물에 대해 저작권 등 제3자의 권리를
              침해하지 않음을 보증하며, 침해로 인한 분쟁 및 손해배상 책임은
              해당 이용자에게 있습니다.
            </p>
          </Section>

          <Section num="7" title="제휴 서비스 (화환 주문)">
            <ul className="ml-4 list-disc space-y-1">
              <li>
                운영자는 이용자와 하객의 편의를 위해 제휴사{' '}
                <strong>꽃비(꽃비 비즈니스 쇼핑몰)</strong>의 화환 상점 링크와
                배송정보 자동 입력 기능을 제공합니다.
              </li>
              <li>
                <strong>
                  화환 상품의 결제·배송·취소·환불·고객문의는 꽃비에서 직접
                  처리
                </strong>
                하며, 운영자는 이에 관하여 어떠한 책임도 지지 않습니다.
              </li>
              <li>
                화환 서비스 이용 시 꽃비의 이용약관 및 개인정보처리방침이
                별도로 적용되며, 이용자·하객은 이를 반드시 확인해야 합니다.
              </li>
            </ul>
          </Section>

          <Section num="8" title="게시물의 저작권 및 관리">
            <ul className="ml-4 list-disc space-y-1">
              <li>
                이용자가 등록한 게시물의 저작권은 해당 이용자에게 귀속됩니다.
              </li>
              <li>
                이용자는 서비스 제공에 필요한 범위(청첩장 화면 표시, 링크 공유
                등) 내에서 운영자가 게시물을 이용하는 것에 동의합니다.
              </li>
              <li>
                게시물이 제3자의 권리를 침해하거나 관련 법령에 위반될 경우,
                운영자는 사전 통지 없이 해당 게시물을 삭제·비공개 처리할 수
                있습니다.
              </li>
            </ul>
          </Section>

          <Section num="9" title="서비스 이용 제한 및 계약 해지">
            <ul className="ml-4 list-disc space-y-1">
              <li>
                이용자가 본 약관을 위반하거나 서비스의 정상 운영을 방해하는 경우,
                운영자는 사전 통지 후 서비스 이용을 일시 정지하거나 계정을
                삭제할 수 있습니다.
              </li>
              <li>
                이용자는 서비스 내 &quot;회원 탈퇴&quot; 기능 또는 이메일 문의를
                통해 언제든지 이용계약을 해지할 수 있습니다.
              </li>
              <li>계정 삭제 시 관련 게시물은 즉시 파기됩니다.</li>
            </ul>
          </Section>

          <Section num="10" title="운영자의 면책">
            <ul className="ml-4 list-disc space-y-1">
              <li>
                운영자는 천재지변, 통신 장애, 제3자 서비스(Google, Supabase,
                Vercel, 카카오, 꽃비 등)의 장애 등 불가항력적 사유로 인한
                서비스 중단·손해에 대해 책임을 지지 않습니다.
              </li>
              <li>
                이용자 본인의 부주의(비밀번호 관리 소홀 등) 또는 제3자의
                불법행위로 인한 손해에 대해서도 책임을 지지 않습니다.
              </li>
              <li>
                이용자 간, 이용자와 하객 간, 이용자와 제휴사 간에 발생한 분쟁에
                대해 운영자는 개입할 의무가 없으며, 이로 인한 손해를 배상하지
                않습니다.
              </li>
            </ul>
          </Section>

          <Section num="11" title="개인정보의 보호">
            <p>
              이용자의 개인정보 처리에 관한 사항은 별도의{' '}
              <Link
                href="/privacy"
                className="text-neutral-900 underline underline-offset-2"
              >
                개인정보처리방침
              </Link>
              을 따릅니다.
            </p>
          </Section>

          <Section num="12" title="준거법 및 관할">
            <ul className="ml-4 list-disc space-y-1">
              <li>본 약관의 해석 및 적용은 대한민국 법령에 따릅니다.</li>
              <li>
                서비스 이용과 관련하여 분쟁이 발생한 경우, 관할 법원은 민사소송법이
                정하는 절차에 따른 법원을 제1심 법원으로 합니다.
              </li>
            </ul>
          </Section>

          <Section num="13" title="문의처">
            <div className="rounded-2xl bg-neutral-50 p-5 text-xs">
              <p className="font-medium text-neutral-900">서비스 운영자</p>
              <ul className="mt-2 space-y-0.5">
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
            </div>
          </Section>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-neutral-100 pt-6 text-xs text-neutral-500">
          <Link href="/privacy" className="hover:text-neutral-900">
            → 개인정보처리방침
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
