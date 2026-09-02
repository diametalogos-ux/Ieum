const reviews = [
  {
    name: '김○○ 신부',
    date: '2024.09',
    text: '정말 예쁘게 만들었어요! 하객분들이 청첩장이 너무 예쁘다고 칭찬해주셨어요. 무료인데 이 퀄리티면 진짜 최고예요.',
  },
  {
    name: '이○○ 신랑',
    date: '2024.10',
    text: '수정이 실시간으로 되니까 너무 편했어요. 예식장 정보를 잘못 입력했는데 바로 고칠 수 있어서 정말 다행이었어요.',
  },
  {
    name: '박○○ 신부',
    date: '2024.11',
    text: '테마가 다양해서 고르는 재미가 있었어요. 갤러리 기능이랑 방명록을 특히 잘 썼는데 너무 좋았습니다!',
  },
  {
    name: '정○○ 신랑',
    date: '2024.12',
    text: '다른 서비스들은 워터마크가 있거나 유료였는데, 여기는 정말 무료로 다 되네요. RSVP 기능도 편하게 잘 받았어요.',
  },
]

export default function ReviewsSection() {
  return (
    <section id="reviews" className="bg-neutral-50 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase">
            Reviews
          </p>
          <h2 className="font-serif mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-4xl">
            실제 커플들의
            <br />
            생생한 후기
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col justify-between rounded-2xl border border-neutral-100 bg-white p-8 transition-shadow hover:shadow-lg hover:shadow-neutral-200/40"
            >
              <div>
                <div className="flex gap-0.5 text-amber-400">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i} className="text-sm">{s}</span>
                  ))}
                </div>
                <blockquote className="mt-5 text-[15px] leading-relaxed text-neutral-700">
                  “{r.text}”
                </blockquote>
              </div>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 font-serif text-sm font-semibold text-rose-400">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{r.name}</p>
                  <p className="text-xs text-neutral-400">{r.date}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
