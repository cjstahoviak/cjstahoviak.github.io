// Single source of truth for publications.
// Rendered by the Featured Work carousel (index.astro) and the publications
// page (publications.astro, via PublicationEntry.astro). Edit here — both
// pages update. Citation numbers [n] are derived from array order.

export interface Publication {
  /** Full paper title, as shown on the publications page. */
  title: string;
  /** Optional shorter title for the fixed-size featured carousel card. */
  shortTitle?: string;
  /** Lead author in citation form, e.g. "Stahoviak, C." — rendered as "<lead> et al." */
  leadAuthor: string;
  /** Venue abbreviation, e.g. "MECC". */
  venue: string;
  year: number;
  status: "accepted" | "published";
  /** 2–5 skills demonstrated by the work. Rendered only on the featured carousel. */
  skillTags: string[];
  /** External "see more" link (paper page, DOI, etc.). */
  link?: string;
}

export const publications: Publication[] = [
  {
    title:
      "Dynamic Admittance Parametrisation of Non-Prehensile Multi-Robot Transport with Optimal Coordinated Planning",
    shortTitle:
      "Dynamic Admittance Parametrisation of Non-Prehensile Multi-Robot Transport",
    leadAuthor: "Stahoviak, C.",
    venue: "MECC",
    year: 2026,
    status: "accepted",
    skillTags: ["Control Theory", "Multi-Robot Systems", "Motion Planning", "Optimization"],
  },
  {
    title:
      "Reliability of Mobile Camera-Based Hand Sign Recognition in Outdoor Environments",
    leadAuthor: "Stocco, P.",
    venue: "MECC",
    year: 2026,
    status: "accepted",
    skillTags: ["Computer Vision", "Human-Robot Interaction", "Mobile Robotics"],
  },
  {
    title:
      "Perceived Constraint Identification Using Physics-Informed Deep Neural Networks",
    leadAuthor: "Kim, R.",
    venue: "ASME LDSC",
    year: 2025,
    status: "published",
    skillTags: ["Physics-Informed ML", "Deep Learning", "System Identification"],
    link: "https://asmedigitalcollection.asme.org/lettersdynsys/article-abstract/6/1/011008/1221793/Perceived-Constraint-Identification-Using-Physics?redirectedFrom=fulltext",
  },
  {
    title:
      "Rapid Constrained Object Motion Estimation based on Centroid Localization of Semantically Labeled Objects",
    shortTitle:
      "Rapid Constrained Object Motion Estimation via Centroid Localization",
    leadAuthor: "Young, C.",
    venue: "AIM",
    year: 2024,
    status: "published",
    skillTags: ["Computer Vision", "CUDA", "ROS", "State Estimation"],
    link: "https://ieeexplore.ieee.org/document/10637056",
  },
];

/** Citation-style one-liner for compact cards, e.g. "Stahoviak, C. et al. — MECC, 2026. (accepted)" */
export function citationSummary(pub: Publication): string {
  const suffix = pub.status === "accepted" ? " (accepted)" : "";
  return `${pub.leadAuthor} et al. — ${pub.venue}, ${pub.year}.${suffix}`;
}
