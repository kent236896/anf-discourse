import Route from "@ember/routing/route";

export default Route.extend({
  model() {
    return {
      categories: [
        { id: "w7plMu69o1", name: "Static Site Generator", active: true },
        { id: "eJ1Z6eIMp5", name: "Low Code Development Tool", active: false },
        { id: "lqeR4oSZJo", name: "Business Intelligence", active: false },
        { id: "bJN1MDhWql", name: "Artificial Intelligence", active: false },
        { id: "zJyYwZHPJK", name: "Web3", active: false },
        { id: "kL9pQs2mNo", name: "Computer Science Courses", active: false },
        { id: "vR7tDx1Zqw", name: "MLOps Tools", active: false },
        { id: "pT5jSm3xZy", name: "Kubernetes Tooling", active: false },
        { id: "nB8uVw4aRt", name: "Virtual Reality", active: false },
        { id: "cF2hGj5bXq", name: "Robotics", active: false },
        { id: "dK3pLm6nYs", name: "ChatGPT Alternatives", active: false },
        { id: "gH1jKm7pLq", name: "LLM Tools", active: false },
        { id: "rT9sVu2xZw", name: "Vector Search Engine", active: false },
        { id: "mP4qRs3xZy", name: "ChatGPT Apps", active: false },
      ],
      currentCategory: "Static Site Generator",
      periodName: "Last 28 days",
      periodId: "last-28-days",
      repos: [
        {
          rank: 1,
          name: "vercel/next.js",
          url: "https://github.com/vercel/next.js",
          description: "The React Framework",
          starIncrease: 975,
          totalStars: 138087,
          growthRate: 1.25,
          growthIsPositive: true,
        },
        {
          rank: 2,
          name: "gohugoio/hugo",
          url: "https://github.com/gohugoio/hugo",
          description: "The world's fastest framework for building websites.",
          starIncrease: 732,
          totalStars: 86092,
          growthRate: -5.3,
          growthIsPositive: false,
        },
        {
          rank: 3,
          name: "withastro/astro",
          url: "https://github.com/withastro/astro",
          description: "The web framework for content-driven websites.",
          starIncrease: 649,
          totalStars: 49879,
          growthRate: -6.08,
          growthIsPositive: false,
        },
        {
          rank: 4,
          name: "facebook/docusaurus",
          url: "https://github.com/facebook/docusaurus",
          description: "Easy to maintain open source documentation websites.",
          starIncrease: 486,
          totalStars: 59826,
          growthRate: -11.96,
          growthIsPositive: false,
        },
        {
          rank: 5,
          name: "nuxt/nuxt",
          url: "https://github.com/nuxt/nuxt",
          description: "The Intuitive Vue Framework.",
          starIncrease: 400,
          totalStars: 59940,
          growthRate: -10.11,
          growthIsPositive: false,
        },
        {
          rank: 6,
          name: "squidfunk/mkdocs-material",
          url: "https://github.com/squidfunk/mkdocs-material",
          description: "Documentation that simply works",
          starIncrease: 323,
          totalStars: 22425,
          growthRate: -2.12,
          growthIsPositive: false,
        },
        {
          rank: 7,
          name: "vuejs/vitepress",
          url: "https://github.com/vuejs/vitepress",
          description: "Vite & Vue powered static site generator",
          starIncrease: 280,
          totalStars: 14283,
          growthRate: 5.26,
          growthIsPositive: true,
        },
      ],
      paginationInfo: {
        currentPage: 1,
        totalPages: 4,
        totalItems: 34,
        itemsPerPage: 10,
      },
    };
  },
});
