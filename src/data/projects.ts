export const projects = [
  {
    slug: "lumilight",
    title: "LumiLight — Decentralized Crowdfunding Platform",
    description:
      "A blockchain-based crowdfunding platform enabling transparent and trustless funding using smart contracts.",
    tech: ["Next.js", "Solidity", "Web3.js", "Hardhat", "Polygon"],
    live: "https://lumi-light-de-app.vercel.app",
    github: "",
    details: {
      problem:
        "Traditional crowdfunding platforms lack transparency and trust between contributors and creators.",
      solution:
        "Built a decentralized application using smart contracts to ensure transparent fund handling and eliminate intermediaries.",
      features: [
        "Smart contract-based funding system",
        "MetaMask wallet authentication",
        "Deployment on Polygon Amoy testnet",
        "Responsive UI using Next.js",
      ],
      learnings: [
        "Smart contract development and deployment",
        "Web3 integration with frontend",
        "Handling async blockchain interactions",
      ],
    },
  },

  {
    slug: "allgreen",
    title: "All Green Enterprises — Business Website",
    description:
      "A responsive business website designed to improve online presence and SEO visibility.",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://allgreenenterprises.com",
    github: "",
    details: {
      problem: "The business lacked an online presence and discoverability.",
      solution:
        "Developed a clean, responsive website optimized for SEO and performance.",
      features: [
        "Responsive design",
        "SEO optimization",
        "Fast loading performance",
      ],
      learnings: ["SEO fundamentals", "Responsive design principles"],
    },
  },

  {
    slug: "todo-app",
    title: "Full Stack Todo Application",
    description:
      "A task management application with React frontend and Spring Boot backend.",
    tech: ["React", "Java", "Spring Boot", "JPA"],
    live: "",
    github: "https://github.com/Deependra-Bhatt/Todo_Application",
    details: {
      problem: "Need for efficient task tracking and management.",
      solution:
        "Built a full-stack application with persistent storage and REST APIs.",
      features: [
        "CRUD operations",
        "Backend API with Spring Boot",
        "State management using React hooks",
      ],
      learnings: ["REST API design", "Backend-frontend integration"],
    },
  },

  {
    slug: "task-manager-flask",
    title: "Task Management System (Flask)",
    description:
      "A backend-focused task management system built using Flask and tested with Postman.",
    tech: ["Flask", "Python", "Postman"],
    live: "",
    github: "https://github.com/Deependra-Bhatt/task-management-system",
    details: {
      problem: "Understanding backend architecture and API design.",
      solution: "Developed REST APIs and tested endpoints using Postman.",
      features: [
        "REST API endpoints",
        "CRUD operations",
        "API testing using Postman",
      ],
      learnings: ["Backend development fundamentals", "API testing workflows"],
    },
  },
];
