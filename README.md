# DreamingGenie.github.io

신입 백엔드 개발자 전진의 포트폴리오입니다.

- 홈: 소개 · 대표 장면 · 프로젝트 · 기술 · 개인 작업 · 이력
- 프로젝트 상세: `/projects/comeettool` · `/projects/tripcraft` · `/projects/pickage` · `/projects/tichu-trainer`

## 실행

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/
```

## PDF 만들기

`/print/`(백엔드)·`/print/data`(데이터 엔지니어)는 같은 내용을 A4 한 흐름으로 편 인쇄용 페이지입니다(근거 모음은 뺍니다). Chrome이 깔려 있어야 하고, 글꼴을 CDN에서 받으므로 네트워크가 필요합니다.

```bash
node scripts/make-pdf.mjs            # ../pdf/ 에 PDF 2개 (빌드 → preview → Chrome 인쇄 → 종료)
```

인쇄 전용 꾸밈은 `src/styles/print.css`, 본문 배치는 `src/components/print/PrintDocument.astro`에 있습니다.

`/deck/`는 같은 내용을 가로 16:9 장표로 편 페이지입니다. 전부 싣지 않고 대표 프로젝트 3개와 그 안의 사례 몇 건만 고릅니다(고르는 곳: `src/pages/deck/index.astro`의 `deck`). 꾸밈은 `src/styles/deck.css`, 배치는 `src/components/deck/DeckDocument.astro`입니다. 글이 많은 장은 넘치지 않게 본문 크기를 자동으로 줄입니다.

```bash
node scripts/make-pdf.mjs ../pdf deck   # 장표 PDF만
```

## 내용을 고치는 곳

| 무엇 | 파일 |
|---|---|
| 소개·일하는 방식·기술·개인 작업·이력·연락 | `src/config.ts` |
| 프로젝트 상세(담당 영역·한 일·사례·근거) | `src/content/projects/*.md` |
| 사례 위 도식 | `src/components/visuals/` |

## 이미지 넣는 곳

파일을 아래 경로에 두면 바로 나옵니다. 없으면 개발 서버에서만 빈 자리가 보이고, 배포 빌드에서는 숨겨집니다.

| 자리 | 경로 |
|---|---|
| 프로필 사진 | `public/images/profile.jpg` |
| 프로젝트 대표 화면 (원래 비율 그대로) | `public/images/projects/<slug>/cover.jpg` |
| 프로젝트 추가 화면 (원래 비율 그대로) | `public/images/projects/<slug>/01.jpg`, `02.jpg` |
| 개인 작업 화면 | `public/images/projects/servertimeclicker/cover.jpg` |

경로와 설명 문구는 각 프로젝트 md의 `cover` · `gallery`, `src/config.ts`의 `profileImage` · `sideProjects[].image`에서 바꿉니다.

## Credits

Layout based on [DevPortfolio](https://github.com/RyanFitzgerald/devportfolio) by Ryan Fitzgerald (MIT, see `LICENSE.md`).
