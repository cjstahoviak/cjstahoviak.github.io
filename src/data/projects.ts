// Single source of truth for projects.
// Rendered by the Featured Work carousel (index.astro) and the projects page (projects.astro).
// Edit here — both pages update.

export interface Project {
  title: string;
  /** Full description, shown on the projects page. */
  description: string;
  /** Year of the work, rendered in the top-right corner of the card. */
  year: number;
  /** 2–5 skills demonstrated by the project. Rendered only on the featured carousel. */
  skillTags: string[];
  /** Primary destination — live site, repo, or write-up. Renders the "view page" link. */
  link?: string;
  /** Optional live demo, when it is separate from `link`. Renders "view demo". */
  demo?: string;
  /**
   * Optional shorter variants for the featured carousel, whose cards are a
   * fixed 350×300px. Any field omitted here falls back to the full version.
   */
  featured?: {
    description?: string;
  };
}

export const projects: Project[] = [
  {
    title: "RL Quadrotor Control",
    year: 2026,
    description:
      "End-to-end multi-behavior policy for quadrotor control using modern deep reinforcement learning techniques. Trained in NVIDIA Isaac simulation environments with sim-to-real transfer capabilities, enabling complex autonomous flight behaviors from a single learned policy.",
    skillTags: ["Reinforcement Learning", "PyTorch", "Isaac Sim", "CUDA"],
    featured: {
      description:
        "End-to-end multi-behavior policy for quadrotor control using modern deep reinforcement learning techniques.",
    },
  },
  {
    title: "Legislature Summarizer",
    year: 2025,
    description:
      "AI-powered web application that consolidates and summarizes government legislature, making policy accessible and searchable. Built during the 2025 Lobo Hackathon, where it placed fourth.",
    skillTags: ["NLP", "LLMs", "Web Development"],
    featured: {
      description:
        "AI-powered web app for consolidating and summarizing government legislature. 4th place at Lobo Hackathon.",
    },
  },
  {
    title: "Lost in Translation",
    year: 2026,
    description:
      "A web application that emulates the game of telephone with a randomized list of languages. Text is translated from one language directly to the next until a set limit is reached. The result is a strange and funny adaptation of the original text, often with odd grammar and vocabulary usage.",
    skillTags: ["JavaScript", "Web Development", "REST APIs"],
    link: "https://calvinstahoviak.com/lost-in-translation",
    featured: {
      description:
        "Experience the classic game of telephone with an assortment of randomized languages that adapts text in fun ways.",
    },
  },
];
