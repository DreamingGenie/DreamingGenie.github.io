---
title: "TripCraft"
order: 2
summary: "여러 명이 함께 짜는 국내 여행 일정 플래너"
oneLine: "지도, 대중교통 이동시간, 시간표를 한 화면에 두고 여러 명이 동시에 편집하는 국내 여행 일정 플래너입니다. 2인 캡스톤으로 시작해, 끝난 뒤 한 달 남짓 혼자 더 개발했습니다. 동시 편집 충돌 방지와 실시간 협업, 커뮤니티 게시판을 맡았습니다."
period: "2026.05 – 06.26 캡스톤 → 08.06까지 혼자 추가 개발(31커밋) → 2026.11 테스트·결함 보완"
team: "2명 → 1명"
role: "동시 편집 충돌 방지 · 실시간 협업 · 커뮤니티 게시판"
stack: ["Java 21", "Spring Boot 3.5", "MyBatis", "MySQL 8", "Vue 3", "WebSocket(STOMP)"]
repo: "https://github.com/DreamingGenie/TripCraft"
highlight: "낙관적 락이 못 잡는 일정 겹침을 여행 단위 락으로 막고, 실 DB 테스트로 찾은 격리수준 결함을 고쳤습니다"
cover: "/images/projects/tripcraft/cover.jpg"
gallery:
  - { src: "/images/projects/tripcraft/01.jpg", caption: "다른 계정으로 같은 여행을 열면, 그 사람의 커서와 접속 표시가 실시간으로 보입니다" }
shotNote: "로컬 Docker로 띄워 두 계정으로 찍은 화면입니다. 일정은 시연용 데이터이고, 지도와 이동시간은 로컬에서 외부 키가 없어 비어 있습니다(2026-10-02)."
areas:
  - group: "협업 편집"
    items:
      - { name: "동시 편집 충돌 제어", owner: "me", note: "낙관적 락 · 여행 단위 락" }
      - { name: "실시간 연결(STOMP)", owner: "me" }
      - { name: "접속자 표시 · 협업 커서", owner: "me" }
      - { name: "편집 화면(Vue)", owner: "team" }
  - group: "일정 데이터"
    items:
      - { name: "대중교통 이동시간 계산", owner: "team" }
      - { name: "커밋 후 작업 순서(afterCommit)", owner: "me" }
  - group: "커뮤니티 · 기반"
    items:
      - { name: "댓글 · 게시글 이미지 정리", owner: "me" }
      - { name: "보안 설정", owner: "team" }
      - { name: "백엔드 테스트 · 문서", owner: "me" }
      - { name: "화면 디자인(CSS)", owner: "team" }
did:
  - title: "같은 일정을 동시에 고치면 뒤에 저장한 쪽에 알림(낙관적 락)"
    text: "일정마다 버전 번호를 두고, 저장할 때 내가 읽었던 버전 그대로인지 확인합니다. 그사이 다른 사람이 먼저 고쳤다면 저장하지 않고 충돌(409)을 돌려줍니다."
    tags: [{ type: "judged", text: "판단" }]
    evidence: ["9942b7f"]
  - title: "서버가 다시 계산한 이동시간은 버전을 올리지 않음"
    text: "일정을 옮기면 시스템이 이동시간을 다시 계산해 저장합니다. 이때 버전까지 올리면 사용자는 아무와도 부딪히지 않았는데 다음 저장에서 충돌을 받습니다. 그래서 이동시간을 고치는 쿼리와 사용자가 일정을 고치는 쿼리를 나누고, 이동시간 쿼리는 버전을 건드리지 않게 했습니다."
    tags: [{ type: "judged", text: "판단" }]
  - title: "커밋 뒤로 미룬 작업 세 곳과 각각의 이유(afterCommit)"
    text: "변경 알림은 저장된 순서대로 보내려고 저장 뒤로 미뤘습니다. 외부 API를 부르는 이동시간 계산은 일정 락 구간에서 빼려고 옮겼고, 게시글 이미지 파일 삭제는 저장이 취소됐을 때 파일만 먼저 지워지는 일을 막으려고 옮겼습니다. 다만 캡스톤 때는 이동시간 계산이 같은 요청 스레드에서 돌아, 응답이 계산을 기다리고 그동안 DB 연결도 썼습니다. 2026-11에 이 계산을 일정별 순서 큐로 분리해, 지금은 편집 응답이 재계산을 기다리지 않습니다. 실패한 계산을 자동으로 다시 시도하지는 않고, 실패한 일정을 화면에 알리는 데까지입니다."
    tags: [{ type: "judged", text: "판단" }, { type: "limit", text: "자동 재시도 없음" }]
    evidence: ["fad7388", "6856a5b", "e715e6f"]
  - title: "커서 메시지마다 하던 권한 조회 쿼리를 없앰"
    text: "협업 커서 위치는 실시간 메시지로 계속 오가는데, 메시지마다 DB에서 편집 권한을 확인하고 있었습니다. 권한 확인 결과를 접속마다 기억하고, 협업자나 공유 설정이 바뀔 때만 여행별 권한 버전 번호를 올려 다음 메시지에서 다시 확인하게 했습니다. 캡스톤 때는 이미 맺은 구독이 연결이 끊길 때까지 그대로였습니다. 2026-11에, 공유를 끄거나 협업자에서 빼면 그 사람이 열어 둔 일정 채널 구독을 서버가 끊게 고쳤습니다(서버 한 대 기준)."
    tags: [{ type: "judged", text: "판단" }, { type: "limit", text: "서버 한 대 기준" }]
    evidence: ["6d7002b"]
cases:
  - id: "lock"
    kind: "설계 판단"
    title: "겹치는 시간에 일정 두 개가 들어가던 것을 여행 단위 락과 격리수준 수정으로 막았습니다"
    visual: "LockDiagram"
    tags: [{ type: "judged", text: "판단" }, { type: "measured", text: "실 DB 동시성 테스트" }, { type: "limit", text: "결함은 종료 뒤 발견" }]
    steps:
      - { label: "문제", text: "A가 10–12시 박물관을, B가 11–13시 시장을 동시에 넣으면 서로의 입력을 모른 채 둘 다 저장됩니다." }
      - { label: "안 되는 이유", text: "낙관적 락은 내가 읽은 뒤 누가 이 일정을 고쳤는지를 일정 한 건씩 확인합니다. 겹침은 서로 다른 두 일정 사이에서 생겨서, 한 건씩 보면 충돌이 없습니다. PostgreSQL에는 기간이 겹치는 값을 DB가 거부하는 기능이 있지만, 이 프로젝트는 MySQL을 썼습니다." }
      - { label: "선택", text: "일정을 넣거나 옮기기 전에 그 여행 자체에 락을 겁니다(SELECT … FOR UPDATE). 두 번째 사람이 첫 저장이 끝날 때까지 기다렸다가 겹침 검사를 하게 해서, 방금 들어간 일정을 보고 거절되게 하려는 것입니다. 순서 번호도 락 안에서 서버가 매기게 했습니다." }
      - { label: "락 구간", text: "느린 외부 API 호출을 이미 저장 뒤로 빼 두어서, 락은 DB에 쓰는 동안만 걸립니다. 순서가 반대였다면 API 응답을 기다리는 내내 여행 전체에 락이 걸려 있었을 겁니다." }
      - { label: "뒤늦게 찾은 결함", text: "캡스톤 때는 동시 요청 테스트가 없었습니다. 2026-11에 실제 MySQL로 동시 요청 테스트를 붙여 보니, 겹치는 일정 두 개가 둘 다 저장됐고 순서 번호도 중복됐습니다. MySQL 기본 격리수준(REPEATABLE READ)에서는 락을 걸기 전 권한 조회 때 읽기 스냅샷이 만들어져, 락을 얻은 뒤의 겹침 검사도 상대의 커밋을 보지 못했습니다. 락은 순서만 세웠던 것입니다.", limit: true }
      - { label: "수정", text: "일정을 넣고 옮기는 두 메서드의 격리수준을 READ COMMITTED로 바꿨습니다. 수정 전에는 실패하고 수정 뒤에는 통과하는 동시성 테스트 2건을 남겼습니다." }
      - { label: "한계", text: "한 여행에 편집자가 몰리면 저장이 줄을 섭니다. 몇 명부터 느려지는지는 측정하지 않았습니다.", limit: true }
    more: "처음 설계 문서에는 \"락까지 거는 건 과하다\"고 적었습니다. 겹침은 한 건씩 보는 방식으로 막을 수 없다는 걸 알고 코드에는 락을 넣었는데, 문서는 그대로였습니다. 2026-09-10에 이 어긋남을 찾아 문서를 코드 기준으로 고쳤습니다."
    evidence: ["913a4c1", "f5669d9", "d2035b0", "TripMapper.xml:28"]
  - id: "order"
    kind: "문제 해결"
    title: "변경 알림을 저장이 끝난 뒤 순번대로 보내게 바꿨습니다"
    visual: "NotifyOrder"
    tags: [{ type: "judged", text: "판단" }, { type: "limit", text: "부작용은 종료 뒤 수정" }]
    steps:
      - { label: "문제", text: "누가 일정을 고치면 다른 사람 화면에 알림을 보내는데, DB 저장이 끝나기 전에 보내고 있었습니다. 받는 쪽은 저장되지 않은 상태를 먼저 받고, 연달아 고치면 도착 순서와 저장 순서가 어긋날 수 있었습니다." }
      - { label: "해결", text: "알림을 보내는 일과 알림에 순번을 매기는 일을 모두 저장이 끝난 뒤로 옮겼습니다. 그래서 저장 순서와 순번, 전송 순서가 일치하고, 화면은 이미 받은 순번 이하의 알림을 버립니다." }
      - { label: "부작용과 수정", text: "이 수정 뒤로 이동시간 재계산 완료 알림이 나가지 않았습니다. afterCommit 콜백 안에서 다시 등록한 afterCommit 콜백을 Spring이 부르지 않기 때문입니다. 단위 테스트는 트랜잭션 밖이라 잡지 못했습니다. 2026-11에 실제 트랜잭션을 타는 통합테스트를 붙이면서 찾아 고쳤습니다.", limit: true }
    evidence: ["fad7388", "f5669d9"]
---

- **분담**: 기본 브랜치 353커밋 중 161건(2026-09-10 기준). `git blame -w -M HEAD`(2026-09-10) 기준 문서 70.1%, 백엔드 Java 28.1%. 화면(Vue·CSS)은 약 84%가 팀원 줄입니다. 배포는 `DEPLOY-LOG.md` 0단계까지.
- **낙관적 락**: `TripBlockMapper.xml:69` `UPDATE … version = version + 1 WHERE id = ? AND version = ?`가 0행이면 409(`9942b7f`).
- **쿼리 분리**: 이동시간 재계산 `updateTransitById`, 사용자 편집 `updateWithVersion`. 설계 문서 §4 · 코드 · `TripServiceImplTest:208`.
- **커밋 후 작업**: 편집 알림(`BLOCK_*`) `fad7388`, 외부 API 재계산 `TripServiceImpl:451, 488, 490, 528`, 이미지 삭제 `6856a5b`(`PostImageCleanupListener` 29줄 전부 본인).
- **STOMP 권한 캐시**: `TripAccessVersion`(30줄 전부 본인), 번호 올림 호출 163 · 232 · 240행.
- **전부 제가 쓴 파일**: `WebSocketConfig` 40/40줄, `TripPresenceController` 205/206줄, `CommentServiceImpl` 117/117줄, `useCollabCursor.js` 197/197줄.
- **알림 순서**: `broadcast()`와 이벤트 순번 부여를 `afterCommit`으로(`fad7388`). 화면은 `event.seq <= lastEventSeq`면 버림. 재계산 완료 알림(`TRANSIT_RECALCULATED`)은 이 변경 뒤로 나가지 않았고(다른 사람 화면은 이어지는 편집 알림의 재조회로 대부분 맞춰졌습니다), 2026-11-21 PR #9(`f5669d9`)에서 고쳤습니다. 실제 트랜잭션 통합테스트로 수정 전 미발신, 수정 후 발신을 확인했습니다.
- **여행 단위 락**: `TripMapper.xml:28` `SELECT id FROM trip WHERE id = ? FOR UPDATE`, `TripServiceImpl.placeBlock` · `updateBlock`에서 락을 건 뒤 `assertNoOverlap` 호출, 순서 번호는 `nextDisplayOrder`로 락 안에서 서버가 할당(`913a4c1`). 문서 정정 `d2035b0`(2026-09-10). 실제 MySQL 동시 요청에서는 락 뒤 겹침 검사가 락 전 스냅샷을 읽어 겹침을 막지 못했고, 2026-11-21 PR #9(`f5669d9`)에서 두 메서드를 `READ_COMMITTED`로 바꿔 고쳤습니다.
- **테스트**: 캡스톤 때는 14개 중 13개가 Mockito였고, Testcontainers는 `contextLoads` 1건이며 제 환경에서 Docker API 400으로 실행되지 않았습니다. 2026-11-21 PR #9에서 Testcontainers 기동을 복구하고 실제 MySQL 통합테스트를 붙였습니다. `50ad54b`(2026-11-21) 기준 45개(단위 23 · 통합 22)입니다.
- **종료 뒤 보완(2026-11)**: 이동시간 재계산을 일정별 순서 큐로 분리(PR #10 `e715e6f`), 공유를 끄거나 협업자에서 빼면 열려 있던 구독을 끊음(PR #14 `6d7002b`, 실제 WebSocket 연결 통합테스트 2건).
