import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '이음 · 화환 주문'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// 이미지에 실제 쓰이는 글자들만 subset으로 요청 → 폰트 파일 최소화
const TEXT_SUBSET =
  'IEUM·WREATH꽃으로대신하는당신의마음축하와위로를정성스럽게전합니다이음모바일청첩장주문지금하기→'

/**
 * Google Fonts CSS API에서 text 파라미터로 subset 요청 후 폰트 파일 URL 추출.
 * text 파라미터가 있으면 unicode-range 서브셋이 아닌 단일 폰트 파일로 응답.
 */
async function loadGoogleFont(
  family: string,
  weight: number,
  text: string
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:wght@${weight}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const match = css.match(/src: url\((https:\/\/[^)]+)\)/)
  if (!match) throw new Error(`font url not found for ${family}@${weight}`)
  const res = await fetch(match[1])
  if (!res.ok) throw new Error(`font fetch failed: ${res.status}`)
  return res.arrayBuffer()
}

export default async function Image() {
  const [notoBold, notoRegular] = await Promise.all([
    loadGoogleFont('Noto Sans KR', 700, TEXT_SUBSET),
    loadGoogleFont('Noto Sans KR', 400, TEXT_SUBSET),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: '#ffffff',
          fontFamily: 'Noto Sans KR',
          position: 'relative',
        }}
      >
        {/* 상단: 브랜드 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 8,
              color: '#8a7a6e',
              fontWeight: 700,
            }}
          >
            IEUM · WREATH
          </div>
          <div
            style={{
              marginTop: 12,
              width: 60,
              height: 2,
              background: '#8a7a6e',
              opacity: 0.4,
            }}
          />
        </div>

        {/* 중앙: 큰 카피 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.1,
              color: '#1a1a1a',
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            꽃으로 대신하는
          </div>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.1,
              color: '#1a1a1a',
              fontWeight: 700,
              letterSpacing: -2,
              marginTop: 8,
            }}
          >
            당신의 마음
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 30,
              color: '#4a4a4a',
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            축하와 위로를 꽃으로 정성스럽게 전합니다
          </div>
        </div>

        {/* 하단: 서비스 배지 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: '#1a1a1a',
                letterSpacing: -1,
              }}
            >
              이음
            </div>
            <div
              style={{
                fontSize: 22,
                color: '#8a7a6e',
                fontWeight: 400,
              }}
            >
              · 모바일 청첩장 · 화환 주문
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 28px',
              borderRadius: 999,
              background: '#1a1a1a',
              color: '#fff',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            지금 주문하기 →
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Noto Sans KR', data: notoBold, weight: 700 },
        { name: 'Noto Sans KR', data: notoRegular, weight: 400 },
      ],
    }
  )
}
