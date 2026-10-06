import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// 프로젝트 하나 = md 파일 하나. 구조화된 부분(사례·담당 영역)은 frontmatter, 근거 모음은 본문 Markdown.
const step = z.object({
  label: z.string(),
  text: z.string(),
  limit: z.boolean().optional(), // 한계·약점 줄은 따로 표시한다
});

const caseItem = z.object({
  id: z.string(), // 페이지 안 앵커 (#lock)
  kind: z.string(), // 문제 해결 · 설계 판단 · 운영 ...
  title: z.string(),
  tags: z.array(z.object({ type: z.enum(["measured", "judged", "limit"]), text: z.string() })).default([]),
  visual: z.string().optional(), // 사례 위에 붙는 도식 컴포넌트 이름
  steps: z.array(step),
  more: z.string().optional(), // 접어 두는 긴 설명 (Markdown 아님, 문단은 \n\n)
  evidence: z.array(z.string()).default([]), // 커밋 해시·파일 위치
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    summary: z.string(), // 카드 한 줄
    oneLine: z.string(), // 상세 페이지 첫 문장
    period: z.string(),
    team: z.string(),
    role: z.string(),
    stack: z.array(z.string()),
    repo: z.string().optional(),
    highlight: z.string(), // 카드에 들어가는 대표 한 줄
    cover: z.string().optional(), // public/ 기준 경로. 파일이 없으면 개발 서버에서만 자리를 보여 준다
    gallery: z.array(z.object({ src: z.string(), caption: z.string() })).default([]),
    shotNote: z.string().optional(), // 화면 출처(로컬 실행·운영 서버·시연 데이터 여부)
    flow: z.string().optional(), // 담당 영역 아래에 붙는 데이터 흐름도 컴포넌트 이름
    areas: z.array(
      z.object({
        group: z.string(),
        items: z.array(z.object({ name: z.string(), owner: z.enum(["me", "team", "shared"]), note: z.string().optional() })),
      }),
    ),
    did: z.array(
      z.object({
        id: z.string().optional(), // 홈에서 바로 이어지는 앵커
        title: z.string(),
        text: z.string(),
        tags: z.array(z.object({ type: z.enum(["measured", "judged", "limit"]), text: z.string() })).default([]),
        evidence: z.array(z.string()).default([]),
      }),
    ),
    cases: z.array(caseItem),
  }),
});

export const collections = { projects };
