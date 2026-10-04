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
const H1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)], pageBreakBefore: true });
const H2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const H3 = t => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(t)] });
const B = (t, lvl = 0) => new Paragraph({ numbering: { reference: "b", level: lvl }, children: runs(t), spacing: { after: 60, line: 290 } });
let listNo = 0;
const NUMREFS = Array.from({ length: 60 }, (_, i) => "n" + i);
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

module.exports = { P, H1, H2, H3, B, N, NL, NOTE, SP, TBL, T, LINK, LINKP, cover, toc, build };
