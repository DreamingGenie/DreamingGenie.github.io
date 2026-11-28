---
title: "CoMeetTool"
order: 1
summary: "음성 회의를 기록과 요약하고 팀 공간과 일정을 함께 관리하는 협업 도구"
oneLine: "음성 회의를 기록하고 요약해 주고, 팀별 공간(스페이스)과 일정을 함께 관리하는 협업 도구입니다. 7명 팀에서 팀 합의로 PM과 코드 통합을 맡았고, 팀 공간과 일정 기능의 백엔드를 만들었습니다."
period: "2026.07.14 ~ 08.10 (27일)"
team: "7명, 교육기관 GitLab에서 개발한 뒤 GitHub 공개 저장소로 옮김"
role: "PM, 코드 검토와 통합, 팀 공간과 일정 백엔드"
stack: ["Java 21", "Spring Boot 4.1", "Spring Data JPA", "PostgreSQL", "Vue 3", "AWS ECS Fargate", "GitLab CI"]
repo: "https://github.com/DreamingGenie/Comeettool"
highlight: "develop 브랜치 머지 95건 중 83건을 검토하고 머지했습니다"
cover: "/images/projects/comeettool/cover.jpg"
gallery:
  - { src: "/images/projects/comeettool/01.jpg", caption: "홈: 내 팀 스페이스 목록과 여러 스페이스의 일정을 모은 달력" }
shotNote: "로컬에서 백엔드를 띄워 찍은 화면입니다. 팀 스페이스와 일정은 시연용으로 넣은 데이터입니다(2026-10-02)."
areas:
  - group: "기능"
    items:
      - { name: "팀 공간(SPACE) API", owner: "me" }
      - { name: "일정(SCHEDULE) API", owner: "me" }
      - { name: "음성 발화 분할", owner: "team" }
      - { name: "AI 요약 처리", owner: "team" }
  - group: "공통 기반"
    items:
      - { name: "공통 응답과 예외 처리", owner: "me", note: "팀원 4명이 에러 코드를 더해 씀" }
      - { name: "JWT 필터와 보안 설정", owner: "me", note: "대부분" }
      - { name: "DB 설계(ERD)", owner: "me" }
      - { name: "CI/CD 설정", owner: "team" }
  - group: "협업과 운영"
    items:
      - { name: "develop 통합과 main 머지", owner: "me" }
      - { name: "팀 규칙 문서와 브랜치 설정", owner: "me", note: "규칙은 팀이 정함" }
did:
  - id: "merge"
    title: "팀원 코드를 검토하고 합치는 일"
    text: "각자 브랜치에서 작업한 뒤 MR(병합 요청)을 올리고, 검토를 거쳐 develop에 합치는 방식이었습니다. develop에 합친 95건 중 83건을 제가 처리했고, main 머지 10건(그중 배포 9건)은 모두 제가 했습니다. 제 코드 9건은 반대로 팀원 3명이 검토하고 합쳤습니다."
    tags: [{ type: "measured", text: "실측" }]
  - title: "모든 API가 같은 형식으로 응답하는 공통 응답 구조"
    text: "성공과 실패 응답 형식, 예외 클래스, 에러 코드 목록, 전체 예외 처리기를 한곳에 정했습니다. 팀원 4명이 각자 기능의 에러 코드를 이 목록에 더해 썼습니다. 처음 작성은 제가 했고, 이후 목록을 가장 많이 고친 사람은 다른 팀원입니다."
    tags: [{ type: "measured", text: "실측" }]
    evidence: ["f66a04f"]
  - title: "팀 공간과 일정 API 13개와 그 테스트"
    text: "두 기능의 API는 모두 14개이고, 대표 이미지 변경 1개는 팀원이 만들었습니다(저는 그 위에 검증과 테스트를 보완). git blame 기준으로 일정 코드는 전부, 팀 공간 코드는 약 90%를 제가 작성했습니다. 제가 쓴 테스트는 131개입니다."
    tags: [{ type: "measured", text: "실측" }]
  - id: "lock"
    title: "팀 공간 변경 요청에 비관적 락"
    text: "공간을 지우는 요청과 고치는 요청이 동시에 들어오면 서로 부딪힙니다. 나가기, 삭제, 소유권 위임 3곳에 비관적 락을 걸고 헬퍼로 묶었고, 팀원이 그 헬퍼를 다섯 곳에서 다시 썼습니다. 조회만 하는 요청은 일부러 락을 걸지 않았습니다. 프로젝트 기간에는 두 요청을 실제로 동시에 보내 보는 테스트를 만들지 못했고, 끝난 뒤 실제 DB에 붙는 테스트로 락이 풀릴 때까지 기다리는 것을 확인했습니다."
    tags: [{ type: "judged", text: "판단" }, { type: "limit", text: "동시 요청 테스트는 종료 뒤 추가" }]
    evidence: ["3a07d56", "4a84ed7"]
  - title: "기본 브랜치를 develop으로 바꾸고 팀 규칙을 문서로 정리"
    text: "2026-07-19에 기본 브랜치를 main에서 develop으로 바꿨습니다. GitLab은 기본 브랜치의 MR 양식만 읽고 새 MR의 대상도 기본 브랜치로 잡아서, main이 기본이면 양식이 안 뜨고 확인 안 한 MR이 배포 브랜치로 갈 수 있습니다. 팀이 합의한 규칙은 문서 5개로 정리했습니다."
    tags: [{ type: "judged", text: "판단" }]
    evidence: ["ebf3bd2", "95e8b53"]
cases:
  - id: "0728"
    kind: "운영, 07-28"
    title: "검토 전 머지 사고 뒤, develop 머지를 통합 담당으로 모았습니다"
    visual: "Timeline0728"
    tags: [{ type: "measured", text: "실측" }, { type: "limit", text: "권한 변경은 저장소 밖" }]
    steps:
      - { label: "무슨 일", text: "그 MR의 검토자가 아닌 팀원이 제 코드를 읽다가 머지 버튼을 눌렀습니다. 1분 뒤 되돌렸고(파일 21개, 약 1,100줄), 그날 오후 제가 다시 머지했습니다." }
      - { label: "바꾼 것", text: "보호 브랜치와 승인 규칙은 이미 있었고, 사고 뒤에는 develop에 머지할 수 있는 사람을 통합 담당인 저로 정리했습니다." }
      - { label: "결과", text: "제가 하지 않은 develop 머지 12건 중 10건이 이날 전에 몰려 있습니다. 나머지 2건은 제 MR을 규칙대로 팀원이 합친 것과 팀원이 자기 긴급 수정을 합친 것입니다. 저장소에 남은 revert 커밋은 이 1건입니다." }
      - { label: "한계", text: "권한을 바꾼 내용과 시점은 GitLab 설정이라 저장소에 기록이 남지 않습니다.", limit: true }
    evidence: ["0c51812", "3f2b038", "2b08a24"]
  - id: "null"
    kind: "문제 해결"
    title: "검색어가 비면 나던 500 에러를 타입 추론에서 찾아 고쳤습니다"
    tags: [{ type: "limit", text: "수정 전 실패는 종료 뒤 확인" }]
    steps:
      - { label: "증상", text: "검색어 없이 조회하면 서버 에러(500)가 났고, 검색어를 넣으면 정상이었습니다." }
      - { label: "원인", text: "검색어 자리에 null이 들어가자 PostgreSQL이 파라미터 타입을 bytea로 추론했고, bytea에는 lower()가 없어 실패했습니다. 이 에러는 분기를 검사하기 전, 타입을 정하는 단계에서 나서 분기 조건을 고쳐도 그대로였습니다." }
      - { label: "해결", text: "쿼리에서 검색어를 문자열로 명시적으로 형변환하도록(cast(:search as string)) 고쳤고, 같은 커밋에 테스트를 넣었습니다." }
      - { label: "한계", text: "프로젝트 기간에는 이 테스트가 수정 전 코드에서 실패하는지 확인하지 않았습니다. 끝난 뒤 수정 직전 커밋으로 확인해 보니 이 에러는 호출 순서를 탔습니다. 그 조회의 첫 호출이 검색어 없는 조회면 실패하고, 검색어 있는 조회가 먼저면 그 뒤로는 나지 않았습니다. 같은 커밋에 넣은 테스트도 먼저 실행될 때만 결함을 잡아서, 순서와 무관하게 잡는 테스트를 따로 더했습니다.", limit: true }
    evidence: ["edfb78c", "SQLSTATE 42883"]
  - id: "boot"
    kind: "문제 해결, 제 선택"
    title: "제가 고른 Spring Boot 4.1에서 원인을 잘못 짚었던 JSON 설정을, 끝난 뒤 다시 확인해 바로잡았습니다"
    tags: [{ type: "judged", text: "판단" }, { type: "limit", text: "당시 진단은 틀림" }]
    steps:
      - { label: "배경", text: "프로젝트 초기 구성 커밋이 제 것이라, Spring Boot 4.1은 제가 골랐습니다. 음성과 영상 서버의 라이브러리 지원 Java 버전이 정해질 때까지 버전을 고정하지 않았고, 프로젝트를 만들 때 생성 도구가 3.x를 더는 내주지 않아 4.x로 시작했습니다. 4.x가 더 낫다고 비교해서 고른 것은 아닙니다." }
      - { label: "당시", text: "인증 기능을 붙이자 서버가 뜨지 않았습니다. 인증 실패 응답을 만드는 제 코드가 JSON 변환 도구(Jackson)의 2 버전 객체를 넘겨받는데, 서버에 그 객체가 없었습니다. 4.x가 JSON 설정을 자동으로 해 주지 않는다고 보고 Jackson 2 설정을 직접 만들어 넣었고, 날짜 형식과 시간대(UTC)도 거기에 정했습니다." }
      - { label: "끝난 뒤 확인", text: "그 진단은 틀렸습니다. 4.x는 JSON 설정을 자동으로 해 주고, 다만 Jackson 3 객체로 줍니다. 실제 응답을 만드는 변환기를 찍어 보니 Jackson 3였고, 제가 만든 설정은 날짜가 없는 보안 에러(401, 403) 본문에만 쓰이고 일반 응답에는 쓰이지 않았습니다. 서버 시간대가 한국 시간인 환경에서 API를 불러 보니, 같은 생성 시각이 DB에서 읽은 응답에서는 UTC로, 방금 만든 응답에서는 +09:00으로 나갔습니다." }
      - { key: true, label: "바로잡음", text: "Jackson 2를 쓰던 코드 15개 파일을 Jackson 3로 옮겨 설정을 하나로 합치고 UTC를 지정했습니다. 바꾼 뒤 같은 API를 다시 불러, 두 응답 모두 API 규약대로 UTC로 나가는 것을 확인했습니다." }
      - { label: "한계", text: "프로젝트 기간에는 틀린 진단을 주석과 문서에 남긴 채였고, 바로잡은 것은 끝난 뒤입니다. 필터 테스트 설정(@AutoConfigureMockMvc)도 4.x에서 위치가 바뀐 것을 찾지 않고 직접 구성했습니다. 끝난 뒤 새 위치로 써 보니 그대로 동작했습니다.", limit: true }
    more: "팀원도 4.x 때문에 비슷한 문제를 겪었습니다. 4.x는 Jackson 3를 쓰는데, 요청 데이터 클래스에 Jackson 2 기능을 쓰면 Spring이 알아보지 못해 500 에러가 납니다. 이 문제를 만나 원인을 주석으로 남긴 사람은 팀원이고, 저는 그 MR을 검토하고 머지했습니다."
    evidence: ["b298885", "949c3a2"]
  - id: "order"
    kind: "설계 판단"
    title: "순서 값이 깨져도 목록이 뜨도록 읽는 규칙을 먼저 정했습니다"
    tags: [{ type: "judged", text: "판단" }, { type: "limit", text: "DB 제약 없음" }]
    steps:
      - { label: "문제", text: "사용자가 스페이스를 끌어서 바꾼 순서를 저장해야 합니다." }
      - { label: "버린 대안", text: "정렬 전용 테이블(사용자, 스페이스, 순서). 이 순서는 늘 한 사용자 몫을 통째로 읽고 저장하고, 검색하거나 조인할 일이 없어서 목록을 볼 때마다 조인만 늘어난다고 봤습니다." }
      - { key: true, label: "선택", text: "users 테이블의 컬럼 하나에 \"5,2,9\"처럼 저장하고, 깨질 수 있다고 보고 규칙을 먼저 정했습니다. 순서에 없는 새 스페이스는 최신순으로 맨 앞에, 사라진 번호는 버리고, 읽을 수 없는 값은 에러 없이 건너뜁니다." }
      - { label: "비교", text: "검색이 필요한 일정 참여자는 배열 컬럼에 GIN 인덱스를 두었고, 검색할 일이 없는 이 순서는 문자열 하나로 저장했습니다." }
      - { label: "약점", text: "DB 제약이 없어 값이 맞는지는 위 규칙에만 기댑니다. 쉼표로 이은 문자열이라 잘못된 값이 들어와도 DB가 막지 못합니다.", limit: true }
---

- **머지 수를 세는 기준.** `origin/main`에 남은 `into 'develop'` 머지 95건 중 83건(87.4%). `into 'main'` 머지 10건은 전부 제 것이고, 그중 배포는 9건(develop에서 main으로 5 + hotfix 4), 나머지 1건은 07-19 오머지입니다.
- **제 브랜치를 팀원이 머지한 9건**은 팀원 3명이 각각 5, 2, 2건입니다. 제가 머지한 제 브랜치 20건 = main 머지 2(배포 1, 07-19 오머지 1) + 07-19 ~ 21 docs 5 + feature, fix 13(전부 07-28 이후). 이때도 검토는 팀원에게 받고 합치기 버튼만 제가 눌렀습니다.
- **작업량**: 실작업 커밋 78건 + 머지 커밋 94건, 손댄 파일 117개, +10,303 / −890줄.
- **공통 응답과 예외 틀**: `f66a04f`(19파일 587줄): `ApiResponse`, `CustomException`, `ErrorCode`, `ErrorResponse`, `GlobalExceptionHandler`. blame 기준 `ApiResponse` 28/28줄, `GlobalExceptionHandler` 45/49줄, `JwtAuthenticationFilter` 62/68줄, `SecurityConfig` 74/92줄.
- **SPACE, SCHEDULE**: blame `schedule/` 523/523줄, `space/` 873/965줄, 테스트 `space` 1,734/1,750줄, `schedule` 559/559줄.
- **비관적 락**: `TeamRepository.findActiveByIdForUpdate()`의 `@Lock(PESSIMISTIC_WRITE)`. 제가 건 곳은 나가기, 삭제, 위임 3곳(`3a07d56`)이고, 읽기 경로는 락 없음입니다. 락이 실제로 기다리게 하는지는 2026-11에 붙인 테스트로 확인했습니다(`4a84ed7`).
- **기본 브랜치 변경**: `Main/Docs/02_Dailylog/2026-07-19.md` §3(`ebf3bd2`). 컨벤션 문서 5종: `95e8b53`(304줄).
- **테스트**: Java 116개 + pytest 15개.
- **null 타입 추론 에러**: PostgreSQL SQLSTATE 42883(`lower(bytea)` 없음). 수정과 테스트 `edfb78c`. 2026-11에 수정 직전 커밋(`ff659fd`)으로 확인해 보니 에러와 테스트 모두 호출 순서를 타서, 첫 호출이 검색어 없는 조회일 때를 따로 잡는 테스트를 더했습니다(`4e2f3dd`).
- **Spring Boot 4.1**: 스캐폴딩 `b298885`(07-21). 당시 `JacksonConfig` 27줄은 Jackson 2 설정이었고 일반 응답 변환에는 쓰이지 않았습니다(보안 401, 403 본문만 이 객체로 썼습니다). 2026-11에 Jackson 3 하나로 합쳤습니다(`949c3a2`). 필터 테스트는 `MockMvcBuilders`로 구성. Jackson 3(`tools.jackson.*`) 주석은 팀원 커밋 `168874c`(제 머지 `512571c`).
- **07-28 타임라인**: 10:48 팀원이 제 브랜치 머지 `0c51812`, 10:49:57 되돌리기 `3f2b038`(21파일 −1,096줄), 17:27 제가 재통합 `2b08a24`.
- **스페이스 정렬**: `users.space_order`(CSV 문자열). 일정 참여자는 `schedules.user_id_arr` `BIGINT[]` + GIN 인덱스.
- **프로젝트가 끝난 뒤 고친 것(2026-11)**: 테스트를 단위와 실제 DB 두 층으로 분리, 팀 공간 락 테스트, 초대 동시 수락이 정원 10명을 넘기던 문제, 로컬 파일 저장, Jackson 3 통일, GitHub Actions 테스트 실행. 팀 프로젝트 기간의 작업과 구분해 저장소 README에 따로 적었습니다.
