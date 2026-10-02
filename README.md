# DreamingGenie.github.io

신입 백엔드 개발자 전진의 포트폴리오입니다.

- 홈: 소개 · 대표 장면 · 프로젝트 · 기술 · 개인 작업 · 이력
- 프로젝트 상세: `/projects/commonpjt` · `/projects/tripcraft` · `/projects/pickage`

## 실행

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/
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
| 개인 작업 화면 | `public/images/projects/tichu-trainer/cover.jpg`, `servertimeclicker/cover.jpg` |

경로와 설명 문구는 각 프로젝트 md의 `cover` · `gallery`, `src/config.ts`의 `profileImage` · `sideProjects[].image`에서 바꿉니다.

## Credits

Layout based on [DevPortfolio](https://github.com/RyanFitzgerald/devportfolio) by Ryan Fitzgerald (MIT, see `LICENSE.md`).
