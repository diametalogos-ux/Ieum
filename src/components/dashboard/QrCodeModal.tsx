'use client'

import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'

type Props = {
  url: string
  title: string
  onClose: () => void
}

export default function QrCodeModal({ url, title, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    QRCode.toCanvas(canvas, url, {
      width: 288,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#171717',
        light: '#ffffff',
      },
    })
      .then(() => setReady(true))
      .catch((err) => {
        console.error('QR generation failed', err)
      })
  }, [url])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dataUrl = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `청첩장_QR_${title || 'invite'}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="mx-6 w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-medium tracking-[0.3em] text-neutral-400 uppercase">
              QR Code
            </p>
            <h3 className="font-serif mt-1 text-lg font-semibold text-neutral-900">
              청첩장 QR 코드
            </h3>
          </div>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mt-5 flex flex-col items-center">
          <div className="rounded-2xl border border-neutral-100 bg-white p-3">
            <canvas ref={canvasRef} className="block" />
            {!ready && (
              <div className="flex h-72 w-72 items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
              </div>
            )}
          </div>
          <p className="mt-3 max-w-full break-all text-center text-[11px] text-neutral-500">
            {url}
          </p>
          {copied && (
            <p className="mt-1 text-[11px] text-emerald-600">주소가 복사되었어요</p>
          )}
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 rounded-full border border-neutral-200 bg-white py-2.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            주소 복사
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={!ready}
            className="flex-1 rounded-full bg-neutral-900 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-40"
          >
            PNG 저장
          </button>
        </div>
      </div>
    </div>
  )
}
