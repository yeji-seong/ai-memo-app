# 📝 메모 앱

Next.js와 Supabase를 사용한 풀스택 메모 관리 애플리케이션

## ✨ 주요 기능

- ✅ **메모 CRUD**: 생성, 읽기, 수정, 삭제
- 🏷️ **카테고리 관리**: 개인, 업무, 학습, 아이디어, 기타
- 🔍 **검색 기능**: 제목, 내용, 태그 기반 검색
- 🎯 **태그 시스템**: 메모에 여러 태그 추가 가능
- 📊 **통계**: 카테고리별 메모 개수 표시
- 🤖 **AI 요약**: Google Gemini API를 통한 메모 요약
- 📝 **마크다운 지원**: 작성 및 미리보기
- 🌓 **다크 모드**: 시스템 테마 자동 감지

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini API
- **Testing**: Playwright

## 📦 설치 및 실행

### 1. 저장소 클론

```bash
git clone <repository-url>
cd memo-app-base
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경변수 설정

`.env.local` 파일을 생성하고 다음 내용을 입력하세요:

```bash
# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**API 키 발급:**

- Gemini API: https://aistudio.google.com/apikey
- Supabase: https://app.supabase.com

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

## 📝 사용 가능한 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint

# 코드 포맷팅
npm run format

# E2E 테스트 실행
npm run test
npm run test:headed  # 브라우저 표시
npm run test:ui      # UI 모드
```

## 🗄️ 데이터베이스 스키마

### memos 테이블

| 컬럼       | 타입        | 설명                 |
| ---------- | ----------- | -------------------- |
| id         | UUID        | 기본 키              |
| title      | TEXT        | 메모 제목            |
| content    | TEXT        | 메모 내용 (마크다운) |
| category   | TEXT        | 카테고리 키          |
| tags       | TEXT[]      | 태그 배열            |
| created_at | TIMESTAMPTZ | 생성 시각            |
| updated_at | TIMESTAMPTZ | 수정 시각            |

## 📂 프로젝트 구조

```
src/
├── app/
│   ├── actions/        # 서버 액션 (DB 접근)
│   │   ├── memos.ts    # 메모 CRUD
│   │   └── seed.ts     # 샘플 데이터 시딩
│   ├── api/
│   │   └── summarize/  # AI 요약 API
│   ├── layout.tsx      # 루트 레이아웃
│   └── page.tsx        # 메인 페이지
├── components/         # React 컴포넌트
│   ├── MemoForm.tsx    # 메모 작성/수정 폼
│   ├── MemoList.tsx    # 메모 목록
│   ├── MemoItem.tsx    # 메모 카드
│   ├── MemoViewer.tsx  # 메모 상세 뷰
│   └── MarkdownViewer.tsx  # 마크다운 렌더러
├── hooks/              # 커스텀 훅
│   └── useMemos.ts     # 메모 상태 관리
├── lib/
│   └── supabase/       # Supabase 클라이언트
├── types/              # TypeScript 타입
│   ├── memo.ts         # 메모 타입
│   └── database.ts     # DB 타입
└── utils/              # 유틸리티 (deprecated)
```

## 🎯 사용 방법

### 메모 작성

1. 우측 상단 "새 메모" 버튼 클릭
2. 제목, 내용, 카테고리, 태그 입력
3. 마크다운 문법 사용 가능 (미리보기 탭으로 확인)
4. "저장하기" 클릭

### 메모 검색

- 검색창에 키워드 입력 (제목, 내용, 태그 검색)
- 카테고리 필터 선택

### 메모 수정/삭제

- 메모 카드에서 연필 아이콘: 수정
- 메모 카드에서 휴지통 아이콘: 삭제

### AI 요약

- 메모 클릭하여 상세 보기
- "요약하기" 버튼 클릭
- AI가 메모를 3줄 이내로 요약

## 🧪 테스트

Playwright를 사용한 E2E 테스트:

```bash
# 테스트 실행
npm run test

# 헤드 모드 (브라우저 표시)
npm run test:headed

# UI 모드 (대화형)
npm run test:ui
```

## 🔐 보안

- Row Level Security (RLS) 활성화
- 현재는 모든 작업 허용 (개발 환경)
- **프로덕션 배포 전 인증 기반 정책으로 변경 필요**

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여

버그 리포트, 기능 제안, PR 환영합니다!

## 📞 문의

프로젝트 관련 문의사항은 이슈로 등록해주세요.
