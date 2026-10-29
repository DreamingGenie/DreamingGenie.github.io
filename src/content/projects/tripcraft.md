---
title: "TripCraft"
order: 2
summary: "여러 명이 함께 짜는 국내 여행 일정 플래너"
oneLine: "지도, 대중교통 이동시간, 시간표를 한 화면에 두고 여러 명이 동시에 편집하는 국내 여행 일정 플래너입니다. 2인 캡스톤으로 시작해, 끝난 뒤 한 달 남짓 혼자 더 개발했습니다. 동시 편집 충돌 방지와 실시간 협업, 커뮤니티 게시판을 맡았습니다."
period: "2026.05 – 06.26 캡스톤 → 08.06까지 혼자 추가 개발(31커밋)"
team: "2명 → 1명"
role: "동시 편집 충돌 방지 · 실시간 협업 · 커뮤니티 게시판"
stack: ["Java 21", "Spring Boot 3.5", "MyBatis", "MySQL 8", "Vue 3", "WebSocket(STOMP)"]
repo: "https://github.com/DreamingGenie/TripCraft"
highlight: "낙관적 락이 못 잡는 일정 겹침을 여행 단위 락으로 막았습니다"
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
      - { name: "저장 뒤 작업 순서(afterCommit)", owner: "me" }
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
  - title: "저장 뒤로 미룬 작업 세 곳과 각각의 이유(afterCommit)"
    text: "변경 알림은 저장된 순서대로 보내려고 저장 뒤로 미뤘습니다. 외부 API를 부르는 이동시간 계산은 일정 락 구간에서 빼려고 옮겼고, 게시글 이미지 파일 삭제는 저장이 취소됐을 때 파일만 먼저 지워지는 일을 막으려고 옮겼습니다. 다만 이동시간 계산은 같은 요청 스레드에서 돌아서, 응답은 계산을 기다리고 그동안 DB 연결도 씁니다. 비동기로 분리하지는 않았습니다."
    tags: [{ type: "judged", text: "판단" }, { type: "limit", text: "비동기 아님" }]
    evidence: ["fad7388", "6856a5b"]
  - title: "커서 메시지마다 하던 권한 조회 쿼리를 없앰"
    text: "협업 커서 위치는 실시간 메시지로 계속 오가는데, 메시지마다 DB에서 편집 권한을 확인하고 있었습니다. 권한 확인 결과를 접속마다 기억하고, 협업자나 공유 설정이 바뀔 때만 여행별 권한 버전 번호를 올려 다음 메시지에서 다시 확인하게 했습니다. 이미 맺은 구독은 연결이 끊길 때까지 그대로 받습니다."
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
      - { label: "선택", text: "일정을 넣거나 옮기기 전에 그 여행 자체에 락을 겁니다(SELECT … FOR UPDATE). 두 번째 사람은 첫 저장이 끝날 때까지 기다렸다가 겹침 검사를 하므로, 방금 들어간 일정을 보고 거절됩니다. 순서 번호도 락 안에서 서버가 매기므로 두 일정이 같은 순서 번호를 받지 않습니다." }
      - { label: "락 구간", text: "느린 외부 API 호출을 이미 저장 뒤로 빼 두어서, 락은 DB에 쓰는 동안만 걸립니다. 순서가 반대였다면 API 응답을 기다리는 내내 여행 전체에 락이 걸려 있었을 겁니다." }
      - { label: "한계", text: "한 여행에 편집자가 몰리면 저장이 줄을 섭니다. 몇 명부터 느려지는지는 측정하지 않았습니다. 겹침이 실제로 생기는 것과 락 뒤 막히는 것은 서버를 띄워 직접 확인했지만, 다시 돌려 볼 자동화된 동시성 테스트는 없습니다.", limit: true }
    more: "처음 설계 문서에는 \"락까지 거는 건 과하다\"고 적었습니다. 겹침은 한 건씩 보는 방식으로 막을 수 없다는 걸 알고 코드에는 락을 넣었는데, 문서는 그대로였습니다. 09-10에 이 어긋남을 찾아 문서를 코드 기준으로 고쳤습니다."
    evidence: ["913a4c1", "d2035b0", "TripMapper.xml:28"]
  - id: "order"
    kind: "문제 해결"
    title: "변경 알림이 저장보다 먼저 나가고 있었습니다"
    visual: "NotifyOrder"
    tags: [{ type: "judged", text: "판단" }, { type: "limit", text: "남은 버그 1건" }]
    steps:
      - { label: "문제", text: "누가 일정을 고치면 다른 사람 화면에 알림을 보내는데, DB 저장이 끝나기 전에 보내고 있었습니다. 받는 쪽은 저장되지 않은 상태를 먼저 받고, 연달아 고치면 도착 순서와 저장 순서가 어긋날 수 있었습니다." }
      - { label: "해결", text: "알림을 보내는 일과 알림에 순번을 매기는 일을 모두 저장이 끝난 뒤로 옮겼습니다. 그래서 저장 순서와 순번, 전송 순서가 일치하고, 화면은 이미 받은 순번 이하의 알림을 버립니다." }
      - { label: "남은 것", text: "이 수정 뒤로 이동시간 재계산 완료 알림이 나가지 않습니다. 저장 뒤 작업 안에서 다시 등록한 저장 뒤 작업을 Spring이 부르지 않기 때문입니다. 단위 테스트는 트랜잭션 밖이라 잡지 못했고, 아직 고치지 않았습니다.", limit: true }
    evidence: ["fad7388"]
---

- **분담**: master 353커밋 중 161건. `git blame -w -M HEAD`(2026-09-10) 기준 문서 70.1%, 백엔드 Java 28.1%. 화면(Vue·CSS)은 약 84%가 팀원 줄입니다. 배포는 `DEPLOY-LOG.md` 0단계까지.
- **낙관적 락**: `TripBlockMapper.xml:69` `UPDATE … version = version + 1 WHERE id = ? AND version = ?`가 0행이면 409(`9942b7f`).
- **쿼리 분리**: 이동시간 재계산 `updateTransitById`, 사용자 편집 `updateWithVersion`. 설계 문서 §4 · 코드 · `TripServiceImplTest:208`.
- **저장 뒤 작업**: 편집 알림(`BLOCK_*`) `fad7388`, 외부 API 재계산 `TripServiceImpl:451, 488, 490, 528`, 이미지 삭제 `6856a5b`(`PostImageCleanupListener` 29줄 전부 본인).
- **STOMP 권한 캐시**: `TripAccessVersion`(30줄 전부 본인), 번호 올림 호출 163 · 232 · 240행.
- **전부 제가 쓴 파일**: `WebSocketConfig` 40/40줄, `TripPresenceController` 205/206줄, `CommentServiceImpl` 117/117줄, `useCollabCursor.js` 197/197줄.
- **알림 순서**: `broadcast()`와 이벤트 순번 부여를 `afterCommit`으로(`fad7388`). 화면은 `event.seq <= lastEventSeq`면 버림. 재계산 완료 알림(`TRANSIT_RECALCULATED`)은 이 변경 뒤로 나가지 않습니다(다른 사람 화면은 이어지는 편집 알림의 재조회로 대부분 맞춰집니다).
- **여행 단위 락**: `TripMapper.xml:28` `SELECT id FROM trip WHERE id = ? FOR UPDATE`, `TripServiceImpl.placeBlock` · `updateBlock`에서 락을 건 뒤 `assertNoOverlap` 호출, 순서 번호는 `nextDisplayOrder`로 락 안에서 서버가 할당(`913a4c1`). 테스트 14개 중 13개가 Mockito, Testcontainers는 `contextLoads` 1건이며 제 환경에서 Docker API 400으로 실행되지 않았습니다. 문서 정정 `d2035b0`(2026-09-10).
