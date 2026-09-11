import fs from 'fs'
import path from 'path'
import type { WreathCategoryKey } from './wreath-orders/types'

/** 파일명 "기본화환 선택가" 표기가 의미하는 가격 */
const BASE_PRICE = 49000

const CATEGORY_DIR: Record<WreathCategoryKey, string> = {
  congrats: '01_축하화환',
  condolence: '02_근조화환',
  foliage: '03_관엽',
  basket: '04_꽃바구니,꽃다발',
  oriental: '05_동양란',
  western: '06_서양란',
  bonsai: '07_분재',
}

export type WreathProduct = {
  sequence: number
  code: string
  name: string
  price: number
  imageSrc: string
}

/**
 * 가격 문자열 파싱.
 *   "기본화환 선택가"         → 49,000
 *   "기본화환 선택가+1만원"    → 59,000
 *   "130,000"                → 130,000
 *   "10kg-100,000"           → 100,000  (마지막 숫자 그룹)
 */
function parsePrice(info: string): number {
  if (info === '기본화환 선택가') return BASE_PRICE
  const plus = info.match(/^기본화환 선택가\+(\d+)만원$/)
  if (plus) return BASE_PRICE + parseInt(plus[1], 10) * 10000
  const num = info.match(/([\d,]+)\s*$/)
  if (num) return parseInt(num[1].replace(/,/g, ''), 10)
  return 0
}

/**
 * 예: "001_d-0001kb 축하3단-기본화환 선택가.jpg"
 *     → { sequence: 1, code: 'd-0001kb', name: '축하3단', price: 49000 }
 */
function parseFilename(
  filename: string,
  dirName: string,
): WreathProduct | null {
  const withoutExt = filename.replace(/\.jpe?g$/i, '')

  // 앞 숫자 + '_' 또는 '-'
  const seqMatch = withoutExt.match(/^(\d+)[_-]/)
  if (!seqMatch) return null
  const sequence = parseInt(seqMatch[1], 10)
  const afterSeq = withoutExt.substring(seqMatch[0].length)

  // 첫 공백 앞 = code
  const spaceIdx = afterSeq.indexOf(' ')
  if (spaceIdx === -1) return null
  const code = afterSeq.substring(0, spaceIdx)
  const afterCode = afterSeq.substring(spaceIdx + 1)

  // 첫 '-' 앞 = 이름 (이름에는 '-'가 없다고 가정. '[대]', '[특대]' 등은 OK)
  const dashIdx = afterCode.indexOf('-')
  if (dashIdx === -1) return null
  const name = afterCode.substring(0, dashIdx)
  const priceInfo = afterCode.substring(dashIdx + 1)

  const price = parsePrice(priceInfo)
  if (!price) return null

  return {
    sequence,
    code,
    name,
    price,
    imageSrc: `/product-image/${dirName}/${filename}`,
  }
}

export function getWreathProducts(
  category: WreathCategoryKey,
): WreathProduct[] {
  const dirName = CATEGORY_DIR[category]
  const dirPath = path.join(process.cwd(), 'public', 'product-image', dirName)
  // 폴더가 아직 없거나 비어있어도 페이지가 죽지 않게 방어
  let files: string[]
  try {
    files = fs.readdirSync(dirPath)
  } catch {
    return []
  }
  return files
    .filter((f) => /\.jpe?g$/i.test(f))
    .map((f) => parseFilename(f, dirName))
    .filter((p): p is WreathProduct => p !== null)
    .sort((a, b) => a.sequence - b.sequence)
}
