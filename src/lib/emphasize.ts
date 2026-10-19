// 소개 문단의 **…** 를 굵게 바꾼다. 원문은 config.ts 에서만 오지만, HTML 특수문자는 먼저 이스케이프한다.
// About.astro(홈)와 PrintDocument.astro(PDF)가 같은 문단을 같은 모양으로 그리려고 한곳에 둔다.
export const emphasize = (t: string) =>
  t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
