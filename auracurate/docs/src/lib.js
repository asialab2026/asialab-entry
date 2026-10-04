// Shared Word layout for the Aurora plan series (same look as the Community plan)
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  HeadingLevel, AlignmentType, LevelFormat, BorderStyle, Footer, PageNumber,
  TableOfContents, ExternalHyperlink, VerticalAlign
} = require("docx");

const FONT = { ascii: "Malgun Gothic", eastAsia: "Malgun Gothic", hAnsi: "Malgun Gothic", cs: "Malgun Gothic" };
const INK = "0B0E15", MUTED = "4A4D5C", MAGENTA = "CD089C", LINE = "D9D6E6", HEAD = "F1EFF7";
const W = 9638;
const LINK = "https://claude.ai/artifact/9S325ZyZ1nBDtVJqVAzieu";

const runs = (t, o = {}) => String(t).split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(s =>
  s.startsWith("**") ? new TextRun({ text: s.slice(2, -2), bold: true, ...o }) : new TextRun({ text: s, ...o }));
const P = (t, o = {}) => new Paragraph({ children: runs(t, o.run), spacing: { after: 120, line: 300 } });
let PREFIX = "";
const setPrefix = p => { PREFIX = p; };
const H1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(PREFIX ? PREFIX + " · " + t : t)], pageBreakBefore: true });
const PART = (t, sub) => [
  new Paragraph({ children: [], pageBreakBefore: true, spacing: { before: 2600 } }),
  new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t, size: 48 })], border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: MAGENTA, space: 8 } } }),
  new Paragraph({ children: [new TextRun({ text: sub, size: 24, color: MUTED })], spacing: { before: 200 } })
];
const INTEGRATED = !!process.env.AURORA_INTEGRATED;
const H2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const H3 = t => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(t)] });
const B = (t, lvl = 0) => new Paragraph({ numbering: { reference: "b", level: lvl }, children: runs(t), spacing: { after: 60, line: 290 } });
let listNo = 0;
const NUMREFS = Array.from({ length: 400 }, (_, i) => "n" + i);
// numbered list: call newList() to start a fresh 1,2,3 sequence
let cur = "n0";
const newList = () => { cur = NUMREFS[++listNo]; return cur; };
const N = t => new Paragraph({ numbering: { reference: cur, level: 0 }, children: runs(t), spacing: { after: 60, line: 290 } });
const NL = items => { newList(); return items.map(N); };
const NOTE = t => new Paragraph({
  children: runs(t, { size: 19, color: MUTED }), spacing: { before: 60, after: 160, line: 280 },
  border: { left: { style: BorderStyle.SINGLE, size: 12, color: MAGENTA, space: 8 } }, indent: { left: 160 }
});
const SP = () => new Paragraph({ children: [], spacing: { after: 60 } });
const LINKP = (url) => new Paragraph({ children: [new ExternalHyperlink({ link: url, children: [new TextRun({ text: url, style: "Hyperlink" })] })], spacing: { after: 160 } });

const border = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const borders = { top: border, bottom: border, left: border, right: border };
function cell(text, w, head, first) {
  const paras = String(text).split("\n").map(line => new Paragraph({ children: runs(line, { size: 18, bold: head ? true : undefined }), spacing: { after: 40, line: 260 } }));
  return new TableCell({
    width: { size: w, type: WidthType.DXA }, borders, verticalAlign: VerticalAlign.TOP,
    shading: head ? { fill: HEAD, type: ShadingType.CLEAR, color: "auto" } : (first ? { fill: "FBFAFD", type: ShadingType.CLEAR, color: "auto" } : undefined),
    margins: { top: 70, bottom: 70, left: 110, right: 110 }, children: paras
  });
}
function T(headers, rows, ratios) {
  const total = ratios.reduce((a, b) => a + b, 0);
  const widths = ratios.map(r => Math.floor(W * r / total));
  widths[widths.length - 1] += W - widths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: widths,
    rows: [new TableRow({ tableHeader: true, children: headers.map((h, i) => cell(h, widths[i], true)) })]
      .concat(rows.map(r => new TableRow({ children: r.map((c, i) => cell(c, widths[i], false, i === 0)) })))
  });
}
const TBL = (...a) => [T(...a), SP()];

function cover({ kicker, title, sub, meta }) {
  return [
    new Paragraph({ children: [], spacing: { before: 2000 } }),
    new Paragraph({ children: [new TextRun({ text: kicker, bold: true, size: 22, color: MAGENTA, characterSpacing: 60 })], spacing: { after: 200 } }),
    new Paragraph({ children: [new TextRun({ text: title, bold: true, size: 56, color: INK })], spacing: { after: 160 } }),
    new Paragraph({ children: [new TextRun({ text: sub, size: 28, color: MUTED })], spacing: { after: 600 } }),
    new Paragraph({ children: [new TextRun({ text: "A World Connected by Experience", italics: true, size: 26, color: INK })], spacing: { after: 80 } }),
    new Paragraph({ children: [new TextRun({ text: "경험으로 연결되는 하나의 세계", size: 22, color: MUTED })], spacing: { after: 1200 } }),
    T(["항목", "내용"], meta, [1, 4])
  ];
}
const toc = () => [
  new Paragraph({ children: [new TextRun({ text: "목차", bold: true, size: 32 })], pageBreakBefore: true, spacing: { after: 200 } }),
  new TableOfContents("목차", { hyperlink: true, headingStyleRange: "1-2" }),
  NOTE("Word에서 목차가 비어 보이면 목차를 마우스 오른쪽 버튼으로 눌러 ‘필드 업데이트’를 선택하세요.")
];

function build(file, docTitle, footerLabel, children) {
  const doc = new Document({
    creator: "Aurora", title: docTitle,
    styles: {
      default: { document: { run: { font: FONT, size: 21, color: INK } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 34, bold: true, font: FONT, color: INK }, paragraph: { spacing: { before: 120, after: 240 }, outlineLevel: 0,
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: MAGENTA, space: 6 } } } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 26, bold: true, font: FONT, color: INK }, paragraph: { spacing: { before: 300, after: 140 }, outlineLevel: 1 } },
        { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 22, bold: true, font: FONT, color: MAGENTA }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } }
      ]
    },
    numbering: {
      config: [
        { reference: "b", levels: [
          { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 500, hanging: 280 } } } },
          { level: 1, format: LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 900, hanging: 280 } } } }] },
        ...NUMREFS.map(r => ({ reference: r, levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 500, hanging: 320 } } } }] }))
      ]
    },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [
        new TextRun({ text: footerLabel + " · ", size: 16, color: MUTED }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: MUTED })] })] }) },
      children
    }]
  });
  return Packer.toBuffer(doc).then(buf => { fs.writeFileSync(file, buf); console.log("written", file); });
}

// Four doors — the shared 5-second model (Home, world bar, cards). Same verb and colour everywhere.
const DOOR_ROWS = [
  ["studio", "1", "Studio", "Read the story", "이야기를 읽는 곳", "Deep Cosmos 남색"],
  ["curators", "2", "Curators", "Meet the people", "Aurora가 고른 사람을 만나는 곳", "Aurora Magenta 자홍"],
  ["community", "3", "Community", "Join in", "함께 이야기하고 배우는 곳", "Solar Ember 주황"],
  ["shop", "4", "Shop", "Take it home", "이야기 속 상품·프로그램을 사는 곳", "Velvet Eclipse 와인"]
];
const STEP = {
  studio: "1단계: 한국·아시아에서 커리어를 만드는 이야기를 읽는다 (Hustle 분야)",
  curators: "2단계: 그 일을 하는 전문가들이 누구이고 어떻게 일하는지 본다",
  community: "3단계: 무료 Aurora Lounge에서 같은 길을 가는 사람들과 질문한다",
  shop: "4단계: K-Career Entry Session을 예약하고 다음 단계를 받는다 (Shopify 결제)"
};
function DOORS(here, num) {
  const r = DOOR_ROWS.find(d => d[0] === here);
  return [
    H2((num ? num + " " : "") + "네 개의 문 안에서의 자리 (최신 목업 반영)"),
    P("처음 온 사람이 5초 안에 이해하도록 네 곳에 **동사 하나**씩을 붙였습니다. 이 곳의 동사는 **" + r[3] + "** 입니다. 같은 동사와 색이 Home 첫 화면, 메뉴 아래 길잡이 막대(World bar), 카드, 라벨에 똑같이 쓰입니다."),
    T(["#", "곳", "동사", "쉬운 설명", "색"], DOOR_ROWS.map(d => [d[1], d[0] === here ? "**" + d[2] + "** (이 문서)" : d[2], d[3], d[4], d[5]]), [0.3, 1.5, 1.3, 2.2, 1.2]), SP(),
    B("**길잡이 막대:** 이 영역의 모든 페이지 상단에 ‘1 Studio · 2 Curators · 3 Community · 4 Shop’이 보이고 현재 위치(" + r[2] + ")가 강조됩니다. 모바일은 이름만 표시합니다."),
    B("**Home ‘One story. Four doors.’ 섹션의 " + STEP[here] + "**"),
    B("Shopify: snippet world-bar.liquid · Home 섹션 brand(네 개의 문)·connect — 통합 웹 기획서 8장")
  ];
}
module.exports = { DOORS, P, H1, H2, H3, B, N, NL, newList, NOTE, SP, TBL, T, LINK, LINKP, cover, toc, build, setPrefix, PART, INTEGRATED };
