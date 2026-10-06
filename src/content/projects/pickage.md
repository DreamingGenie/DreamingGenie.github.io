---
title: "Pickage"
order: 3
summary: "npm 패키지를 고를 때 후보 최대 3개를 생태계 변화·기능·커뮤니티 세 관점으로 나란히 비교해 주는 서비스"
oneLine: "npm 패키지를 고르거나 바꿀 때 후보 최대 3개를 생태계 변화·기능·GitHub 커뮤니티 세 관점으로 나란히 보여 주는 서비스입니다. 어느 쪽이 낫다고 판정하지 않고 근거를 보여 주며, 결과는 PDF와 AI 에이전트용 Markdown으로 내보냅니다. 6명 팀에서 저는 원본 데이터 수집과 생태계 변화 탭의 지표 계산(유지·유입·이탈, 이탈 사유, 교체 흐름)을 맡았습니다."
period: "2026.08 – 진행 중"
team: "6명 · 교육기관 GitLab(비공개)"
role: "원본 데이터 수집 · 생태계 지표 계산"
stack: ["Python", "BigQuery", "GCS", "DuckDB", "MinIO", "Spring Boot", "React", "Docker"]
highlight: "BigQuery 236번 실행에서 예상 사용량과 청구 사용량 차이 0.1%"
cover: "/images/projects/pickage/cover.jpg"
gallery:
  - { src: "/images/projects/pickage/01.jpg", caption: "express와 비슷한 패키지 후보 고르기" }
  - { src: "/images/projects/pickage/02.jpg", caption: "비교 보고서 — 다운로드·이슈·추세" }
  - { src: "/images/projects/pickage/03.jpg", caption: "보고서의 이탈 사유와 교체 흐름" }
  - { src: "/images/projects/pickage/04.jpg", caption: "유지·유입·이탈 — 계산과 적재는 제가, 화면은 팀원이 맡았습니다" }
  - { src: "/images/projects/pickage/05.jpg", caption: "설치 전 확인 표 — 모듈 형식·타입 값은 제가 다시 모은 npm 정보에서 나옵니다" }
  - { src: "/images/projects/pickage/06.jpg", caption: "README를 AI가 읽고 정리하는 기능 비교 (팀원 작업)" }
shotNote: "팀 운영 서버(j15a506.p.ssafy.io)에서 찍은 화면입니다(2026-10-02)."
areas:
  - group: "원본 수집"
    items:
      - { name: "BigQuery 수집기", owner: "me" }
      - { name: "GCS → MinIO 업로드 경로", owner: "me", note: "SSH 터널" }
      - { name: "npm 다운로드 수 수집기", owner: "me", note: "46.9만 개로 넓혀 운영에 적재" }
      - { name: "npm 패키지 형태 정보 재수집", owner: "me", note: "모듈 형식·타입 등 6개 항목" }
  - group: "분석 지표"
    items:
      - { name: "DuckDB 교체 쌍 집계", owner: "me" }
      - { name: "유지 · 유입 · 이탈 계산", owner: "me", note: "새로 생긴 패키지와 갈아탄 패키지를 가름" }
      - { name: "이탈 사유 계산 · 패널", owner: "me" }
      - { name: "교체 흐름 API · 패널", owner: "me", note: "어디로 옮겨 갔나 · 근거 등급" }
  - group: "그 뒤 단계"
    items:
      - { name: "데이터 정제", owner: "team" }
      - { name: "DB 설계와 적재", owner: "team" }
      - { name: "모델 학습 · 서비스 제공", owner: "team" }
      - { name: "개발 브랜치 통합", owner: "team" }
  - group: "서비스 화면"
    items:
      - { name: "분석 · 보고서 화면 골격", owner: "team" }
      - { name: "유지 · 유입 · 이탈 화면", owner: "team" }
      - { name: "기능 비교 (README AI 요약)", owner: "team" }
      - { name: "GitHub 커뮤니티 · PDF · HAND-OFF", owner: "team" }
did:
  - title: "서버 없이 PC 한 대로 4,700만 건 집계"
    text: "분석용 DB인 DuckDB는 서버를 따로 띄우지 않고 PC에서 바로 돌릴 수 있습니다. npm 패키지 릴리스 약 4,700만 건을 버전 순서대로 늘어놓고 앞 버전과 비교해, 어떤 의존 패키지가 빠지고 무엇이 들어왔는지를 계산했습니다. 여기서 기준을 통과한 A를 빼고 B를 넣은 쌍 1,195개를 뽑았습니다."
    tags: [{ type: "measured", text: "실측" }]
  - title: "다운로드 수 수집기가 npm 서버에 너무 자주 묻지 않게"
    text: "요청 사이에 최소 간격을 두고, 서버가 너무 많다(429)고 답하면 간격을 15% 늘리고, 성공하면 조금씩 줄입니다. 429가 5번 연속 오면 5분 쉽니다. 월별로 나누고 압축(zstd)하면 용량을 6.5배 줄일 수 있다는 것도 재 봤지만, 아직 적용하지는 않았습니다."
    tags: [{ type: "measured", text: "실측" }, { type: "limit", text: "압축은 미적용" }]
  - title: "제가 쓴 테스트 287개"
    text: "팀 전체 테스트 1,783개 중 16%입니다(09-20 기준). 직접 쓴 커밋은 170건, 파일 299개입니다."
    tags: [{ type: "measured", text: "실측" }]
cases:
  - id: "guard"
    kind: "설계 · 가드레일"
    title: "개인 결제 계정으로 80TB 가까운 데이터셋을 읽는 수집기"
    visual: "GuardChain"
    tags: [{ type: "measured", text: "실측" }]
    steps:
      - { label: "위험", text: "BigQuery는 쿼리가 읽은 데이터 양만큼 요금을 받습니다. 결제는 제 개인 계정이었고, 쿼리 하나를 잘못 보내 넓게 읽으면 큰 요금이 그대로 청구되는 구조였습니다." }
      - { label: "선택", text: "실제로 돌리지 않고 읽을 양만 미리 계산하는 기능(dry-run)을 축으로, 돈이 나가기 전에 여섯 단계에서 멈추게 했습니다. 하나라도 걸리면 전체를 멈춥니다." }
      - { label: "결과", text: "236번 실행한 기록을 다시 모아 보니 미리 계산한 사용량은 104.41 GiB, 실제로 청구된 사용량은 104.53 GiB로 차이가 0.1%였습니다. 이렇게 약 11억 행, 31 GiB를 파일로 받았습니다." }
      - { label: "약점", text: "여섯 단계가 제대로 도는지는 실행 기록 236건으로 먼저 확인했고, 테스트는 그 뒤에 붙였습니다.", limit: true }
    evidence: ["collect.py 338줄", "실행 원장 236잡"]
  - id: "export"
    kind: "설계 판단"
    title: "정석인 한 번에 내보내기 명령을, 돌려 보고 버렸습니다"
    visual: "ExportChart"
    tags: [{ type: "measured", text: "실측" }, { type: "judged", text: "판단" }]
    steps:
      - { label: "보통 쓰는 방법", text: "BigQuery에서 파일로 내보낼 때는 EXPORT DATA 명령 하나로 조회와 내보내기를 함께 하는 것이 정석입니다." }
      - { label: "버린 이유", text: "이 명령은 미리 계산하는 사용량에 필요한 부분만 골라 읽는 최적화를 반영하지 않았습니다. 실제로 읽는 양은 0.4 GiB인데 미리 계산한 값은 43 GiB였습니다. 실행 상한은 미리 계산한 값으로 검사해서, 실제 양에 맞춰 상한을 걸면 거부되고, 43 GiB로 풀면 상한이 없는 것과 같습니다." }
      - { label: "선택", text: "일반 조회로 결과를 임시 테이블에 담고, 그 테이블을 파일로 내보낸 뒤 지웁니다. 미리 계산한 값, 상한, 실제 요금이 모두 같은 기준으로 맞춰집니다." }
      - { label: "비용", text: "단계가 늘어 파이프라인이 길어졌습니다.", limit: true }
  - id: "votes"
    kind: "실험"
    title: "많이 관찰된 교체일수록 믿을 만하다는 가정이 틀렸습니다"
    visual: "VotesChart"
    tags: [{ type: "measured", text: "실측" }, { type: "limit", text: "실제보다 낮게 나온 값" }]
    steps:
      - { label: "확인한 것", text: "뽑은 쌍을 얼마나 엄격하게 거를지 정하려고 조건 8가지를 정답 목록과 비교했습니다. 같은 교체가 관찰된 횟수(votes)만 높이는 조건이 가장 나빴습니다." }
      - { label: "원인", text: "한 조직이 여러 패키지를 한꺼번에 바꾸면(모노레포 일괄 변경) 그 교체 하나가 횟수를 부풀립니다. 그래서 같은 교체를 서로 다른 배포자·서로 다른 달에서 몇 번 봤는지(publisher_months)를 함께 걸었습니다." }
      - { label: "주의", text: "정답 목록에 패키지마다 대체재가 하나씩만 있어서, 대체재가 여럿인 경우처럼 맞는 답도 틀렸다고 계산됩니다.", limit: true }
    evidence: ["migration_pairs_260908/README.md §6"]
  - id: "tunnel"
    kind: "가드레일"
    title: "깜빡했을 때 조용히 틀리지 않고 그 자리에서 실패하게"
    tags: [{ type: "judged", text: "판단" }, { type: "measured", text: "실패 확인" }]
    steps:
      - { label: "위험", text: "서버의 파일 저장소로 올릴 때 SSH 터널을 엽니다. 터널 포트가 내 PC 저장소 포트(9000)와 같으면, 터널을 깜빡하고 실행했을 때 서버로 가야 할 데이터가 아무 에러 없이 내 PC에 들어갑니다." }
      - { label: "선택", text: "포트를 일부러 다르게 둬 연결이 거부되게 했고, 실제로 터널 없이 실행해 연결 에러로 멈추는 것까지 확인했습니다. 이 경로로 100만 행을 서버에 옮겼습니다." }
      - { label: "같은 생각", text: "비밀번호가 든 설정 파일은 이름을 하나씩 더하던 방식에서 .env로 시작하는 파일을 전부 막고 예시만 허용하는 방식으로 바꿨습니다. 수집이 끊겨 빈 결과가 남았을 때 통과하지 않도록 거부하는 테스트도 넣었습니다." }
    more: "같은 스크립트를 다시 돌렸는데 숫자가 달랐던 일도 있습니다. 09-09에 집계를 다시 돌리자 의존 패키지를 뺀 사례가 14건 달랐습니다. 발행 시각이 완전히 같은 릴리스는 바로 앞 릴리스와 비교하는 함수(lag())에서 앞뒤가 정해지지 않아, 실행할 때마다 순서가 바뀔 수 있었습니다. 문서에 적어 둔 숫자를 먼저 별도 커밋으로 고쳤고(9714d9c), 09-18에 발행 시각이 같으면 버전으로 순서를 정하게 했습니다(eb79253)."
    evidence: ["6de7104"]
---

- **작업량 기준**: 비머지 커밋 170건, 고유 파일 299개, +32,621 / −1,938줄(기준 `7e00dc7`, 2026-09-20, 생성물 제외).
- **BigQuery 수집기**: `pipeline/collectors/bigquery/collect.py` 338줄. 테이블별 상한 30 / 8 / 22 / 14 / 1 GiB, `DEVIATION_LIMIT=0.25`, 실행 상한 `max_billed = dry_bytes × 1.25 + 512MiB`, 마지막 대조는 `INFORMATION_SCHEMA.PARTITIONS`. 실행 원장 236잡: dry-run 104.4096 GiB / 청구 104.5254 GiB, 편차 +0.1109%. GCS Parquet 31.1465 GiB · 3,235파일 · 1,098,458,077행.
- **여섯 단계**: ① 이미 받은 데이터 건너뜀 ② 테이블별 최대 사용량 ③ 기대치에서 25% 넘게 벗어나면 정지 ④ 한 번 실행 합계 예산 ⑤ 실제 실행에도 BigQuery 상한 ⑥ 받은 행 수를 원본 테이블과 대조.
- **MinIO 적재**: `6de7104`. 터널 없이 실행 시 `EndpointConnectionError`. gzip JSONL 1,000개 + 관리 파일 3개 = 1,003객체, 100만 행.
- **DuckDB 집계**: 릴리스 47,178,483 · 전이 39,579,244 · strict 쌍 1,195. 09-18 정렬 보강(`eb79253`) 뒤 다시 낸 `stats.json` 현재값은 2,545초입니다.
- **정밀도 표**: `datasets/migration_pairs_260908/README.md` §6, 8행. `votes ≥ 12`만 → 21.6%, `votes ≥ 5` + `publisher_months ≥ 3` → 50.9%.
- **npm 호출 간격**: 고정 최소 간격(`wait = last_start + interval - now`), 429 시 ×1.15, 성공 시 ×0.998, 429 연속 5회면 300초 정지.
- **재실행 차이**: 문서 숫자 정정 `9714d9c`(09-09), 동순위 정렬 보강 `eb79253`(09-18).
- **테스트**: 제가 쓴 테스트 287개 / 팀 전체 1,783개(16.1%, 기준 `7e00dc7`).
- **패키지 형태 정보 재수집**: `ccc45ad`. npm registry에 6개 항목(모듈 형식·타입 선언 등)을 더해 상위 10만 개를 4개 프로세스로 다시 받음 — 4시간 52분, 21,567,150행. 이 값을 표로 바꾸는 마이그레이션과 기능 비교 화면은 팀원 작업입니다.
- **유지·유입·이탈**: 유입을 새로 생긴 패키지와 갈아탄 패키지로 가름(`f460b15`). 화면은 팀원 작업입니다.
- **이탈 사유 패널**: `9e86442` 외. 패널 코드 162줄 중 147줄(기준 `378db11`).
- **교체 흐름 패널**: `04a01ab`·`1465f55` 외. API·화면 코드 줄 단위 전부(기준 `378db11`). 근거 등급 '보통'의 문턱은 위 정밀도 표에서 낸 권고 하한(`aafd27b`)입니다.
