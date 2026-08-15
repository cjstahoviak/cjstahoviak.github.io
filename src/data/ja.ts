// ─────────────────────────────────────────────────────────────────────────────
// Every Japanese string on the site lives in this file.
//
// /ja is a single standalone page rather than a full translation of the site,
// so there is no i18n framework here — just typed content that ja.astro reads.
// Editing any Japanese wording means editing this file and nothing else, which
// also makes it the one file to hand a native speaker for review.
//
// Deliberate conventions:
//   · Publication titles stay in English — papers are cited in English.
//   · Library and tool names stay in Latin script (PyTorch, ROS, CUDA).
//     Descriptive skill phrases are translated (Motion Planning → モーションプランニング).
//   · Institution names use their established Japanese renderings
//     (University of New Mexico → ニューメキシコ大学), not transliterations.
//   · Dates are reformatted to Japanese convention (2024年6月 — 現在), not
//     translated word for word.
//   · Work and education entries are names, places, and dates only — no prose
//     summaries, to keep machine translation off the load-bearing content.
// ─────────────────────────────────────────────────────────────────────────────

export interface JaCareerEntry {
  title: string;
  subtitle: string;
  date: string;
  location: string;
  /** Kept to short fixed phrases only — never translated prose. */
  items?: string[];
}

export interface JaProject {
  title: string;
  year: number;
  description: string;
  skillTags: string[];
  link?: string;
  demo?: string;
}

export interface JaPublication {
  /** English title, matching src/data/publications.ts. */
  title: string;
  leadAuthor: string;
  venue: string;
  year: number;
  status: 'accepted' | 'published';
  description: string;
  link?: string;
}

export interface JaAward {
  year: string;
  title: string;
  org: string;
}

// ── Page metadata ────────────────────────────────────────────────────────────

export const meta = {
  title: 'カルビン・スタホビアック — ロボティクス研究者・コンピュータサイエンティスト',
  description:
    'ロボティクスとコンピュータサイエンスを専門とするカルビン・スタホビアックの経歴、研究、プロジェクト紹介。',
  name: 'カルビン・スタホビアック',
  role: 'ロボティクス研究者・コンピュータサイエンティスト',
};

// ── UI labels ────────────────────────────────────────────────────────────────

export const ui = {
  /** Label for the link that leaves /ja and returns to the English home page. */
  toEnglish: 'English',
  /** Label for the link on the English pages that opens /ja. */
  toJapanese: '日本語',
  viewPage: '詳細を見る',
  viewDemo: 'デモを見る',
  typeProject: 'プロジェクト',
  typePublication: '論文',
  statusAccepted: '採録決定',
  statusPublished: '掲載済',
  etAl: 'ほか',
  contact: '連絡先',
  scroll: 'スクロール',
};

export const sections = {
  intro: '自己紹介',
  skills: 'スキル',
  career: '経歴',
  work: '職歴',
  education: '学歴',
  projects: 'プロジェクト',
  publications: '論文',
  awards: '受賞・活動',
};

/** In-page anchor navigation. Every target is on this page — nothing leaves. */
export const anchors = [
  { id: 'intro', label: sections.intro },
  { id: 'skills', label: sections.skills },
  { id: 'career', label: sections.career },
  { id: 'projects', label: sections.projects },
  { id: 'publications', label: sections.publications },
];

// ── Introduction ─────────────────────────────────────────────────────────────

// ⚠️  PLACEHOLDER — Calvin is writing this section himself.
// Replace the strings below with his own text; each array entry is one
// paragraph. Nothing else needs to change. The current text is deliberately
// plain and factual so the page reads correctly if it ships before the
// rewrite, but it is not his voice.
export const intro = [
  'ニューメキシコ州アルバカーキを拠点に、ロボティクスとコンピュータサイエンスの研究をしています。ニューメキシコ大学でコンピュータサイエンスの修士号を取得し、修士論文は優等の評価を受けました。',
  '研究分野は自律ロボット、機械学習、コンピュータビジョンです。サンディア国立研究所とニューメキシコ大学での研究経験があり、成果は国際会議で発表しています。',
  '2022年には秋田県の国際教養大学に留学しました。現在も日本語の学習を続けています（JLPT N3程度）。',
];

export const photos = {
  calvinAlt: 'カルビン・スタホビアック',
  scratchAlt: '愛猫のスクラッチ',
  scratchCaption: '愛猫のスクラッチ（3歳）',
};

/** Right-hand quick facts card, mirroring the English about page. */
export const quickInfo = [
  { label: '所在地', value: 'ニューメキシコ州アルバカーキ' },
  { label: '学位', value: 'コンピュータサイエンス修士' },
  { label: '大学', value: 'ニューメキシコ大学' },
  { label: '専門分野', value: 'ロボティクス・機械学習・コンピュータビジョン' },
  { label: '保有資格', value: '米国エネルギー省 L クリアランス' },
];

// ── Skills ───────────────────────────────────────────────────────────────────
// Tool and library names stay in Latin script; descriptive phrases are translated.

export const skills: { title: string; skills: string[] }[] = [
  {
    title: 'プログラミング言語',
    skills: ['C++', 'CUDA', 'C', 'Python', 'Bash', 'MATLAB', 'Java', 'Haskell', 'HTML/CSS', 'XML'],
  },
  {
    title: 'ロボティクス',
    skills: [
      'ROS',
      'Isaac Sim/Lab',
      'Gazebo',
      'SLAM',
      'アドミッタンス/インピーダンス制御',
      '占有格子地図',
      'モーションプランニング',
    ],
  },
  {
    title: '機械学習',
    skills: ['PyTorch', 'TensorFlow', 'YOLO', 'scikit-learn', 'MLFlow', 'Optuna', '強化学習'],
  },
  {
    title: 'コンピュータビジョン',
    skills: ['OpenCV', '点群処理', 'OpenGL'],
  },
  {
    title: 'ハードウェア',
    skills: [
      'RGBD センサ',
      'AprilTag',
      '移動ロボットプラットフォーム',
      'ロボットマニピュレータ',
      '低レベルセンサ I/O',
    ],
  },
  {
    title: '開発ツール',
    skills: ['Git', 'Conda', 'Linux', 'VS Code', 'Simulink', 'SLURM', 'Firebase', 'Flutter'],
  },
];

// ── Career: work and education ───────────────────────────────────────────────
// Names, places, and dates only. The two `items` entries below are short fixed
// phrases (a thesis honor and a study-abroad placement), not translated prose.

export const work: JaCareerEntry[] = [
  {
    title: '研究開発インターン（大学院）',
    subtitle: 'サンディア国立研究所',
    date: '2024年6月 — 現在',
    location: 'ニューメキシコ州アルバカーキ',
  },
  {
    title: '大学院研究助手',
    subtitle: 'ニューメキシコ大学（メラニー・モーゼス教授研究室）',
    date: '2023年8月 — 2025年12月',
    location: 'ニューメキシコ州アルバカーキ',
  },
  {
    title: '研究開発インターン（学部）',
    subtitle: 'サンディア国立研究所',
    date: '2019年4月 — 2022年8月',
    location: 'ニューメキシコ州アルバカーキ',
  },
];

export const education: JaCareerEntry[] = [
  {
    title: 'コンピュータサイエンス 修士（M.S.）',
    subtitle: 'ニューメキシコ大学（GPA 3.83）',
    date: '2023年8月 — 2025年12月',
    location: 'ニューメキシコ州アルバカーキ',
    items: ['修士論文は優等（distinction）の評価を受けました'],
  },
  {
    title: 'コンピュータサイエンス 学士（B.S.）',
    subtitle: 'ニューメキシコ大学',
    date: '2018年8月 — 2022年5月',
    location: 'ニューメキシコ州アルバカーキ',
    items: ['国際教養大学（秋田県）に留学 — 2022年秋'],
  },
];

// ── Projects ─────────────────────────────────────────────────────────────────
// Newest first, matching the ordering used throughout the English site.
// "Lost in Translation" keeps its English name in 「」 brackets — it is a
// released product with a live URL, not a descriptive phrase.

export const projects: JaProject[] = [
  {
    title: '強化学習によるクアッドロータ制御',
    year: 2026,
    description:
      '深層強化学習を用い、単一の方策で多様な飛行挙動を実現するクアッドロータのエンドツーエンド制御。NVIDIA Isaac のシミュレーション環境で学習し、実機への転移に取り組んでいます。',
    skillTags: ['強化学習', 'PyTorch', 'Isaac Sim', 'CUDA'],
  },
  {
    title: '議会法案要約ツール',
    year: 2025,
    description:
      '政府の法案を集約し要約する AI ウェブアプリケーション。2025年の Lobo Hackathon で4位入賞。',
    skillTags: ['自然言語処理', 'LLM', 'ウェブ開発'],
  },
  {
    title: '「Lost in Translation」',
    year: 2020,
    description:
      'ランダムに選ばれた複数の言語を次々に経由して翻訳することで、伝言ゲームのように文章が変化していく様子を楽しめるウェブアプリ。',
    skillTags: ['JavaScript', 'ウェブ開発', 'REST API'],
    link: 'https://calvinstahoviak.com/lost-in-translation',
  },
];

// ── Publications ─────────────────────────────────────────────────────────────
// Titles stay in English. The descriptions are drafts written from each paper's
// title and topic — Calvin should review them for accuracy about his own work.

export const publications: JaPublication[] = [
  {
    title:
      'Dynamic Admittance Parametrisation of Non-Prehensile Multi-Robot Transport with Optimal Coordinated Planning',
    leadAuthor: 'Stahoviak, C.',
    venue: 'MECC',
    year: 2026,
    status: 'accepted',
    description:
      '複数の移動ロボットが物体を把持せずに協調搬送するための、ハイブリッドなアドミッタンス・インピーダンス制御と最適協調計画。',
  },
  {
    title: 'Reliability of Mobile Camera-Based Hand Sign Recognition in Outdoor Environments',
    leadAuthor: 'Stocco, P.',
    venue: 'MECC',
    year: 2026,
    status: 'accepted',
    description:
      '屋外環境において、移動ロボット搭載カメラによる手信号認識の信頼性を、照明条件や距離を変えて評価。',
  },
  {
    title: 'Perceived Constraint Identification Using Physics-Informed Deep Neural Networks',
    leadAuthor: 'Kim, R.',
    venue: 'ASME LDSC',
    year: 2025,
    status: 'published',
    description:
      'ロボットが操作する物体の機械的な拘束条件を高速に推定する、物理情報を組み込んだ深層ニューラルネットワーク。',
    link: 'https://asmedigitalcollection.asme.org/lettersdynsys/article-abstract/6/1/011008/1221793/Perceived-Constraint-Identification-Using-Physics?redirectedFrom=fulltext',
  },
  {
    title:
      'Rapid Constrained Object Motion Estimation based on Centroid Localization of Semantically Labeled Objects',
    leadAuthor: 'Young, C.',
    venue: 'AIM',
    year: 2024,
    status: 'published',
    description:
      '意味的にラベル付けされた点群の重心位置推定に基づく、拘束された物体の高速な運動推定。',
    link: 'https://ieeexplore.ieee.org/document/10637056',
  },
];

// ── Awards and volunteering ──────────────────────────────────────────────────
// Name-level entries only, same rationale as the career section.

export const awards: JaAward[] = [
  {
    year: '2025',
    title: '修士論文 優等（distinction）',
    org: 'ニューメキシコ大学 コンピュータサイエンス学部',
  },
  { year: '2025', title: 'Lobo Hackathon 4位入賞', org: 'ニューメキシコ大学' },
  {
    year: '2025, 2026',
    title: 'サイエンスフェア審査委員長',
    org: 'Central NM STEM Research Challenge',
  },
  {
    year: '2025',
    title: 'コンピュータサイエンス学部 アンバサダー',
    org: 'ニューメキシコ大学 工学部オープンハウス',
  },
];

// ── English-only content notice ──────────────────────────────────────────────
// The blog and both PDFs exist in English only. Saying so is better than
// letting a Japanese reader click through and be surprised.

export const englishOnly = {
  heading: '英語のみのコンテンツ',
  body: '以下のコンテンツは英語のみでご覧いただけます。',
  links: [
    { label: 'ブログ', href: '/blog' },
    { label: '履歴書（PDF）', href: '/Calvin_Stahoviak_Resume.pdf' },
    { label: 'CV（PDF）', href: '/Calvin_Stahoviak_CV.pdf' },
  ],
};
