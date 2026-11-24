// 사이트 전체 설정과 홈 화면 원고. 프로젝트 상세는 src/content/projects/*.md 에 있다.
// 사실의 정본은 C:\git\career-facts\FACTS.md 다. 문장을 고치면 portfolio/drafts/ 의 같은 자리도 대조한다.

export const siteConfig = {
  name: "전진",
  title: "백엔드 개발자",
  // 첫 화면 "~입니다." 앞에 붙는 직무 이름
  roleLabel: "신입 백엔드 개발자",
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
    { label: "GitHub", value: "github.com/DreamingGenie", href: "https://github.com/DreamingGenie" },
  ],

  hero: {
    eyebrow: "Backend Developer",
    headline: "여러 사람이 동시에 고쳐도 데이터가 어긋나지 않게 만듭니다",
    // 이름 다음에 이어지는 한 줄. 첫 화면에서 주력 스택과 해 온 일이 보이게 한다.
    intro: "Java·Spring으로 여러 명이 동시에 편집하는 일정 서버의 충돌 제어와 실시간 협업을 만들었고, Python으로는 대용량 데이터 수집 파이프라인을 만들었습니다.",
  },

  aboutMe: [
    "6명이 6주 동안 만든 AI 에이전트 협업 서비스 BEEZ에서 서버 운영과 일부 백엔드를 맡았습니다. 팀장이 권한을 넘기는 순간에 옛 팀장의 요청이 통과할 수 있던 문제를, 락을 잡은 뒤 권한을 다시 읽게 해 막았고 **다시 읽기를 빼면 실패하는 재현 테스트**로 확인했습니다.",
    "여행 일정 앱 TripCraft에서는 두 사람이 겹치는 시간에 일정을 동시에 넣으면 둘 다 저장될 수 있었습니다. 저장하는 동안 **그 여행에 락을 걸어 한 사람씩 차례로 저장**하게 했고, 두 번째 사람은 방금 들어간 일정을 보고 거절됩니다.",
    "오픈소스 패키지 비교 서비스 Pickage에서는 개인 결제 계정으로 500TB가 넘는 BigQuery 데이터셋을 다뤄야 해서, 실행 전에 사용량을 계산하고 상한을 넘으면 멈추는 수집기를 만들었습니다. 236번 실행한 결과 청구된 사용량은 예상과 **0.1% 차이**였습니다.",
  ],

  // 일하는 방식. link 는 프로젝트 상세 페이지의 사례 앵커.
  strengths: [
    {
      title: "동시 요청 정합성",
      body: "여러 요청이 같은 데이터를 바꾸는 곳에서는 락을 어느 단위로 걸지부터 정했습니다.",
      links: [
        { label: "TripCraft · 여행 단위 락", href: "/projects/tripcraft#lock" },
        { label: "TripCraft · 알림을 저장 순서대로", href: "/projects/tripcraft#order" },
        { label: "CoMeetTool · 팀 공간 쓰기 락", href: "/projects/comeettool#lock" },
        { label: "BEEZ · 락을 잡은 뒤 권한 다시 읽기", href: "/projects/beez#recheck" },
      ],
    },
    {
      title: "비용·데이터 사고 방지",
      body: "설정을 빠뜨리거나 비용 상한을 넘으면 그 자리에서 에러로 멈추게 했습니다.",
      links: [
        { label: "Pickage · BigQuery 6단계 상한 검사", href: "/projects/pickage#guard" },
        { label: "Pickage · EXPORT DATA를 쓰지 않은 이유", href: "/projects/pickage#export" },
        { label: "Pickage · 터널 없이 실행하면 바로 실패", href: "/projects/pickage#tunnel" },
        { label: "BEEZ · 필수 환경변수가 빠지면 기동 단계에서 멈춤", href: "/projects/beez#env" },
      ],
    },
    {
      title: "팀 코드 통합",
      body: "팀이 정한 규칙을 문서와 저장소 설정에 반영했고, PM으로서 코드 통합을 맡았습니다. BEEZ에서는 팀원 PR 103개를 리뷰했습니다.",
      links: [
        { label: "CoMeetTool · 머지 95건 중 83건", href: "/projects/comeettool#merge" },
        { label: "CoMeetTool · 검토 전 머지가 된 날", href: "/projects/comeettool#0728" },
        { label: "CoMeetTool · Spring Boot 4.1 설정 진단을 끝난 뒤 바로잡음", href: "/projects/comeettool#boot" },
        { label: "BEEZ · 공용 AI 클라이언트 상한 제거를 리뷰로 막음", href: "/projects/beez#timeout" },
      ],
    },
  ],

  // 기술은 설명할 수 있는 깊이로 나눈다.
  skills: [
    {
      tier: "설계 이유까지",
      note: "왜 그렇게 했는지까지 설명할 수 있는 것",
      items: [
        { name: "Java 21 · Spring Boot", where: "CoMeetTool 프로젝트 초기 구성·공통 응답 형식, TripCraft 실시간 협업, BEEZ 계정·팀 API와 MCP 진입점, ServerTimeClicker" },
        { name: "Spring Data JPA", where: "CoMeetTool 팀 공간 쓰기 3곳 비관적 락, BEEZ 락을 잡은 뒤 권한 다시 읽기(영속성 컨텍스트)" },
        { name: "MyBatis", where: "TripCraft 버전 번호 충돌 SQL, 여행 단위 락" },
        { name: "Python", where: "Pickage 수집기·집계·적재 도구" },
        { name: "BigQuery", where: "Pickage 실행 전 사용량 계산과 6단계 상한, EXPORT DATA 대신 임시 테이블을 거쳐 내보내기" },
        { name: "PostgreSQL", where: "Pickage 운영 적재 — 날짜마다 느려지는 원인을 실행 계획에서 찾고, 날짜 파티션을 하루씩 교체" },
        { name: "Git 브랜치 운영", where: "CoMeetTool 통합·배포, 기본 브랜치 변경, 팀 규칙 문서화" },
      ],
    },
    {
      tier: "써 본 것",
      note: "만들어 봤지만 설계 이유를 말하기엔 얕은 것",
      items: [
        { name: "Vue 3 · JavaScript", where: "TripCraft 협업 화면, tichu-trainer" },
        { name: "Spring Security", where: "CoMeetTool 보안 설정과 로그인 토큰 검사 필터" },
        { name: "MySQL", where: "TripCraft 여행 단위 락(SELECT … FOR UPDATE)" },
        { name: "GCS · DuckDB · MinIO", where: "Pickage 원본 보관과 집계" },
        { name: "Docker · AWS", where: "BEEZ dev 서버와 블록 배틀 EC2 1대를 Compose로 구성, CoMeetTool은 팀이 구성한 ECS Fargate 사용" },
        { name: "GitHub Actions · Jenkins", where: "BEEZ PR 필수 검사(ci-gate), dev 자동 배포와 배포 실패 알림" },
        { name: "Prometheus · Alertmanager", where: "BEEZ dev 서버 알림 규칙(CDC·서버)과 팀 메신저 연동" },
        { name: "MCP(Java SDK)", where: "BEEZ 에이전트 연결 서버 — 토큰 인증·감사·연결 판정" },
        { name: "Kafka · Debezium", where: "BEEZ dev 서버에 팀원이 만든 CDC 경로 적용" },
        { name: "Redis · k6", where: "블록 배틀 대전 방 상태 저장, 동시 100방 부하 테스트(로컬 근사)" },
      ],
    },
  ],

  // tichu-trainer는 10-08 프로젝트 상세(src/content/projects/tichu-trainer.md)로 옮겼다.
  sideProjects: [
    {
      name: "ServerTimeClicker",
      description: "초 단위로만 알려 주는 서버 시간을 밀리초 단위로 알아내, 정해 둔 위치를 순서대로 클릭하는 데스크톱 앱입니다. 커밋 24건 모두 제 것입니다.",
      link: "https://github.com/DreamingGenie/ServerTimeClicker",
      image: "/images/projects/servertimeclicker/cover.jpg",
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
      company: "삼성청년SW·AI아카데미(SSAFY) 15기",
      title: "Java 전공 트랙 교육생",
      dateRange: "2026.01 – 2026.12 (진행 중)",
      bullets: ["CoMeetTool · TripCraft · Pickage · BEEZ를 이 과정에서 팀 프로젝트로 진행했습니다"],
    },
    {
      company: "파워오토로보틱스",
      title: "백엔드/데이터 현장실습 (6개월, 8학점 인정)",
      dateRange: "2024.07 – 2024.12",
      bullets: [
        "전자 기판에 부품을 꽂는 장비가 부품을 어떤 경로와 순서로 꽂을지 프로그래밍했습니다",
        "장비가 DB에 쌓아 둔 기록을 불러와 에러 코드별 발생 빈도와 부품별 삽입 불량 빈도를 계산해 보여 주는 통계 창을 맡았습니다",
        "여러 단계를 거쳐야 원하는 값이 보이던 화면을, 멘토 피드백을 받아 한 화면에서 전체를 보고 클릭하면 자세히 보는 구조로 다시 짰습니다",
      ],
    },
  ],

  education: [
    {
      school: "학사 졸업",
      degree: "공학사(컴퓨터공학심화) · 총평점 3.77 / 4.5",
      dateRange: "2019.03 – 2025.02",
      achievements: [
        "공학교육인증(ABEEK) 심화 과정을 이수했습니다",
        "졸업작품 ML 기반 균형 재활 보조 시스템(2023.09 – 2024.06) — DB에서 꺼낸 훈련 기록을 모델 입력으로 다듬고 예측 결과를 다시 저장하는 부분을 맡았습니다",
        "OTT 통합 콘텐츠 정보 웹 DB 설계(팀장, 2023.03 – 06) — 테이블 15개 ERD와 3NF 정규화, 포스터 이미지를 DB 밖 파일로 분리",
        "병역 필 (공군 2020.02 – 2021.11)",
      ],
    },
    {
      school: "수상",
      degree: "공모전 은상 · 교내 경진대회 우수상",
      dateRange: "",
      achievements: [
        "2022.06 IPACT 창업 발명 공모전 은상(국제문화기술진흥원) — 이동식 간이 공기 청정 시스템을 제안한 팀에서, 특허 정보로 기존 기술과의 차이를 검토하고 아이디어를 요구사항 명세서로 정리하는 일을 맡았습니다",
        "교내 졸업작품 아이디어 경진대회 우수상 — 위 졸업작품의 주제(ML 기반 균형 재활 보조 시스템)로 받았습니다",
      ],
    },
    {
      school: "자격 · 알고리즘",
      degree: "정보처리기사 · SQLD · 한국사 1급",
      dateRange: "",
      achievements: [
        "정보처리기사 — 2024.06 · 한국산업인력공단",
        "SQLD(SQL 개발자) — 2026.03 · 한국데이터산업진흥원",
        "한국사능력검정 1급 — 2019.11 · 국사편찬위원회",
        "solved.ac rating 1,600 · 279문제 해결 · class 5 (Platinum V)",
      ],
    },
  ],

  // AI 활용 공개 절. 9-30 결정(job-apply 원칙 1, L-10)과 맞물려 있어 끄기만 해 두었다. true 로 바꾸면 소개 아래에 나온다.
  showAiNote: false,
  aiNote:
    "무엇을 만들지, 어떻게 설계할지 정하고 결과를 검증하는 일은 제가 했고, 구현은 AI(Claude)와 함께 했습니다.",
};

// 데이터 엔지니어 지원용 첫 화면(/data). 사실 문장은 위 siteConfig의 것을 순서만 바꿔 쓰고,
// 새 문장은 FACTS에서 확인된 것만 넣는다(PostgreSQL = P22·P19). 프로젝트 상세 페이지는 두 첫 화면이 함께 쓴다.
export const dataVariant = {
  home: "/data",
  title: "데이터 엔지니어",
  description:
    "수집한 데이터가 틀린 채로 다음 단계에 넘어가지 않게 만드는 신입 데이터 엔지니어 전진의 포트폴리오",
  roleLabel: "신입 데이터 엔지니어",
  hero: {
    eyebrow: "Data Engineer",
    headline: "데이터가 틀린 채로 다음 단계에 넘어가지 않게 만듭니다",
    intro: "Python으로 대용량 데이터를 수집·적재하는 파이프라인을 만들었고, Java·Spring으로는 여러 명이 동시에 편집하는 서버를 만들었습니다.",
  },
  aboutMe: [siteConfig.aboutMe[2], siteConfig.aboutMe[0], siteConfig.aboutMe[1]],
  strengths: [siteConfig.strengths[1], siteConfig.strengths[0], siteConfig.strengths[2]],
  projectOrder: ["pickage", "beez", "comeettool", "tripcraft", "blockbattle", "tichu-trainer"],
  skills: [
    {
      tier: "설계 이유까지",
      note: "왜 그렇게 했는지까지 설명할 수 있는 것",
      items: [
        { name: "Python", where: "Pickage 수집기·집계·적재 도구" },
        { name: "BigQuery", where: "Pickage 실행 전 사용량 계산과 6단계 상한, EXPORT DATA 대신 임시 테이블을 거쳐 내보내기" },
        { name: "PostgreSQL", where: "Pickage 운영 적재 — 날짜마다 느려지는 원인을 실행 계획에서 찾고, 날짜 파티션을 하루씩 교체" },
        { name: "Java 21 · Spring Boot", where: "CoMeetTool 프로젝트 초기 구성·공통 응답 형식, TripCraft 실시간 협업, BEEZ 계정·팀 API와 MCP 진입점, ServerTimeClicker" },
        { name: "Spring Data JPA", where: "CoMeetTool 팀 공간 쓰기 3곳 비관적 락, BEEZ 락을 잡은 뒤 권한 다시 읽기(영속성 컨텍스트)" },
        { name: "MyBatis", where: "TripCraft 버전 번호 충돌 SQL, 여행 단위 락" },
      ],
    },
    {
      tier: "써 본 것",
      note: "만들어 봤지만 설계 이유를 말하기엔 얕은 것",
      items: [
        { name: "GCS · DuckDB · MinIO", where: "Pickage 원본 보관과 집계" },
        { name: "Docker · AWS", where: "BEEZ dev 서버와 블록 배틀 EC2 1대를 Compose로 구성, CoMeetTool은 팀이 구성한 ECS Fargate 사용" },
        { name: "GitHub Actions · Jenkins", where: "BEEZ PR 필수 검사(ci-gate), dev 자동 배포와 배포 실패 알림" },
        { name: "Prometheus · Alertmanager", where: "BEEZ dev 서버 알림 규칙(CDC·서버)과 팀 메신저 연동" },
        { name: "MCP(Java SDK)", where: "BEEZ 에이전트 연결 서버 — 토큰 인증·감사·연결 판정" },
        { name: "Kafka · Debezium", where: "BEEZ dev 서버에 팀원이 만든 CDC 경로 적용" },
        { name: "Redis · k6", where: "블록 배틀 대전 방 상태 저장, 동시 100방 부하 테스트(로컬 근사)" },
        { name: "MySQL", where: "TripCraft 여행 단위 락(SELECT … FOR UPDATE)" },
        { name: "Spring Security", where: "CoMeetTool 보안 설정과 로그인 토큰 검사 필터" },
        { name: "Vue 3 · JavaScript", where: "TripCraft 협업 화면, tichu-trainer" },
      ],
    },
  ],
};

// DevOps 엔지니어 지원용 첫 화면(/devops — 2026-11-24 카카오뱅크 DevOps 인턴 지원 때 만듦).
// 프로젝트는 본인이 인프라·배포를 맡은 것만 싣는다(블록 배틀 · BEEZ · Pickage 운영 적재). 사실 문장은 프로젝트 상세의 한 일·사례에서 옮겼고,
// 기술 단계(설계 이유까지/써 본 것)는 백엔드 첫 화면과 같게 둔다 — DevOps 도구를 한 단계 올리지 않는다.
export const devopsVariant = {
  home: "/devops",
  title: "DevOps 엔지니어",
  description:
    "배포가 끝났다는 표시가 실제 결과까지 말하게 만드는 신입 DevOps 엔지니어 전진의 포트폴리오",
  roleLabel: "신입 DevOps 엔지니어",
  hero: {
    eyebrow: "DevOps Engineer",
    headline: "성공 표시가 실제 결과까지 보장하게 만듭니다",
    intro: "팀 프로젝트에서 CI 필수 검사와 개발 서버 자동 배포·실패 알림을 맡았고, 개인 프로젝트를 AWS에 직접 배포해 실제 이용자를 받으며 운영했습니다.",
  },
  aboutMe: [
    "6명이 6주 동안 만든 AI 에이전트 협업 서비스 BEEZ에서 서버 운영을 맡았습니다. 승인 하나면 PR이 자동 병합되던 저장소에 **항상 도는 필수 검사 하나**를 걸었고, 개발 서버 자동 배포는 팀원 리뷰를 받아 **PR로 병합된 dev 본줄기 커밋만** 배포되게 했습니다.",
    "같은 팀에서 GitHub Actions의 초록불은 배포 요청을 접수한 데까지만 뜻해, Jenkins 배포가 실패해도 팀이 알 수 없었습니다. 실패할 때 **팀 메신저로 알림**이 가게 했습니다.",
    "개인 프로젝트 블록 배틀은 **AWS EC2 한 대에 Docker Compose로 배포**하고 실제 이용자를 받았습니다. 배포 중 게임이 끊긴다는 제보를 받아 nginx를 설정만 다시 읽게 바꿨고, 남은 친구 대전 끊김은 **진행 중인 대전이 없을 때만 배포**하는 기준으로 다뤘습니다.",
  ],
  strengths: [
    {
      title: "건너뛸 수 없는 검사",
      body: "빠르게 돌되, 병합과 배포 앞에서는 빠질 수 없는 검사를 두었습니다.",
      links: [
        { label: "BEEZ · 승인 1개면 자동 병합되던 저장소에 PR 필수 검사", href: "/projects/beez#ci" },
        { label: "BEEZ · 머지 커밋만 배포하는 dev 자동 배포", href: "/projects/beez#deploy" },
        { label: "BEEZ · 필수 환경변수가 빠지면 기동 단계에서 멈춤", href: "/projects/beez#env" },
      ],
    },
    {
      title: "성공 표시가 보장하는 범위",
      body: "배포가 끝났다는 표시가 어디까지를 말하는지 따지고, 말하지 않는 범위는 알림과 배포 기준으로 메웠습니다.",
      links: [
        { label: "블록 배틀 · 배포 때 끊기는 범위를 알고 배포 기준을 정함", href: "/projects/blockbattle#deploy" },
        { label: "블록 배틀 · AWS 서버 1대 배포", href: "/projects/blockbattle#aws" },
        { label: "BEEZ · 백업 복원을 해시로 확인", href: "/projects/beez#backup" },
      ],
    },
    {
      title: "증상과 원인을 가르기",
      body: "느려지거나 끊긴 자리보다 원인이 있는 자리를 먼저 찾았습니다.",
      links: [
        { label: "Pickage · 날짜마다 느린 적재의 원인을 실행 계획에서 찾음", href: "/projects/pickage#planner" },
        { label: "블록 배틀 · 부하 테스트 1차 불합격 원인을 부하 발생기에서 찾음", href: "/projects/blockbattle#load" },
      ],
    },
  ],
  projectOrder: ["blockbattle", "beez", "pickage"],
  skills: [
    {
      tier: "설계 이유까지",
      note: "왜 그렇게 했는지까지 설명할 수 있는 것",
      items: [
        { name: "Git 브랜치 운영", where: "CoMeetTool 통합·배포, 기본 브랜치 변경, 팀 규칙 문서화" },
        { name: "PostgreSQL", where: "Pickage 운영 적재 — 날짜마다 느려지는 원인을 실행 계획에서 찾고, 날짜 파티션을 하루씩 교체" },
        { name: "Java 21 · Spring Boot", where: "CoMeetTool 프로젝트 초기 구성·공통 응답 형식, TripCraft 실시간 협업, BEEZ 계정·팀 API와 MCP 진입점, ServerTimeClicker" },
        { name: "Python", where: "Pickage 수집기·집계·적재 도구" },
      ],
    },
    {
      tier: "써 본 것",
      note: "만들어 봤지만 설계 이유를 말하기엔 얕은 것",
      items: [
        { name: "GitHub Actions · Jenkins", where: "BEEZ PR 필수 검사(ci-gate), dev 자동 배포와 배포 실패 알림" },
        { name: "Docker · AWS", where: "BEEZ dev 서버와 블록 배틀 EC2 1대를 Compose로 구성, CoMeetTool은 팀이 구성한 ECS Fargate 사용" },
        { name: "Prometheus · Alertmanager", where: "BEEZ dev 서버 알림 규칙(CDC·서버)과 팀 메신저 연동" },
        { name: "nginx", where: "블록 배틀 80·443만 열고 Let's Encrypt 인증서, 배포 때 재시작 대신 설정 다시 읽기" },
        { name: "Kafka · Debezium", where: "BEEZ dev 서버에 팀원이 만든 CDC 경로 적용" },
        { name: "Redis · k6", where: "블록 배틀 대전 방 상태 저장, 동시 100방 부하 테스트(로컬 근사)" },
      ],
    },
  ],
};
