/**
 * Hero 아래에 배치되는 시각적 브레이크 섹션.
 * 실제 청첩장 인트로 이미지를 풀 폭으로 노출해 "결과물" 미리보기.
 */
export default function PreviewImageSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-[3/4] w-full md:aspect-[16/9]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/main3-ai.png"
          alt="이음 청첩장 미리보기"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* 상하 부드러운 페이드 — 인접 섹션과 자연스러운 연결 */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.45) 100%)',
          }}
        />

        {/* 하단 카피 */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-14 text-center text-white md:pb-20">
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase drop-shadow-sm md:text-[11px]">
            Ieum · Wedding Invitation
          </p>
          <p className="font-serif mt-3 text-2xl leading-relaxed tracking-tight drop-shadow-md md:text-4xl md:leading-tight">
            두 사람의 이야기를
            <br />
            가장 아름답게
          </p>
        </div>
      </div>
    </section>
  )
}
