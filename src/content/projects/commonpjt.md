---
title: "CommonPJT · CoMeetTool"
order: 1
summary: "음성 회의를 기록·요약하고 팀 공간과 일정을 함께 관리하는 협업 도구"
oneLine: "음성 회의를 기록하고 요약해 주고, 팀별 공간(스페이스)과 일정을 함께 관리하는 협업 도구입니다. 7명 팀에서 팀 합의로 PM과 코드 통합을 맡았고, 팀 공간과 일정 기능의 백엔드를 만들었습니다."
period: "2026.07.14 – 08.10 (27일)"
team: "7명 · 교육기관 GitLab(비공개)"
role: "PM · 코드 검토와 통합 · 팀 공간·일정 백엔드"
stack: ["Java 21", "Spring Boot 4.1", "Spring Data JPA", "PostgreSQL", "Vue 3", "AWS ECS Fargate", "GitLab CI"]
highlight: "공동 개발 브랜치 머지 95건 중 83건을 검토하고 합쳤습니다"
cover: "/images/projects/commonpjt/cover.jpeg"
gallery:
  - { src: "/images/projects/commonpjt/01.jpeg", caption: "홈 — 내 팀 스페이스 목록과 여러 스페이스의 일정을 모은 달력" }
shotNote: "로컬에서 백엔드를 띄워 찍은 화면입니다. 팀 스페이스와 일정은 시연용으로 넣은 데이터입니다(2026-10-02)."
areas:
  - group: "기능"
    items:
      - { name: "팀 공간(SPACE) API", owner: "me", note: "대표 이미지 변경 1개는 팀원" }
      - { name: "일정(SCHEDULE) API", owner: "me" }
      - { name: "음성 발화 분할", owner: "team" }
      - { name: "AI 요약 처리", owner: "team" }
  - group: "공통 기반"
    items:
      - { name: "공통 응답·예외 틀", owner: "me", note: "팀원 4명이 에러 코드를 더해 씀" }
      - { name: "JWT 필터·보안 설정", owner: "me", note: "대부분" }
      - { name: "DB 설계(ERD)", owner: "shared" }
      - { name: "CI/CD 설정", owner: "team" }
  - group: "협업·운영"
    items:
      - { name: "develop 통합·main 머지", owner: "me" }
      - { name: "팀 규칙 문서·브랜치 설정", owner: "me", note: "규칙은 팀이 정함" }
did:
  - id: "merge"
    title: "팀원 코드를 검토하고 합치는 일"
    text: "각자 브랜치에서 작업한 뒤 MR(병합 요청)을 올리고, 검토를 거쳐 develop에 합치는 방식이었습니다. develop에 합친 95건 중 83건을 제가 처리했고, main 머지 16건(그중 배포 9건)은 모두 제가 했습니다. 제 코드 10건은 반대로 팀원 3명이 검토하고 합쳤습니다."
    tags: [{ type: "measured", text: "실측" }]
  - title: "모든 API가 같은 모양으로 응답하는 공통 틀"
    text: "성공·실패 응답 형식, 예외 클래스, 에러 코드 목록, 전체 예외 처리기를 한곳에 정했습니다. 팀원 4명이 각자 기능의 에러 코드를 이 목록에 더해 쓰면서 팀 공통 규칙이 됐습니다. 처음 만든 건 저지만, 그 뒤 목록을 가장 많이 고친 사람은 다른 팀원입니다."
    tags: [{ type: "measured", text: "실측" }]
    evidence: ["ea65857"]
  - title: "팀 공간·일정 API 13개와 그 테스트"
    text: "두 기능의 API는 모두 14개이고, 대표 이미지 변경 1개는 팀원이 만들었습니다(저는 그 위에 검증과 테스트를 보완). 일정 코드는 전부, 팀 공간 코드는 약 90%가 제 줄입니다. 제가 쓴 테스트는 131개입니다."
    tags: [{ type: "measured", text: "실측" }]
  - title: "팀 공간을 바꾸는 요청은 한 번에 하나씩"
    text: "공간을 지우는 요청과 고치는 요청이 동시에 들어오면 서로 부딪힙니다. 나가기·삭제·소유권 위임 3곳에 비관적 잠금을 걸고 헬퍼로 묶었고, 팀원이 그 헬퍼를 다섯 곳에서 다시 썼습니다. 조회만 하는 요청은 일부러 잠그지 않았습니다."
    tags: [{ type: "judged", text: "판단" }, { type: "limit", text: "동시 요청 테스트 없음" }]
    evidence: ["890f1b6"]
  - title: "실수할 수 있는 경로를 설정으로 막음"
    text: "07-19에 기본 브랜치를 main에서 develop으로 바꿨습니다. GitLab은 기본 브랜치의 MR 양식만 읽고 새 MR의 대상도 기본 브랜치로 잡아서, main이 기본이면 양식이 안 뜨고 확인 안 한 MR이 배포 브랜치로 갈 수 있습니다. 팀이 합의한 규칙은 문서 5개로 정리했습니다."
    tags: [{ type: "judged", text: "판단" }]
    evidence: ["2251227", "afa0800"]
cases:
  - id: "0728"
    kind: "운영 · 07-28"
    title: "검토가 끝나지 않은 코드가 합쳐진 날"
    visual: "Timeline0728"
    tags: [{ type: "measured", text: "실측" }, { type: "limit", text: "권한 변경은 저장소 밖" }]
    steps:
      - { label: "무슨 일", text: "그 MR의 검토자가 아닌 팀원이 제 코드를 읽다가 합치기 버튼을 눌렀습니다. 1분 뒤 되돌렸고(파일 21개, 약 1,100줄), 그날 오후 제가 다시 합쳤습니다." }
      - { label: "바꾼 것", text: "보호 브랜치와 승인 규칙은 이전부터 있었습니다. 이날 뒤로 바꾼 것은 develop에 합칠 수 있는 사람이고, 통합 담당인 저에게만 남겼습니다." }
      - { label: "결과", text: "제가 하지 않은 develop 머지 12건 중 10건이 이날 전에 몰려 있습니다. 저장소에 남은 되돌리기는 이 1건뿐입니다." }
      - { label: "한계", text: "권한 변경은 GitLab 설정이라 저장소에 기록이 남지 않습니다.", limit: true }
    evidence: ["9dfa322", "fd9f6ae", "30f5fb4"]
  - id: "null"
    kind: "문제 해결"
    title: "검색어를 비우면 스페이스 목록이 항상 500 에러"
    tags: [{ type: "limit", text: "수정 전 실패 미확인" }]
    steps:
      - { label: "증상", text: "검색어 없이 조회하면 항상 서버 에러(500)가 났고, 검색어를 넣으면 정상이었습니다." }
      - { label: "원인", text: "검색어 자리에 null이 들어가자 PostgreSQL이 값의 종류를 문자가 아니라 bytea로 짐작했고, bytea에는 lower()가 없어 실패했습니다. 이 에러는 분기를 검사하기 전, 쿼리를 실행할 준비 단계에서 나서 분기 조건을 고쳐도 그대로였습니다." }
      - { label: "해결", text: "쿼리에서 검색어가 문자라고 직접 알려 주도록(cast(:search as string)) 고쳤고, 같은 커밋에 테스트를 넣었습니다." }
      - { label: "배운 것", text: "에러 위치가 제 코드를 가리켜도 실제로 실패한 단계는 더 앞일 수 있습니다. 값의 종류를 정하는 일은 조건 분기보다 먼저 끝납니다." }
      - { label: "한계", text: "이 테스트가 수정 전 코드에서 실패하는지는 확인하지 않았습니다.", limit: true }
    evidence: ["6014a9d", "SQLSTATE 42883"]
  - id: "boot"
    kind: "문제 해결 · 제 선택"
    title: "제가 고른 Spring Boot 4.1의 비용을 제가 치렀습니다"
    tags: [{ type: "judged", text: "판단" }, { type: "limit", text: "비교 기록 없음" }]
    steps:
      - { label: "먼저 밝힐 것", text: "프로젝트 뼈대를 만든 커밋이 제 것이라, Spring Boot 4.1을 고른 사람이 저입니다. 음성·영상 서버의 라이브러리 지원 Java 버전이 정해질 때까지 버전을 고정하지 않았고, 프로젝트를 만들 때 생성 도구가 3.x를 더는 내주지 않아 4.x로 시작했습니다. 4.x가 낫다고 판단해 고른 것은 아닙니다." }
      - { label: "증상", text: "날짜가 의도한 형식이 아니라 숫자로 나갔고, 필터 테스트에서 자주 쓰는 설정(@AutoConfigureMockMvc)이 동작하지 않았습니다." }
      - { label: "원인", text: "4.x 웹 기본 묶음에서 JSON 변환 도구(Jackson) 자동 설정이 빠졌습니다. 프레임워크가 하던 일이 사라진 것이라 서비스 코드를 아무리 봐도 원인이 나오지 않았습니다." }
      - { label: "해결", text: "JSON 변환 설정을 직접 만들어 날짜를 문자 형식으로, 시간대를 UTC로 고정하고, 이 설정이 빠지면 깨지는 테스트를 붙였습니다. 필터 테스트는 자동 설정 없이 직접 구성했습니다." }
      - { label: "남기지 못한 것", text: "3.x와 4.x를 비교한 표나 새 버전의 위험을 미리 따진 기록은 없습니다.", limit: true }
    more: "팀도 같은 비용을 치렀습니다. 4.x는 Jackson 3를 쓰는데, 요청 데이터 클래스에 Jackson 2 기능을 쓰면 Spring이 알아보지 못해 500 에러가 납니다. 이 문제를 만나 원인을 주석으로 남긴 사람은 팀원이고, 저는 그 MR을 검토하고 합쳤습니다.\n\n다음에 최신 버전을 고를 때는 프로젝트를 만드는 단계에서 자동 설정 목록이 어떻게 달라졌는지부터 확인하려 합니다."
    evidence: ["f8beb3b"]
  - id: "order"
    kind: "설계 판단"
    title: "순서 데이터가 깨져도 목록은 뜨게"
    tags: [{ type: "judged", text: "판단" }, { type: "limit", text: "DB 제약 없음" }]
    steps:
      - { label: "문제", text: "사용자가 스페이스를 끌어서 바꾼 순서를 저장해야 합니다." }
      - { label: "버린 대안", text: "정렬 전용 테이블(사용자, 스페이스, 순서). 이 순서는 늘 한 사용자 몫을 통째로 읽고 저장하고, 검색하거나 조인할 일이 없어서 목록을 볼 때마다 조인만 늘어난다고 봤습니다." }
      - { label: "선택", text: "사용자 정보 한 칸에 \"5,2,9\"처럼 저장하고, 깨질 수 있다고 보고 규칙을 먼저 정했습니다. 순서에 없는 새 스페이스는 최신순으로 맨 앞에, 사라진 번호는 버리고, 읽을 수 없는 값은 에러 없이 건너뜁니다." }
      - { label: "기준", text: "검색할 일이 있으면 인덱스를 두고(일정 참여자는 배열 + GIN 인덱스), 없으면 통째로 저장합니다." }
      - { label: "약점", text: "이 칸의 올바름은 전적으로 위 규칙에 달려 있습니다. 쉼표로 이은 문자열은 그중 가장 방어가 약한 방식입니다.", limit: true }
---

- **머지 수를 세는 기준.** `origin/main`에 남은 `into 'develop'` 머지 95건 중 83건(87.4%). develop 브랜치까지 포함하면 115건 중 92건(80.0%)이고, 이 92건은 타인 브랜치 71건 + 제 브랜치 21건입니다. `into 'main'` 머지 16건은 전부 제 것이고, 그중 배포는 9건입니다.
- **제 브랜치를 팀원이 머지한 10건**은 팀원 3명이 각각 5 · 3 · 2건입니다. 제가 머지한 제 브랜치 21건 = develop→main 배포 2 + 07-19 ~ 21 docs 5 + feature·fix 14(전부 07-28 이후). 이때도 검토는 팀원에게 받고 합치기 버튼만 제가 눌렀습니다.
- **작업량**: 실작업 커밋 80건 + 머지 커밋 100건, 손댄 파일 126개, +10,877 / −890줄.
- **공통 응답·예외 틀**: `ea65857`(19파일 587줄) — `ApiResponse` · `CustomException` · `ErrorCode` · `ErrorResponse` · `GlobalExceptionHandler`. blame 기준 `ApiResponse` 28/28줄, `GlobalExceptionHandler` 45/49줄, `JwtAuthenticationFilter` 62/68줄, `SecurityConfig` 74/92줄.
- **SPACE·SCHEDULE**: blame `schedule/` 523/523줄, `space/` 873/965줄, 테스트 `space` 1,734/1,750줄, `schedule` 559/559줄.
- **비관적 잠금**: `TeamRepository.findActiveByIdForUpdate()`의 `@Lock(PESSIMISTIC_WRITE)`. 제가 건 곳은 나가기·삭제·위임 3곳(`890f1b6`)이고, 읽기 경로는 무잠금입니다.
- **기본 브랜치 변경**: `Main/Docs/02_Dailylog/2026-07-19.md` §3(`2251227`). 컨벤션 문서 5종: `afa0800`(304줄).
- **테스트**: Java 116개 + pytest 15개.
- **null 타입 추론 에러**: PostgreSQL SQLSTATE 42883(`lower(bytea)` 없음). 수정과 테스트 `6014a9d`.
- **Spring Boot 4.1**: 스캐폴딩 `f8beb3b`(07-21). `JacksonConfig` 27줄(`WRITE_DATES_AS_TIMESTAMPS` 끔, UTC), `JacksonConfigTest`, 필터 테스트는 `MockMvcBuilders`로 구성. Jackson 3(`tools.jackson.*`) 주석은 팀원 커밋 `33474ba`.
- **07-28 타임라인**: 10:48 팀원이 제 브랜치 머지 `9dfa322` → 10:49:57 되돌리기 `fd9f6ae`(21파일 −1,096줄) → 17:27 제가 재통합 `30f5fb4`.
- **스페이스 정렬**: `users.space_order`(CSV 문자열). 일정 참여자는 `schedules.user_id_arr` `BIGINT[]` + GIN 인덱스.
