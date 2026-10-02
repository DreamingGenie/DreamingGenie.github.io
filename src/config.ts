// 사이트 전체 설정과 홈 화면 원고. 프로젝트 상세는 src/content/projects/*.md 에 있다.
// 사실의 정본은 C:\git\career-facts\FACTS.md 다. 문장을 고치면 portfolio/drafts/ 의 같은 자리도 대조한다.

export const siteConfig = {
  name: "전진",
  title: "백엔드 개발자",
  description:
    "여러 사람이 동시에 고쳐도 데이터가 어긋나지 않게 만드는 신입 백엔드 개발자 전진의 포트폴리오",
  accentColor: "#1d4ed8",
  // 사진을 public/images/profile.jpg 에 넣으면 히어로에 나온다.
  profileImage: "/images/profile.jpg",
  social: {
    email: "dreaminggenie@naver.com",
    github: "https://github.com/DreamingGenie",
  },
  contacts: [
    { label: "Email", value: "dreaminggenie@naver.com" },
    { label: "Email", value: "dreaminggenie0704@gmail.com" },
    { label: "GitHub", value: "github.com/DreamingGenie", href: "https://github.com/DreamingGenie" },
    { label: "Discord", value: "jini0704" },
  ],

  hero: {
    eyebrow: "Backend Developer",
    headline: "여러 사람이 동시에 고쳐도 데이터가 어긋나지 않게 만듭니다",
  },

  aboutMe: [
    "7명이 4주 동안 AI 회의 도우미를 만든 프로젝트에서 PM과 코드 통합을 맡았습니다. 팀원이 작업을 마치면 제가 코드를 읽고 공동 개발 브랜치에 합쳤고, 그렇게 합친 95건 중 83건을 제가 처리했습니다.",
    "여행 일정 앱에서는 여러 명이 같은 일정표를 동시에 고칩니다. 두 사람이 겹치는 시간에 일정을 하나씩 넣으면 둘 다 저장될 수 있었는데, 원래 쓰던 충돌 검사는 일정을 한 건씩만 봐서 이 경우를 잡지 못했습니다. 그래서 저장하는 동안 그 여행을 잠가, 한 사람씩 차례로 저장하게 했습니다.",
    "오픈소스 데이터 수집 프로젝트에서는 개인 결제 계정으로 80TB 가까운 BigQuery 데이터셋을 읽었습니다. 쿼리 하나만 잘못 보내도 큰 요금이 나올 수 있어서, 실행 전에 사용량을 미리 계산하고 상한을 넘으면 스스로 멈추는 수집기를 만들었습니다. 236번 실행해 보니 실제 요금이 예상과 0.1% 차이였습니다.",
  ],

  // 일하는 방식. link 는 프로젝트 상세 페이지의 사례 앵커.
  strengths: [
    {
      title: "동시에 들어와도 어긋나지 않게",
      body: "여러 요청이 같은 데이터를 바꿀 때, 어느 단위로 줄을 세울지 먼저 정합니다.",
      links: [
        { label: "TripCraft · 여행 단위 잠금", href: "/projects/tripcraft#lock" },
        { label: "TripCraft · 알림을 저장 순서대로", href: "/projects/tripcraft#order" },
        { label: "CommonPJT · 팀 공간 쓰기 잠금", href: "/projects/commonpjt#did" },
      ],
    },
    {
      title: "실수해도 돈과 데이터가 새지 않게",
      body: "사람이 깜빡하는 순간을 가정하고, 조용히 틀리는 대신 그 자리에서 멈추게 만듭니다.",
      links: [
        { label: "Pickage · BigQuery 6단계 방어", href: "/projects/pickage#guard" },
        { label: "Pickage · 정석 명령을 버린 이유", href: "/projects/pickage#export" },
        { label: "Pickage · 터널을 깜빡해도 실패하게", href: "/projects/pickage#tunnel" },
      ],
    },
    {
      title: "여러 사람의 코드를 하나로",
      body: "팀이 정한 규칙을 문서와 저장소 설정으로 옮기고, 통합을 맡아 끝까지 합칩니다.",
      links: [
        { label: "CommonPJT · 머지 95건 중 83건", href: "/projects/commonpjt#merge" },
        { label: "CommonPJT · 검토 전 머지가 된 날", href: "/projects/commonpjt#0728" },
        { label: "CommonPJT · 제가 고른 버전의 비용", href: "/projects/commonpjt#boot" },
      ],
    },
  ],

  // 기술은 설명할 수 있는 깊이로 나눈다.
  skills: [
    {
      tier: "설계 이유까지",
      note: "왜 그렇게 했는지까지 설명할 수 있는 것",
      items: [
        { name: "Java 21 · Spring Boot", where: "CommonPJT 뼈대·공통 응답 틀, TripCraft 실시간 협업, ServerTimeClicker" },
        { name: "Spring Data JPA", where: "CommonPJT 팀 공간 쓰기 3곳 비관적 잠금" },
        { name: "MyBatis", where: "TripCraft 버전 번호 충돌 SQL, 여행 단위 잠금" },
        { name: "PostgreSQL", where: "CommonPJT null 타입 추론 에러" },
        { name: "MySQL", where: "TripCraft" },
        { name: "Python", where: "Pickage 수집기·집계·적재 도구, 테스트 287개" },
        { name: "Git 브랜치 운영", where: "CommonPJT 통합·배포, 기본 브랜치 변경, 팀 규칙 문서화" },
      ],
    },
    {
      tier: "써 본 것",
      note: "만들어 봤지만 설계 이유를 말하기엔 얕은 것",
      items: [
        { name: "Vue 3 · JavaScript", where: "TripCraft 협업 화면, tichu-trainer" },
        { name: "Spring Security", where: "CommonPJT 보안 설정과 로그인 토큰 검사 필터" },
        { name: "BigQuery · GCS · DuckDB · MinIO", where: "Pickage" },
        { name: "Docker · AWS ECS Fargate", where: "로컬 개발 환경, CommonPJT 팀 구성 환경 사용" },
      ],
    },
    {
      tier: "배우는 중",
      note: "공개 근거가 없거나 실습 수준",
      items: [{ name: "PyTorch · Scikit-learn", where: "졸업작품과 교육 과정 실습" }],
    },
  ],

  sideProjects: [
    {
      name: "tichu-trainer",
      description: "보드게임 티츄의 규칙을 직접 카드를 내 보며 익히는 학습 웹입니다. 커밋 33건 모두 제 것입니다.",
      link: "https://github.com/DreamingGenie/tichu-trainer",
      image: "/images/projects/tichu-trainer/cover.png",
      points: [
        "외부 라이브러리 없이 테스트 도구까지 직접 만들어, node tests/run.js 한 줄로 84개 테스트가 돕니다",
        "규칙 판정 코드 11개 파일에 화면·브라우저 코드가 한 번도 나오지 않습니다",
        "해석이 갈리는 규칙은 하나로 정해 근거와 함께 코드에 적었습니다",
      ],
      skills: ["JavaScript", "ES 모듈", "테스트 직접 구현"],
    },
    {
      name: "ServerTimeClicker",
      description: "초 단위로만 알려 주는 서버 시간을 밀리초 단위로 알아내, 정해 둔 위치를 순서대로 클릭하는 데스크톱 앱입니다. 커밋 9건 모두 제 것입니다.",
      link: "https://github.com/DreamingGenie/ServerTimeClicker",
      image: "/images/projects/servertimeclicker/cover.png",
      points: [
        "초가 바뀌는 순간을 잡아, 바뀌기 직전과 직후 요청의 중간 시점을 서버의 초 경계로 봅니다",
        "여러 번 클릭할 때 처음 정한 목표 시각을 기준으로 간격을 계산해 오차가 쌓이지 않습니다",
        "한계: 안내 문서의 측정표는 앱이 자기 자신으로 잰 값이라 실제 서버 시각과의 차이는 증명하지 못합니다",
      ],
      skills: ["Java", "Maven", "jpackage"],
    },
  ],

  experience: [
    {
      company: "삼성청년SW아카데미(SSAFY)",
      title: "Java 트랙 교육생",
      dateRange: "2026.01 – 진행 중",
      bullets: ["CommonPJT · TripCraft · Pickage를 이 과정에서 팀 프로젝트로 진행했습니다"],
    },
    {
      company: "파워오토로보틱스",
      title: "백엔드/데이터 현장실습 (6개월, 8학점 인정)",
      dateRange: "2024.07 – 2024.12",
      bullets: [
        "전자 기판에 부품을 꽂는 장비의 로그를 정리해 저장하고, 장비 상태를 실시간으로 보여 주는 통계 화면을 만들었습니다",
        "여러 단계를 거쳐야 원하는 값이 보이던 화면을, 멘토 피드백을 받아 한 화면에서 전체를 보고 클릭하면 자세히 보는 구조로 다시 짰습니다",
      ],
    },
  ],

  education: [
    {
      school: "학사 졸업",
      degree: "총평점 3.77 / 4.5",
      dateRange: "2019.03 – 2025.02",
      achievements: [
        "졸업작품 ML 기반 균형 재활 보조 시스템 — 학내 경진대회 우수상. DB에서 꺼낸 훈련 기록을 모델 입력으로 다듬고 예측 결과를 다시 저장하는 부분을 맡았습니다",
        "OTT 통합 콘텐츠 정보 웹 DB 설계(팀장) — 테이블 15개 ERD와 3NF 정규화, 포스터 이미지를 DB 밖 파일로 분리",
        "병역 필 (육군 2020.02 – 2021.11)",
      ],
    },
    {
      school: "자격 · 알고리즘",
      degree: "정보처리기사 · SQLD · OPIc · 한국사 1급",
      dateRange: "",
      achievements: ["solved.ac rating 1,600 · 279문제 해결 · class 5 (Platinum V)"],
    },
  ],

  // AI 활용 공개 절. 9-30 결정(job-apply 원칙 1, L-10)과 맞물려 있어 끄기만 해 두었다. true 로 바꾸면 소개 아래에 나온다.
  showAiNote: false,
  aiNote:
    "무엇을 만들지, 어떻게 설계할지 정하고 결과를 검증하는 일은 제가 했고, 구현은 AI(Claude)와 함께 했습니다. 공개 저장소의 Co-Authored-By 표시가 그 기록입니다.",
};
