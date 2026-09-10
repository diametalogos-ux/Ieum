'use client'

type Props = {
  className?: string
  children?: React.ReactNode
}

/**
 * 문의 링크 — 아직 정식 문의 채널이 없어 클릭 시 "준비중" 안내.
 * 실제 문의는 인스타(@ieum.mlog)를 안내할 예정.
 */
export default function InquiryLink({ className, children = '문의' }: Props) {
  return (
    <button
      type="button"
      onClick={() => alert('문의 채널은 준비 중이에요.\n인스타그램 @ieum.mlog 로 DM 주세요.')}
      className={className}
    >
      {children}
    </button>
  )
}
