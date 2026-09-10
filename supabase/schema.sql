-- ============================================
-- 이음 (Ieum) - 청첩장 서비스 DB 스키마
-- Supabase SQL Editor에서 통째로 실행 (여러 번 재실행 가능)
-- ============================================

-- ============================================
-- 1. 테이블 생성 (IF NOT EXISTS)
-- ============================================

-- 1-1. profiles (유저 프로필)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1-2. invitations (청첩장)
CREATE TABLE IF NOT EXISTS public.invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL DEFAULT '새 청첩장',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  palette TEXT NOT NULL DEFAULT 'pink',
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS invitations_user_id_idx ON public.invitations(user_id);
CREATE INDEX IF NOT EXISTS invitations_slug_idx ON public.invitations(slug);

-- 1-3. guestbook (방명록)
CREATE TABLE IF NOT EXISTS public.guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id UUID REFERENCES public.invitations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS guestbook_invitation_id_idx ON public.guestbook(invitation_id);

-- 1-4. rsvp (참석 여부)
CREATE TABLE IF NOT EXISTS public.rsvp (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id UUID REFERENCES public.invitations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  attendance TEXT NOT NULL CHECK (attendance IN ('attend', 'absent')),
  headcount INT NOT NULL DEFAULT 1,
  meal TEXT CHECK (meal IN ('yes', 'no')),
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS rsvp_invitation_id_idx ON public.rsvp(invitation_id);

-- 1-4-1. rsvp 스키마 확장 (기존 테이블에도 안전하게 추가)
ALTER TABLE public.rsvp ADD COLUMN IF NOT EXISTS side TEXT NOT NULL DEFAULT 'groom';
ALTER TABLE public.rsvp ADD COLUMN IF NOT EXISTS contact TEXT;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'rsvp_side_check'
  ) THEN
    ALTER TABLE public.rsvp
      ADD CONSTRAINT rsvp_side_check CHECK (side IN ('groom', 'bride'));
  END IF;
END $$;

-- 1-5. photodrop (하객 사진 업로드)
CREATE TABLE IF NOT EXISTS public.photodrop (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id UUID REFERENCES public.invitations(id) ON DELETE CASCADE NOT NULL,
  storage_path TEXT NOT NULL,
  image_url TEXT NOT NULL,
  uploader_name TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS photodrop_invitation_id_idx
  ON public.photodrop(invitation_id);

ALTER TABLE public.photodrop ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "photodrop_select_public" ON public.photodrop;
CREATE POLICY "photodrop_select_public" ON public.photodrop
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.invitations
      WHERE invitations.id = photodrop.invitation_id
      AND (invitations.status = 'published' OR invitations.user_id = auth.uid())
    )
  );

DROP POLICY IF EXISTS "photodrop_insert_public" ON public.photodrop;
CREATE POLICY "photodrop_insert_public" ON public.photodrop
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.invitations
      WHERE invitations.id = photodrop.invitation_id
      AND invitations.status = 'published'
    )
  );

DROP POLICY IF EXISTS "photodrop_delete_owner" ON public.photodrop;
CREATE POLICY "photodrop_delete_owner" ON public.photodrop
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.invitations
      WHERE invitations.id = photodrop.invitation_id
      AND invitations.user_id = auth.uid()
    )
  );

-- Storage 버킷: photodrop-images (하객이 익명으로 업로드)
INSERT INTO storage.buckets (id, name, public)
VALUES ('photodrop-images', 'photodrop-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "photodrop_storage_insert" ON storage.objects;
CREATE POLICY "photodrop_storage_insert"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'photodrop-images'
  AND EXISTS (
    SELECT 1 FROM public.invitations
    WHERE invitations.id::text = (storage.foldername(name))[1]
    AND invitations.status = 'published'
  )
);

DROP POLICY IF EXISTS "photodrop_storage_select" ON storage.objects;
CREATE POLICY "photodrop_storage_select"
ON storage.objects FOR SELECT
USING (bucket_id = 'photodrop-images');

DROP POLICY IF EXISTS "photodrop_storage_delete_owner" ON storage.objects;
CREATE POLICY "photodrop_storage_delete_owner"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'photodrop-images'
  AND EXISTS (
    SELECT 1 FROM public.invitations
    WHERE invitations.id::text = (storage.foldername(name))[1]
    AND invitations.user_id = auth.uid()
  )
);


-- ============================================
-- 2. RLS 활성화
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvp ENABLE ROW LEVEL SECURITY;


-- ============================================
-- 3. profiles 정책 (재실행 안전)
-- ============================================
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);


-- ============================================
-- 4. invitations 정책
-- ============================================
DROP POLICY IF EXISTS "invitations_select_owner" ON public.invitations;
CREATE POLICY "invitations_select_owner" ON public.invitations
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "invitations_select_public" ON public.invitations;
CREATE POLICY "invitations_select_public" ON public.invitations
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "invitations_insert_own" ON public.invitations;
CREATE POLICY "invitations_insert_own" ON public.invitations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "invitations_update_own" ON public.invitations;
CREATE POLICY "invitations_update_own" ON public.invitations
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "invitations_delete_own" ON public.invitations;
CREATE POLICY "invitations_delete_own" ON public.invitations
  FOR DELETE USING (auth.uid() = user_id);


-- ============================================
-- 5. guestbook 정책
-- ============================================
DROP POLICY IF EXISTS "guestbook_select_public" ON public.guestbook;
CREATE POLICY "guestbook_select_public" ON public.guestbook
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.invitations
      WHERE invitations.id = guestbook.invitation_id
      AND (invitations.status = 'published' OR invitations.user_id = auth.uid())
    )
  );

DROP POLICY IF EXISTS "guestbook_insert_public" ON public.guestbook;
CREATE POLICY "guestbook_insert_public" ON public.guestbook
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.invitations
      WHERE invitations.id = guestbook.invitation_id
      AND invitations.status = 'published'
    )
  );

DROP POLICY IF EXISTS "guestbook_delete_owner" ON public.guestbook;
CREATE POLICY "guestbook_delete_owner" ON public.guestbook
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.invitations
      WHERE invitations.id = guestbook.invitation_id
      AND invitations.user_id = auth.uid()
    )
  );


-- ============================================
-- 6. rsvp 정책
-- ============================================
DROP POLICY IF EXISTS "rsvp_select_owner" ON public.rsvp;
CREATE POLICY "rsvp_select_owner" ON public.rsvp
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.invitations
      WHERE invitations.id = rsvp.invitation_id
      AND invitations.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "rsvp_insert_public" ON public.rsvp;
CREATE POLICY "rsvp_insert_public" ON public.rsvp
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.invitations
      WHERE invitations.id = rsvp.invitation_id
      AND invitations.status = 'published'
    )
  );

DROP POLICY IF EXISTS "rsvp_delete_owner" ON public.rsvp;
CREATE POLICY "rsvp_delete_owner" ON public.rsvp
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.invitations
      WHERE invitations.id = rsvp.invitation_id
      AND invitations.user_id = auth.uid()
    )
  );


-- ============================================
-- 7. 트리거: 회원가입 시 profiles 자동 생성
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'full_name',
      split_part(NEW.email, '@', 1)
    ),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================
-- 8. 트리거: 청첩장 3개 제한
-- ============================================
CREATE OR REPLACE FUNCTION public.enforce_invitation_limit()
RETURNS trigger AS $$
BEGIN
  IF (SELECT COUNT(*) FROM public.invitations WHERE user_id = NEW.user_id) >= 3 THEN
    RAISE EXCEPTION '청첩장은 최대 3개까지만 만들 수 있어요';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_invitation_limit_trigger ON public.invitations;
CREATE TRIGGER enforce_invitation_limit_trigger
  BEFORE INSERT ON public.invitations
  FOR EACH ROW EXECUTE FUNCTION public.enforce_invitation_limit();


-- ============================================
-- 9. 트리거: updated_at 자동 갱신
-- ============================================
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS touch_profiles_updated_at ON public.profiles;
CREATE TRIGGER touch_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS touch_invitations_updated_at ON public.invitations;
CREATE TRIGGER touch_invitations_updated_at
  BEFORE UPDATE ON public.invitations
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();


-- ============================================
-- 10. Storage 버킷: invitation-images
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('invitation-images', 'invitation-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "images_insert_own_folder" ON storage.objects;
CREATE POLICY "images_insert_own_folder"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'invitation-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "images_update_own_folder" ON storage.objects;
CREATE POLICY "images_update_own_folder"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'invitation-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "images_delete_own_folder" ON storage.objects;
CREATE POLICY "images_delete_own_folder"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'invitation-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "images_select_public" ON storage.objects;
CREATE POLICY "images_select_public"
ON storage.objects FOR SELECT
USING (bucket_id = 'invitation-images');


-- ============================================
-- 11. wreath_orders (독립 화환 주문 — 익명, 청첩장 없음)
-- ============================================
-- 흐름: 유저가 /wreath/order 폼 작성 → 저장(token) → 꽃비로 이동 →
-- 꽃비가 delivery_url?token=xxx 호출 → 저장된 배송정보 응답.
CREATE TABLE IF NOT EXISTS public.wreath_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token VARCHAR(32) UNIQUE NOT NULL,

  -- 카테고리 (꽃비 상품 분류 id)
  category_id INT NOT NULL,
  category_label TEXT NOT NULL,

  -- 받는분
  receiver_name TEXT NOT NULL,
  receiver_relationship TEXT NOT NULL,
  receiver_tel TEXT,

  -- 배송지
  zipcode TEXT,
  address TEXT NOT NULL,
  address_detail TEXT,

  -- 배송 일시
  delivery_datetime TIMESTAMPTZ NOT NULL,

  -- 리본 문구
  ribbon_name TEXT,
  ribbon_message TEXT,

  -- 주문자 (결제·연락 담당)
  orderer_name TEXT,
  orderer_phone TEXT,

  -- 상태 추적
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'redirected', 'callback_hit')),
  callback_hit_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 기존 테이블에 orderer 컬럼 추가 (재실행 안전)
ALTER TABLE public.wreath_orders ADD COLUMN IF NOT EXISTS orderer_name TEXT;
ALTER TABLE public.wreath_orders ADD COLUMN IF NOT EXISTS orderer_phone TEXT;

CREATE INDEX IF NOT EXISTS wreath_orders_token_idx ON public.wreath_orders(token);
CREATE INDEX IF NOT EXISTS wreath_orders_created_at_idx ON public.wreath_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS wreath_orders_orderer_phone_idx ON public.wreath_orders(orderer_phone);

ALTER TABLE public.wreath_orders ENABLE ROW LEVEL SECURITY;

-- INSERT: 익명(anon) 허용 — 로그인 없이 주문 가능
DROP POLICY IF EXISTS "wreath_orders_insert_anon" ON public.wreath_orders;
CREATE POLICY "wreath_orders_insert_anon" ON public.wreath_orders
  FOR INSERT WITH CHECK (true);

-- SELECT/UPDATE: 서비스롤 전용 (콜백 라우트에서만 접근)
-- anon/authenticated 는 정책 없음 → 접근 불가
