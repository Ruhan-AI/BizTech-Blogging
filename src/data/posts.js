const contributorProfiles = {
  "amina-carter": {
    name: "Amina Carter",
    slug: "amina-carter",
    role: "Organic Growth Strategist",
    initials: "AC",
    bio: "Amina helps lean marketing teams turn search intent into practical, measurable growth systems.",
    location: "Austin, Texas",
  },
  "marcus-reed": {
    name: "Marcus Reed",
    slug: "marcus-reed",
    role: "People Operations Advisor",
    initials: "MR",
    bio: "Marcus designs people operations that give growing teams clarity without adding unnecessary process.",
    location: "Houston, Texas",
  },
  "sofia-malik": {
    name: "Sofia Malik",
    slug: "sofia-malik",
    role: "Brand Systems Consultant",
    initials: "SM",
    bio: "Sofia works with founder-led companies to build brands that stay recognizable as their teams and channels expand.",
    location: "New York, New York",
  },
  "daniel-kim": {
    name: "Daniel Kim",
    slug: "daniel-kim",
    role: "Product & Web Engineer",
    initials: "DK",
    bio: "Daniel builds accessible, performance-focused digital products for startups and service businesses.",
    location: "Seattle, Washington",
  },
  "lena-ortiz": {
    name: "Lena Ortiz",
    slug: "lena-ortiz",
    role: "Startup Strategy Advisor",
    initials: "LO",
    bio: "Lena helps early-stage teams test positioning, sharpen their offers, and scale only after the signal is clear.",
    location: "Miami, Florida",
  },
  "noah-williams": {
    name: "Noah Williams",
    slug: "noah-williams",
    role: "Learning Experience Designer",
    initials: "NW",
    bio: "Noah creates skills-first learning programs that connect training with real workplace outcomes.",
    location: "Chicago, Illinois",
  },
};

import guestPosts from "./guest_posts.json";

const staticPosts = [
  {
    slug: "building-an-seo-system-that-compounds",
    title: "Build an SEO System That Compounds, Not a Calendar That Exhausts",
    excerpt:
      "A practical operating model for turning customer questions, search intent, and editorial discipline into sustainable organic growth.",
    category: "SEO & Digital Growth",
    categorySlug: "seo-digital-growth",
    date: "2026-07-16",
    readTime: "8 min read",
    author: contributorProfiles["amina-carter"],
    gradient: "linear-gradient(135deg, #090909 0%, #263329 55%, #d7ff52 150%)",
    featured: true,
    tags: ["SEO", "Content Strategy", "Organic Growth"],
    content: [
      {
        heading: "Stop treating publishing as the strategy",
        paragraphs: [
          "A content calendar can create motion without creating momentum. Teams ship articles, watch a few rankings move, and then start over every month. A compounding SEO system behaves differently: every new piece supports an intentional topic, answers a real customer question, and strengthens an existing path through the site.",
          "The shift begins by replacing volume targets with coverage targets. Instead of asking how many posts to publish, ask which decisions your customer must make before they are ready to buy and where your site currently leaves those decisions unanswered.",
        ],
      },
      {
        heading: "Build from evidence, not a keyword export",
        paragraphs: [
          "Keyword tools are useful, but they are only one input. Sales calls, support tickets, proposal objections, and on-site search reveal the language buyers use when the problem is real. Group those signals into themes, then map each theme to a clear search intent and business outcome.",
        ],
        bullets: [
          "Collect recurring questions from sales and customer-facing teams.",
          "Cluster questions by the decision they help a reader make.",
          "Choose one durable guide as the hub for each important cluster.",
          "Link supporting articles back to the hub and to the next useful action.",
        ],
      },
      {
        heading: "Measure the system, not isolated posts",
        paragraphs: [
          "A single article can fluctuate. A healthy topic cluster should steadily earn more qualified impressions, deeper visits, and assisted conversions. Review performance at the cluster level every quarter, refresh the pages already close to winning, and retire content that no longer serves a clear purpose.",
          "Compounding growth is rarely dramatic in week one. It is the result of many well-connected, human-reviewed decisions that remain useful long after the publishing date.",
        ],
      },
    ],
  },
  {
    slug: "people-operations-before-your-next-hiring-wave",
    title: "The People Operations Foundation to Build Before Your Next Hiring Wave",
    excerpt:
      "Five lightweight systems that protect culture, manager time, and employee confidence while headcount is growing quickly.",
    category: "HR Outsourcing & People Operations",
    categorySlug: "hr-people-operations",
    date: "2026-07-12",
    readTime: "7 min read",
    author: contributorProfiles["marcus-reed"],
    gradient: "linear-gradient(135deg, #0b0b0b 0%, #352b22 58%, #ff9f52 145%)",
    featured: false,
    tags: ["People Operations", "Hiring", "Team Growth"],
    content: [
      {
        heading: "Growth exposes every unclear decision",
        paragraphs: [
          "Small teams can rely on memory and proximity. Once hiring accelerates, informal answers become inconsistent answers. New employees hear different expectations, managers repeat the same explanations, and routine requests begin to interrupt focused work.",
          "The answer is not a thick handbook. It is a small set of reliable systems that make the most common moments predictable.",
        ],
      },
      {
        heading: "Document the employee moments that repeat",
        paragraphs: [
          "Start with onboarding, time off, performance conversations, role changes, and exits. Give each moment a clear owner, a short checklist, and one source of truth. If a process needs a live explanation every time, it is not yet a process.",
        ],
        bullets: [
          "Write role outcomes before opening a vacancy.",
          "Give every new hire a 30-day plan and a named onboarding partner.",
          "Set one consistent cadence for manager check-ins.",
          "Publish the path for questions, concerns, and confidential issues.",
        ],
      },
      {
        heading: "Keep the system human",
        paragraphs: [
          "Good operations remove uncertainty; they do not remove judgment. Leave room for managers to respond to context, but make the baseline fair and visible. That balance gives employees confidence and gives leaders more time for conversations that actually require care.",
        ],
      },
    ],
  },
  {
    slug: "brand-consistency-without-creative-gridlock",
    title: "How to Create Brand Consistency Without Creative Gridlock",
    excerpt:
      "A lean brand system can make every channel feel connected while still giving teams room to make relevant, timely work.",
    category: "Social Media & Branding",
    categorySlug: "social-media-branding",
    date: "2026-07-08",
    readTime: "6 min read",
    author: contributorProfiles["sofia-malik"],
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #30243a 58%, #c777ff 145%)",
    featured: false,
    tags: ["Brand Strategy", "Social Media", "Design Systems"],
    content: [
      {
        heading: "Consistency is recognition, not repetition",
        paragraphs: [
          "Brands become recognizable when the same point of view appears through many different expressions. Repeating one template everywhere may look controlled, but it often makes the brand less relevant to the channel and the audience.",
          "The useful question is not whether every asset looks identical. It is whether every asset feels like it came from the same company with the same standards and beliefs.",
        ],
      },
      {
        heading: "Define the few things that should not drift",
        paragraphs: [
          "Create guardrails for voice, type, color, spacing, image treatment, and calls to action. Pair each rule with examples that show both the principle and its range. A good system makes the correct choice easier; it does not require a designer to approve every post.",
        ],
        bullets: [
          "Three voice traits with clear do-and-don't examples.",
          "A compact color and type hierarchy for everyday use.",
          "Flexible layout recipes for each priority channel.",
          "A review checklist focused on recognition and clarity.",
        ],
      },
      {
        heading: "Review the system where work happens",
        paragraphs: [
          "Brand guidelines improve when they are tested against real briefs. Review a month of work, note where the team improvised, and decide whether the system should clarify the rule or formally allow the variation. That feedback loop keeps consistency from becoming bureaucracy.",
        ],
      },
    ],
  },
  {
    slug: "performance-first-websites-convert-better",
    title: "Why Performance-First Websites Usually Convert Better",
    excerpt:
      "Speed is more than a technical score. It shapes trust, comprehension, and whether a visitor stays long enough to act.",
    category: "Website Development & Design",
    categorySlug: "website-development-design",
    date: "2026-07-04",
    readTime: "7 min read",
    author: contributorProfiles["daniel-kim"],
    gradient: "linear-gradient(135deg, #090909 0%, #17303a 58%, #45d9ff 145%)",
    featured: false,
    tags: ["Web Performance", "UX", "Conversion"],
    content: [
      {
        heading: "Every delay creates doubt",
        paragraphs: [
          "Visitors do not separate performance from experience. A delayed headline, shifting button, or oversized image feels like uncertainty. That friction is especially costly on service websites, where trust begins before a prospect reads the first claim.",
          "Performance work therefore belongs in the design process, not at the end of development as a cleanup task.",
        ],
      },
      {
        heading: "Design the loading path intentionally",
        paragraphs: [
          "Prioritize the content that helps a visitor orient themselves: what the company does, who it helps, and what to do next. Load decorative media later, reserve space for dynamic elements, and make primary actions usable without waiting for the whole page.",
        ],
        bullets: [
          "Use a clear type hierarchy instead of image-heavy hero copy.",
          "Compress and size media for its actual display context.",
          "Limit third-party scripts to tools with a measurable purpose.",
          "Test on ordinary phones and connections, not only a fast laptop.",
        ],
      },
      {
        heading: "Connect speed to business behavior",
        paragraphs: [
          "Track engagement and conversion alongside Core Web Vitals. The strongest improvements often come from a simpler page that loads quickly and explains the offer clearly. Technical health and message clarity are partners, not separate optimization projects.",
        ],
      },
    ],
  },
  {
    slug: "validate-go-to-market-before-scaling-spend",
    title: "Validate Your Go-to-Market Motion Before You Scale the Spend",
    excerpt:
      "A focused validation sprint helps founders find a repeatable signal before more budget amplifies the wrong assumptions.",
    category: "Startup Advisory & Business Strategy",
    categorySlug: "startup-business-strategy",
    date: "2026-06-29",
    readTime: "9 min read",
    author: contributorProfiles["lena-ortiz"],
    gradient: "linear-gradient(135deg, #090909 0%, #37321f 58%, #ffe66b 145%)",
    featured: false,
    tags: ["Go-to-Market", "Startups", "Validation"],
    content: [
      {
        heading: "Budget cannot repair a weak signal",
        paragraphs: [
          "More spend makes an existing motion louder. If the audience, problem, offer, or buying path is unclear, scaling simply produces more expensive ambiguity. Early go-to-market work should reduce that ambiguity one assumption at a time.",
          "A useful validation sprint is narrow enough to learn from. Choose one audience, one urgent problem, one offer, and one primary channel before adding variants.",
        ],
      },
      {
        heading: "Define proof before launching the test",
        paragraphs: [
          "Decide what evidence would change your mind. Interviews can validate language and urgency; paid pilots validate willingness to pay; conversion behavior validates whether the path is understandable. No single metric answers every question.",
        ],
        bullets: [
          "Record the assumption and the risk if it is wrong.",
          "Choose the smallest credible test and a fixed review date.",
          "Capture objections in the customer's own language.",
          "Scale only the part of the motion that repeatedly works.",
        ],
      },
      {
        heading: "Treat focus as a temporary advantage",
        paragraphs: [
          "Focus does not mean the company can serve only one segment forever. It means the team creates enough signal in one place to learn efficiently. Once the motion is repeatable, adjacent audiences and channels can be tested without losing the foundation.",
        ],
      },
    ],
  },
  {
    slug: "skills-first-career-roadmap",
    title: "A Skills-First Career Roadmap for a Changing Job Market",
    excerpt:
      "Build career resilience by turning broad ambitions into visible capabilities, workplace evidence, and a repeatable learning rhythm.",
    category: "Vocational Training & Career Development",
    categorySlug: "vocational-career-development",
    date: "2026-06-24",
    readTime: "6 min read",
    author: contributorProfiles["noah-williams"],
    gradient: "linear-gradient(135deg, #090909 0%, #1d342b 58%, #65f6b1 145%)",
    featured: false,
    tags: ["Career Growth", "Skills", "Learning"],
    content: [
      {
        heading: "Job titles change faster than useful skills",
        paragraphs: [
          "A role title can hide very different expectations across companies. Skills make the opportunity more concrete: research a customer, build a forecast, resolve a conflict, analyze a campaign, or explain a technical decision clearly.",
          "A skills-first roadmap starts with the work you want to be trusted with, then identifies the evidence that would make that trust reasonable.",
        ],
      },
      {
        heading: "Turn learning into observable evidence",
        paragraphs: [
          "Courses can introduce a capability, but projects demonstrate it. Choose small assignments that resemble real work, define a quality bar, request feedback, and document what changed between versions.",
        ],
        bullets: [
          "Select one role outcome you want to own within six months.",
          "Break it into technical, communication, and judgment skills.",
          "Create one portfolio artifact for the highest-risk skill.",
          "Review progress monthly with someone who understands the work.",
        ],
      },
      {
        heading: "Build a rhythm you can sustain",
        paragraphs: [
          "Career resilience comes from a modest, consistent learning cycle. One focused project, honest feedback, and a short reflection each month will compound more reliably than occasional bursts of unfocused study.",
        ],
      },
    ],
  },
  {
    slug: "ai-assisted-content-still-needs-human-judgment",
    title: "AI-Assisted Content Still Needs a Human Point of View",
    excerpt:
      "AI can accelerate research and drafting, but useful business content still depends on experience, verification, and editorial judgment.",
    category: "SEO & Digital Growth",
    categorySlug: "seo-digital-growth",
    date: "2026-06-19",
    readTime: "7 min read",
    author: contributorProfiles["amina-carter"],
    gradient: "linear-gradient(135deg, #090909 0%, #28223a 58%, #a98aff 145%)",
    featured: false,
    tags: ["AI", "Editorial Quality", "Content"],
    content: [
      {
        heading: "Faster words are not automatically better ideas",
        paragraphs: [
          "Generative tools can organize notes, expose gaps, and accelerate a rough draft. They cannot decide which experience is relevant, which claim deserves skepticism, or which tradeoff a real operator should understand.",
          "The best use of AI is to compress mechanical work while protecting the parts that require accountability.",
        ],
      },
      {
        heading: "Create a human-reviewed workflow",
        paragraphs: [
          "Begin with an original brief grounded in audience needs. Verify every factual claim against a reliable source, add examples from actual practice, and edit until the piece expresses a defensible point of view rather than a smooth summary.",
        ],
        bullets: [
          "Use AI to explore structure, alternatives, and missing questions.",
          "Keep source notes beside every factual or statistical claim.",
          "Ask a subject-matter reviewer to challenge the recommendation.",
          "Disclose material AI assistance when the publishing policy requires it.",
        ],
      },
      {
        heading: "Publish only what someone will stand behind",
        paragraphs: [
          "Editorial trust comes from ownership. A named contributor and a responsible editor should both be willing to explain why the article exists, how its claims were checked, and where its advice may not apply.",
        ],
      },
    ],
  },
  {
    slug: "remote-people-operations-playbook",
    title: "A Practical People Operations Playbook for Remote Teams",
    excerpt:
      "Remote work becomes more humane when teams make decisions, expectations, and access to support visible by default.",
    category: "HR Outsourcing & People Operations",
    categorySlug: "hr-people-operations",
    date: "2026-06-14",
    readTime: "8 min read",
    author: contributorProfiles["marcus-reed"],
    gradient: "linear-gradient(135deg, #090909 0%, #213238 58%, #7ee8fa 145%)",
    featured: false,
    tags: ["Remote Work", "Culture", "Operations"],
    content: [
      {
        heading: "Remote teams need visible context",
        paragraphs: [
          "In an office, people can recover missing context through proximity. Remote teams need a deliberate alternative. Decisions, priorities, and working agreements should be easy to find without knowing whom to ask or which meeting contained the answer.",
        ],
      },
      {
        heading: "Design for asynchronous clarity",
        paragraphs: [
          "Use written decision records, explicit response-time norms, and meeting notes with owners and dates. Reserve synchronous time for ambiguity, debate, and connection rather than routine status transfer.",
        ],
        bullets: [
          "State which channel to use for urgent, private, and routine requests.",
          "Record decisions with context, owner, and review date.",
          "Make promotion and performance criteria visible to everyone.",
          "Create dependable access to confidential people support.",
        ],
      },
      {
        heading: "Protect belonging as intentionally as productivity",
        paragraphs: [
          "A remote operating model should not reduce people to task updates. Create space for mentoring, informal connection, and recognition across locations. The goal is not to reproduce an office online; it is to make participation fair wherever someone works.",
        ],
      },
    ],
  },
  {
    slug: "design-system-for-a-growing-startup",
    title: "The Small Design System a Growing Startup Actually Needs",
    excerpt:
      "Start with shared decisions that reduce rework, improve accessibility, and help a product team ship with confidence.",
    category: "Website Development & Design",
    categorySlug: "website-development-design",
    date: "2026-06-08",
    readTime: "7 min read",
    author: contributorProfiles["daniel-kim"],
    gradient: "linear-gradient(135deg, #090909 0%, #352930 58%, #ff8ea1 145%)",
    featured: false,
    tags: ["Design Systems", "Product Design", "Startups"],
    content: [
      {
        heading: "A design system is a shared decision system",
        paragraphs: [
          "Early teams often picture a design system as a polished component library. The higher-value starting point is simpler: agree on the decisions that otherwise get remade in every screen, then encode them in design and code.",
          "Typography, spacing, color roles, focus states, buttons, inputs, and content width cover a surprising amount of everyday product work.",
        ],
      },
      {
        heading: "Start with the most repeated friction",
        paragraphs: [
          "Audit recent work and find the components that created debate, inconsistency, or accessibility defects. Define their behavior across states and screen sizes, document the reason behind each choice, and make the implementation easy to reuse.",
        ],
        bullets: [
          "Use semantic color roles instead of page-specific color names.",
          "Define keyboard, loading, empty, error, and disabled states.",
          "Pair design guidance with the production component.",
          "Assign an owner and a lightweight contribution process.",
        ],
      },
      {
        heading: "Grow it when repetition earns it",
        paragraphs: [
          "A small system should evolve from product evidence. Add a pattern after the team has solved it more than once, not because a comprehensive library might need it someday. This keeps the system useful, trusted, and proportional to the product.",
        ],
      },
    ],
  },
];

export const posts = [...staticPosts, ...guestPosts];

const categoryBlueprints = [
  {
    name: "SEO & Digital Growth",
    slug: "seo-digital-growth",
    shortName: "SEO & Growth",
    description: "Search strategy, content systems, analytics, and sustainable demand generation.",
  },
  {
    name: "HR Outsourcing & People Operations",
    slug: "hr-people-operations",
    shortName: "People Operations",
    description: "Practical systems for hiring, managing, and supporting growing teams.",
  },
  {
    name: "Social Media & Branding",
    slug: "social-media-branding",
    shortName: "Branding",
    description: "Distinctive positioning, consistent brand systems, and audience-led social strategy.",
  },
  {
    name: "Website Development & Design",
    slug: "website-development-design",
    shortName: "Web & Design",
    description: "Accessible, high-performing websites and digital product experiences.",
  },
  {
    name: "Startup Advisory & Business Strategy",
    slug: "startup-business-strategy",
    shortName: "Startup Strategy",
    description: "Clearer offers, validated go-to-market decisions, and operating models built to scale.",
  },
  {
    name: "Vocational Training & Career Development",
    slug: "vocational-career-development",
    shortName: "Career Development",
    description: "Skills-first learning, workplace readiness, and practical career growth.",
  },
];

export const categories = categoryBlueprints.map((category) => ({
  ...category,
  count: posts.filter((post) => post.categorySlug === category.slug).length,
}));

export const authors = Object.values(contributorProfiles).map((author) => ({
  ...author,
  postCount: posts.filter((post) => post.author.slug === author.slug).length,
}));

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByCategory(slug) {
  return posts.filter((post) => post.categorySlug === slug);
}

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug);
}

export function getAuthorBySlug(slug) {
  return authors.find((author) => author.slug === slug);
}

export function getPostsByAuthor(slug) {
  return posts.filter((post) => post.author.slug === slug);
}

export function searchPosts(query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return posts.filter((post) => {
    const searchableText = [
      post.title,
      post.excerpt,
      post.category,
      post.author.name,
      ...post.tags,
      ...post.content.flatMap((section) => [
        section.heading,
        ...section.paragraphs,
        ...(section.bullets || []),
      ]),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}
