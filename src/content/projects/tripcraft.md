---
title: "TripCraft"
order: 2
summary: "여러 명이 함께 짜는 국내 여행 일정 플래너"
oneLine: "지도, 대중교통 이동시간, 시간표를 한 화면에 두고 여러 명이 동시에 편집하는 국내 여행 일정 플래너입니다. 2인 캡스톤으로 시작해, 끝난 뒤 한 달 남짓 혼자 더 개발했습니다. 여러 명이 동시에 고칠 때 데이터가 어긋나지 않게 하는 부분과 실시간 협업, 커뮤니티 게시판을 맡았습니다."
period: "2026.05 – 06.26 캡스톤 → 08.06까지 혼자 추가 개발(31커밋)"
team: "2명 → 1명"
role: "동시 편집 충돌 방지 · 실시간 협업 · 커뮤니티 게시판"
stack: ["Java 21", "Spring Boot 3.5", "MyBatis", "MySQL 8", "Vue 3", "WebSocket(STOMP)"]
repo: "https://github.com/DreamingGenie/TripCraft"
highlight: "낙관적 락이 못 잡는 일정 겹침을 여행 단위 잠금으로 막았습니다"
cover: "/images/projects/tripcraft/cover.png"
gallery:
  - { src: "/images/projects/tripcraft/01.png", caption: "일정 편집 화면" }
  - { src: "/images/projects/tripcraft/02.png", caption: "함께 편집할 때 보이는 협업 커서" }
areas:
  - group: "협업 편집"
    items:
      - { name: "동시 편집 충돌 제어", owner: "me", note: "낙관적 락 · 여행 단위 잠금" }
      - { name: "실시간 연결(STOMP)", owner: "me" }
      - { name: "접속자 표시 · 협업 커서", owner: "me" }
      - { name: "편집 화면(Vue)", owner: "team" }
  - group: "일정 데이터"
    items:
      - { name: "대중교통 이동시간 계산", owner: "team" }
      - { name: "저장 뒤 작업 순서(afterCommit)", owner: "me" }
  - group: "커뮤니티 · 기반"
    items:
      - { name: "댓글 · 게시글 이미지 정리", owner: "me" }
      - { name: "보안 설정", owner: "team" }
      - { name: "백엔드 테스트 · 문서", owner: "me" }
      - { name: "화면 디자인(CSS)", owner: "team" }
did:
  - title: "같은 일정을 동시에 고치면 뒤에 저장한 쪽에 알림(낙관적 락)"
    text: "일정마다 버전 번호를 두고, 저장할 때 내가 읽었던 버전 그대로인지 확인합니다. 그사이 다른 사람이 먼저 고쳤다면 저장하지 않고 충돌(409)을 돌려줍니다. 흔한 방식이라, 아래 두 가지와 함께 봐야 의미가 있습니다."
    tags: [{ type: "judged", text: "판단" }]
    evidence: ["9351269"]
  - title: "시스템이 값을 바꿨다고 사용자에게 충돌이 뜨지 않게"
    text: "일정을 옮기면 시스템이 이동시간을 다시 계산해 저장합니다. 이때 버전까지 올리면 사용자는 아무와도 부딪히지 않았는데 다음 저장에서 충돌을 받습니다. 그래서 이동시간을 고치는 쿼리와 사용자가 일정을 고치는 쿼리를 나누고, 이동시간 쿼리는 버전을 건드리지 않게 했습니다."
    tags: [{ type: "judged", text: "판단" }]
  - title: "저장이 끝난 뒤에 할 일을 세 곳에, 서로 다른 이유로"
    text: "변경 알림은 저장된 순서대로 알리려고, 외부 API를 부르는 이동시간 계산은 일정 잠금 구간에서 빼려고, 게시글 이미지 파일 삭제는 저장이 취소됐을 때 파일만 먼저 지워지지 않게 저장 뒤로 미뤘습니다. 다만 이동시간 계산은 같은 요청 스레드에서 돌아서, 응답은 계산을 기다리고 그동안 DB 연결도 씁니다. 비동기로 분리하지는 않았습니다."
    tags: [{ type: "judged", text: "판단" }, { type: "limit", text: "비동기 아님" }]
    evidence: ["f092a9d", "0598a91"]
  - title: "커서를 움직일 때마다 DB에 권한을 묻던 것을 없앰"
    text: "협업 커서 위치는 실시간 메시지로 계속 오가는데, 메시지마다 DB에서 편집 권한을 확인하고 있었습니다. 권한 확인 결과를 접속마다 기억하고, 협업자나 공유 설정이 바뀔 때만 여행별 번호를 올려 다음 메시지에서 다시 확인하게 했습니다. 이미 맺은 구독은 연결이 끊길 때까지 그대로 받습니다."
    tags: [{ type: "judged", text: "판단" }, { type: "limit", text: "기존 구독은 안 끊음" }]
cases:
  - id: "lock"
    kind: "설계 판단"
    title: "같은 시간에 일정 두 개가 들어가는 문제, 여행 단위로 한 명씩 저장하게 했습니다"
    visual: "LockDiagram"
    tags: [{ type: "judged", text: "판단" }, { type: "limit", text: "동시 요청 테스트 없음" }]
    steps:
      - { label: "문제", text: "A가 10–12시 박물관을, B가 11–13시 시장을 동시에 넣으면 서로의 입력을 모른 채 둘 다 저장됩니다." }
      - { label: "안 되는 이유", text: "낙관적 락은 내가 읽은 뒤 누가 이 일정을 고쳤는지를 일정 한 건씩 확인합니다. 겹침은 서로 다른 두 일정 사이에서 생겨서, 한 건씩 보면 충돌이 없습니다. PostgreSQL에는 기간이 겹치는 값을 DB가 거부하는 기능이 있지만, 이 프로젝트는 MySQL을 썼습니다." }
      - { label: "선택", text: "일정을 넣거나 옮기기 전에 그 여행 자체에 잠금을 겁니다(SELECT … FOR UPDATE). 두 번째 사람은 첫 저장이 끝날 때까지 기다렸다가 겹침 검사를 하므로, 방금 들어간 일정을 보고 거절됩니다. 순서 번호도 잠금 안에서 서버가 매겨, 같은 자리를 받는 문제도 함께 막힙니다." }
      - { label: "잠금이 짧은 이유", text: "느린 외부 API 호출을 이미 저장 뒤로 빼 두어서, 잠금은 DB에 쓰는 동안만 걸립니다. 순서가 반대였다면 API 응답을 기다리는 내내 여행 전체가 잠겨 있었을 겁니다." }
      - { label: "한계", text: "한 여행에 편집자가 몰리면 저장이 줄을 섭니다. 몇 명부터 느려지는지는 재 보지 않았습니다. 테스트 대부분이 DB를 흉내 낸 가짜 객체(Mockito)라 실제 잠금이 일어나지 않고, 실제 DB로 돌리는 테스트는 제 환경에서 실행되지 않았습니다.", limit: true }
    more: "처음 설계 문서에는 \"잠금까지 거는 건 과하다\"고 적었습니다. 겹침은 한 건씩 보는 방식으로 막을 수 없다는 걸 알고 코드에는 잠금을 넣었는데, 문서는 그대로였습니다. 09-10에 이 어긋남을 찾아 문서를 코드 기준으로 고쳤습니다."
    evidence: ["704fb81", "a24a4b6", "TripMapper.xml:28"]
  - id: "order"
    kind: "문제 해결"
    title: "변경 알림이 저장보다 먼저 나가고 있었습니다"
    visual: "NotifyOrder"
    tags: [{ type: "judged", text: "판단" }, { type: "limit", text: "남은 버그 1건" }]
    steps:
      - { label: "문제", text: "누가 일정을 고치면 다른 사람 화면에 알림을 보내는데, DB 저장이 끝나기 전에 보내고 있었습니다. 받는 쪽은 저장되지 않은 상태를 먼저 받고, 연달아 고치면 도착 순서와 저장 순서가 어긋날 수 있었습니다." }
      - { label: "해결", text: "알림을 보내는 일과 알림에 순번을 매기는 일을 모두 저장이 끝난 뒤로 옮겼습니다. 순번 순서, 저장 순서, 보내는 순서가 모두 같아지고, 화면은 이미 받은 순번 이하의 알림을 버립니다." }
      - { label: "배운 것", text: "실시간 알림의 순서를 따로 관리하기보다, 저장 순서를 그대로 따르게 만드는 편이 훨씬 단순합니다." }
      - { label: "남은 것", text: "이 수정 뒤로 이동시간 재계산 완료 알림이 나가지 않습니다. 저장 뒤 작업 안에서 다시 등록한 저장 뒤 작업을 Spring이 부르지 않기 때문입니다. 단위 테스트는 트랜잭션 밖이라 잡지 못했고, 아직 고치지 않았습니다.", limit: true }
    evidence: ["f092a9d"]
---

- **분담**: master 353커밋 중 161건. `git blame -w -M HEAD`(2026-09-10) 기준 백엔드 테스트 97.6%, 문서 70.1%, 백엔드 Java 28.1%. 화면(Vue·CSS)은 약 84%가 팀원 줄입니다. 테스트 비율은 누가 썼는지이지 충실한지가 아닙니다. 배포는 `DEPLOY-LOG.md` 0단계까지.
- **낙관적 락**: `TripBlockMapper.xml:69` `UPDATE … version = version + 1 WHERE id = ? AND version = ?`가 0행이면 409(`9351269`).
- **쿼리 분리**: 이동시간 재계산 `updateTransitById`, 사용자 편집 `updateWithVersion`. 설계 문서 §4 · 코드 · `TripServiceImplTest:208`.
- **저장 뒤 작업**: 편집 알림(`BLOCK_*`) `f092a9d`, 외부 API 재계산 `TripServiceImpl:451, 488, 490, 528`, 이미지 삭제 `0598a91`(`PostImageCleanupListener` 29줄 전부 본인).
- **STOMP 권한 캐시**: `TripAccessVersion`(30줄 전부 본인), 번호 올림 호출 163 · 232 · 240행.
- **전부 제가 쓴 파일**: `WebSocketConfig` 40/40줄, `TripPresenceController` 205/206줄, `CommentServiceImpl` 117/117줄, `useCollabCursor.js` 197/197줄.
- **알림 순서**: `broadcast()`와 이벤트 순번 부여를 `afterCommit`으로(`f092a9d`). 화면은 `event.seq <= lastEventSeq`면 버림. 재계산 완료 알림(`TRANSIT_RECALCULATED`)은 이 변경 뒤로 나가지 않습니다(다른 사람 화면은 이어지는 편집 알림의 재조회로 대부분 맞춰집니다).
- **여행 단위 잠금**: `TripMapper.xml:28` `SELECT id FROM trip WHERE id = ? FOR UPDATE`, `TripServiceImpl.placeBlock` · `updateBlock`에서 잠근 뒤 `assertNoOverlap` 호출, 순서 번호는 `nextDisplayOrder`로 잠금 안에서 서버가 할당(`704fb81`). 테스트 14개 중 13개가 Mockito, Testcontainers는 `contextLoads` 1건이며 제 환경에서 Docker API 400으로 실행되지 않았습니다. 문서 정정 `a24a4b6`(2026-09-10).
