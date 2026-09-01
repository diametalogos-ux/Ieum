const reviews = [
  { avatar: '👰', name: '김○○ 신부', date: '2024.09',
    text: '정말 예쁘게 만들었어요! 하객분들이 청첩장이 너무 예쁘다고 칭찬해주셨어요. 무료인데 이 퀄리티면 진짜 최고예요.' },
  { avatar: '🤵', name: '이○○ 신랑', date: '2024.10',
    text: '수정이 실시간으로 되니까 너무 편했어요. 예식장 정보를 잘못 입력했는데 바로 고칠 수 있어서 정말 다행이었어요.' },
  { avatar: '👰', name: '박○○ 신부', date: '2024.11',
    text: '테마가 다양해서 고르는 재미가 있었어요. 갤러리 기능이랑 방명록을 특히 잘 썼는데 너무 좋았습니다!' },
  { avatar: '🤵', name: '정○○ 신랑', date: '2024.12',
    text: '다른 서비스들은 워터마크가 있거나 유료였는데, 여기는 정말 무료로 다 되네요. RSVP 기능도 편하게 잘 받았어요.' },
]

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-28 px-6" style={{ background: '#fafafa' }}>
      <div className="max-w-6xl mx-auto">

        {/* 헤더 */}
        <div className="text-center mb-16">
          <p className="text-xs font-sans text-neutral-400 tracking-[0.2em] uppercase mb-5">Reviews</p>
          <h2 className="font-bold text-neutral-900 leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontFamily: "'Noto Serif KR', serif" }}>
            실제 커플들의<br />생생한 후기
          </h2>
        </div>

        {/* 후기 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 md:p-8" style={{ border: '1px solid #f0f0f0' }}>
              <div className="text-amber-400 text-sm mb-5 tracking-wider">★★★★★</div>
              <p className="text-neutral-600 font-sans text-[15px] leading-relaxed mb-6">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-lg flex-shrink-0">
                  {r.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800 font-sans">{r.name}</p>
                  <p className="text-xs text-neutral-400 font-sans">{r.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
