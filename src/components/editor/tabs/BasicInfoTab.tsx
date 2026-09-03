'use client'

import { useEditor } from '../EditorContext'
import EditorSection from '../ui/EditorSection'
import PaletteSelector from '../ui/PaletteSelector'
import { TextField, TextArea, Toggle, OptionGroup } from '../ui/EditorField'
import ImageUpload from '../ui/ImageUpload'
import type {
  FontType,
  IntroEffectType,
  ParticleType,
  ParentInfo,
  PersonInfo,
} from '@/types/invitation'

const FONT_OPTIONS: { value: FontType; label: string }[] = [
  { value: 'serif',  label: '세리프 (기본)' },
  { value: 'nanum',  label: '나눔명조' },
  { value: 'malgun', label: '맑은고딕' },
  { value: 'gothic', label: '고딕' },
]

const FONT_SIZE_OPTIONS: { value: 'sm' | 'md' | 'lg'; label: string }[] = [
  { value: 'sm', label: '작게' },
  { value: 'md', label: '보통' },
  { value: 'lg', label: '크게' },
]

const INTRO_EFFECT_OPTIONS: { value: IntroEffectType; label: string }[] = [
  { value: 'none',  label: '없음' },
  { value: 'fade',  label: '페이드' },
  { value: 'slide', label: '슬라이드' },
  { value: 'zoom',  label: '줌' },
]

const PARTICLE_OPTIONS: { value: ParticleType; label: string }[] = [
  { value: 'none',     label: '없음' },
  { value: 'cherry',   label: '벚꽃' },
  { value: 'snow',     label: '눈' },
  { value: 'confetti', label: '컨페티' },
  { value: 'star',     label: '별' },
]

type PersonKey = 'groom' | 'bride'
type ParentKey = 'groomFather' | 'groomMother' | 'brideFather' | 'brideMother'

function PersonFields({
  who,
  label,
  person,
  onChange,
}: {
  who: PersonKey
  label: string
  person: PersonInfo
  onChange: (patch: Partial<PersonInfo>) => void
}) {
  return (
    <div className="rounded-lg bg-neutral-50/60 p-3">
      <p className="mb-2 text-[11px] font-semibold text-neutral-700">{label}</p>
      <div className="grid grid-cols-[80px_1fr] gap-2">
        <TextField
          label="성"
          value={person.lastName}
          onChange={(e) => onChange({ lastName: e.target.value })}
          placeholder={who === 'groom' ? '김' : '이'}
          maxLength={5}
        />
        <TextField
          label="이름"
          value={person.firstName}
          onChange={(e) => onChange({ firstName: e.target.value })}
          placeholder={who === 'groom' ? '민준' : '서연'}
          maxLength={10}
        />
      </div>
      <div className="mt-2">
        <TextField
          label="연락처"
          type="tel"
          value={person.contact}
          onChange={(e) => onChange({ contact: e.target.value })}
          placeholder="010-0000-0000"
        />
      </div>
    </div>
  )
}

function ParentFields({
  label,
  parent,
  onChange,
}: {
  label: string
  parent: ParentInfo
  onChange: (patch: Partial<ParentInfo>) => void
}) {
  return (
    <div
      className={`rounded-lg p-3 transition-colors ${
        parent.visible ? 'bg-neutral-50/60' : 'bg-neutral-100/60 opacity-70'
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] font-semibold text-neutral-700">{label}</p>
        <label className="flex cursor-pointer items-center gap-1.5 text-[10px] text-neutral-500">
          <input
            type="checkbox"
            checked={parent.visible}
            onChange={(e) => onChange({ visible: e.target.checked })}
            className="h-3 w-3 accent-neutral-900"
          />
          청첩장에 표시
        </label>
      </div>
      <div className="grid grid-cols-[80px_1fr] gap-2">
        <TextField
          label="성"
          value={parent.lastName}
          onChange={(e) => onChange({ lastName: e.target.value })}
          maxLength={5}
        />
        <TextField
          label="이름"
          value={parent.firstName}
          onChange={(e) => onChange({ firstName: e.target.value })}
          maxLength={10}
        />
      </div>
      <label className="mt-2 flex cursor-pointer items-center gap-2 text-[11px] text-neutral-600">
        <input
          type="checkbox"
          checked={parent.deceased}
          onChange={(e) => onChange({ deceased: e.target.checked })}
          className="h-3.5 w-3.5 accent-neutral-900"
        />
        고인 (이름 앞에 <span className="font-medium text-neutral-800">故</span> 표시)
      </label>
    </div>
  )
}

export default function BasicInfoTab() {
  const { data, palette, setPalette, update, updateCouple, updateCeremony, requestImmediateSave } = useEditor()

  const patchPerson = (key: PersonKey, patch: Partial<PersonInfo>) => {
    updateCouple({ [key]: { ...data.couple[key], ...patch } })
  }
  const patchParent = (key: ParentKey, patch: Partial<ParentInfo>) => {
    updateCouple({ [key]: { ...data.couple[key], ...patch } })
  }

  return (
    <div>
      {/* 1. 템플릿 */}
      <EditorSection title="템플릿" description="색상과 글꼴을 선택하세요">
        <PaletteSelector value={palette} onChange={setPalette} />
        <OptionGroup
          label="글꼴"
          value={data.fontType}
          options={FONT_OPTIONS}
          onChange={(v) => update('fontType', v)}
        />
        <OptionGroup
          label="글꼴 크기"
          value={data.fontSize}
          options={FONT_SIZE_OPTIONS}
          onChange={(v) => update('fontSize', v)}
        />
      </EditorSection>

      {/* 2. 신랑측 정보 */}
      <EditorSection title="신랑측 정보">
        <PersonFields
          who="groom"
          label="신랑"
          person={data.couple.groom}
          onChange={(patch) => patchPerson('groom', patch)}
        />
        <ParentFields
          label="신랑 아버지"
          parent={data.couple.groomFather}
          onChange={(patch) => patchParent('groomFather', patch)}
        />
        <ParentFields
          label="신랑 어머니"
          parent={data.couple.groomMother}
          onChange={(patch) => patchParent('groomMother', patch)}
        />
      </EditorSection>

      {/* 3. 신부측 정보 */}
      <EditorSection title="신부측 정보">
        <PersonFields
          who="bride"
          label="신부"
          person={data.couple.bride}
          onChange={(patch) => patchPerson('bride', patch)}
        />
        <ParentFields
          label="신부 아버지"
          parent={data.couple.brideFather}
          onChange={(patch) => patchParent('brideFather', patch)}
        />
        <ParentFields
          label="신부 어머니"
          parent={data.couple.brideMother}
          onChange={(patch) => patchParent('brideMother', patch)}
        />
      </EditorSection>

      {/* 4. 메인 화면 */}
      <EditorSection title="메인 화면" defaultOpen={false} description="첫 화면에 보여줄 내용">
        <ImageUpload
          label="메인 사진"
          value={data.mainPhotoUrl}
          onChange={(url) => {
            update('mainPhotoUrl', url)
            requestImmediateSave()
          }}
          aspect="portrait"
          width="140px"
        />
        <TextArea
          label="메인 문구"
          hint="첫 화면 하단에 표시되는 안내 문구"
          value={data.mainText}
          onChange={(e) => update('mainText', e.target.value)}
          placeholder="우리 결혼합니다"
          rows={2}
        />
      </EditorSection>

      {/* 5. 인트로 & 효과 */}
      <EditorSection title="인트로 & 효과" defaultOpen={false}>
        <TextArea
          label="인트로 문구"
          value={data.introText}
          onChange={(e) => update('introText', e.target.value)}
          rows={3}
          placeholder="귀한 걸음으로 축복해 주세요"
        />
        <OptionGroup
          label="인트로 효과"
          value={data.introEffect}
          options={INTRO_EFFECT_OPTIONS}
          onChange={(v) => update('introEffect', v)}
        />
        <OptionGroup
          label="파티클 효과"
          hint="화면 위로 떠다니는 요소"
          value={data.particle}
          options={PARTICLE_OPTIONS}
          onChange={(v) => update('particle', v)}
        />
      </EditorSection>

      {/* 6. 예식 정보 */}
      <EditorSection title="예식 정보" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-3">
          <TextField
            label="예식일"
            type="date"
            value={data.ceremony.date}
            onChange={(e) => updateCeremony({ date: e.target.value })}
          />
          <TextField
            label="예식 시간"
            type="time"
            value={data.ceremony.time}
            onChange={(e) => updateCeremony({ time: e.target.value })}
          />
        </div>
        <TextField
          label="예식장 이름"
          value={data.ceremony.venueName}
          onChange={(e) => updateCeremony({ venueName: e.target.value })}
          placeholder="그랜드 웨딩홀"
        />
        <TextField
          label="홀 이름"
          value={data.ceremony.venueHall}
          onChange={(e) => updateCeremony({ venueHall: e.target.value })}
          placeholder="2층 로즈홀"
        />
        <TextField
          label="주소"
          value={data.ceremony.venueAddress}
          onChange={(e) => updateCeremony({ venueAddress: e.target.value })}
          placeholder="서울시 강남구 ..."
        />

        <div className="mt-2 space-y-1 rounded-lg bg-neutral-50/70 px-3 py-2">
          <p className="mb-2 text-[11px] font-medium text-neutral-600">표시 여부</p>
          <Toggle
            label="예식일 표시"
            checked={data.ceremony.showDate}
            onChange={(v) => updateCeremony({ showDate: v })}
          />
          <Toggle
            label="예식 시간 표시"
            checked={data.ceremony.showTime}
            onChange={(v) => updateCeremony({ showTime: v })}
          />
          <Toggle
            label="예식장 표시"
            checked={data.ceremony.showVenue}
            onChange={(v) => updateCeremony({ showVenue: v })}
          />
        </div>
      </EditorSection>
    </div>
  )
}
