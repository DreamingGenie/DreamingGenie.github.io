// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://dreaminggenie.github.io",
  // 2026-10-06 CommonPJT(교육 과정 내부 이름)를 서비스 이름 CoMeetTool로 바꿨다. 이미 나간 옛 주소를 살려 둔다.
  redirects: {
    "/projects/commonpjt": "/projects/comeettool",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
