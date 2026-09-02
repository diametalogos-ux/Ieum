'use client'

import { useEditor } from '../EditorContext'

export default function NoticeEditor() {
  const { data, addItem, updateItem, removeItem, moveItem } = useEditor()

  const handleAdd = () => {
    addItem('notices', {
      id: `n-${Date.now()}`,
      content: '',
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium text-neutral-700">
          공지 <span className="text-neutral-400">({data.notices.length})</span>
        </p>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 rounded-full bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-neutral-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          추가
        </button>
      </div>

      {data.notices.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-white/60 py-6 text-center">
          <p className="text-xs text-neutral-500">공지사항을 추가해보세요</p>
        </div>
      ) : (
        <div className="space-y-2">
          {data.notices.map((item, idx) => (
            <div
              key={item.id}
              className="rounded-lg border border-neutral-200 bg-white p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-medium text-neutral-400">
                  공지 {idx + 1}
                </span>
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => moveItem('notices', item.id, 'up')}
                    disabled={idx === 0}
                    className="flex h-7 w-7 items-center justify-center rounded text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 disabled:opacity-30"
                    aria-label="위로"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem('notices', item.id, 'down')}
                    disabled={idx === data.notices.length - 1}
                    className="flex h-7 w-7 items-center justify-center rounded text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 disabled:opacity-30"
                    aria-label="아래로"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem('notices', item.id)}
                    className="flex h-7 w-7 items-center justify-center rounded text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    aria-label="삭제"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    </svg>
                  </button>
                </div>
              </div>

              <textarea
                value={item.content}
                onChange={(e) =>
                  updateItem('notices', item.id, { content: e.target.value })
                }
                rows={2}
                placeholder="예: 화환은 정중히 사양합니다."
                className="w-full resize-none rounded-md border border-neutral-200 bg-white px-2.5 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
