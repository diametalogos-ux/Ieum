'use client'

/**
 * 카카오 JavaScript SDK v2 로더 + 공유 (sendDefault).
 * 환경변수: NEXT_PUBLIC_KAKAO_JS_KEY
 * 카카오 개발자 콘솔 > 플랫폼 키 > JavaScript 키의 SDK 도메인에 도메인 등록 필요.
 */

const SCRIPT_ID = 'kakao-sdk-v2'
const SCRIPT_SRC = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js'

type KakaoSDK = {
  isInitialized: () => boolean
  init: (key: string) => void
  Share: {
    sendDefault: (options: {
      objectType: 'feed'
      content: {
        title: string
        description: string
        imageUrl?: string
        link: { mobileWebUrl: string; webUrl: string }
      }
      buttons?: {
        title: string
        link: { mobileWebUrl: string; webUrl: string }
      }[]
    }) => void
  }
}

declare global {
  interface Window {
    Kakao?: KakaoSDK
  }
}

async function loadKakaoSDK(): Promise<KakaoSDK> {
  if (window.Kakao?.isInitialized()) return window.Kakao

  if (!window.Kakao) {
    await new Promise<void>((resolve, reject) => {
      const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true })
        existing.addEventListener('error', () => reject(new Error('load failed')), {
          once: true,
        })
        return
      }
      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.src = SCRIPT_SRC
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('load failed'))
      document.head.appendChild(script)
    })
  }

  const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY
  if (!key || key === 'your_kakao_js_key') {
    throw new Error('NEXT_PUBLIC_KAKAO_JS_KEY 미설정')
  }
  if (!window.Kakao) throw new Error('Kakao SDK load 실패')
  if (!window.Kakao.isInitialized()) window.Kakao.init(key)
  return window.Kakao
}

export type ShareContent = {
  title: string
  description: string
  imageUrl?: string
  url: string
}

export async function shareToKakao(content: ShareContent): Promise<void> {
  const kakao = await loadKakaoSDK()
  kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: content.title,
      description: content.description,
      imageUrl: content.imageUrl,
      link: { mobileWebUrl: content.url, webUrl: content.url },
    },
    buttons: [
      {
        title: '청첩장 보기',
        link: { mobileWebUrl: content.url, webUrl: content.url },
      },
    ],
  })
}
