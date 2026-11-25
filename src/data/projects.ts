export type Project = {
    id: string;
    title: string;
    slug: string;
    category: "AI Product" | "Platform" | "Web" | "Mobile";
    description: string;
    overview: string;
    tags: string[];
    image?: string;
    url?: string;
    created_at: string;
};

// Ordered for display: most recent / most representative work first
export const projectsData: Project[] = [
    {
        id: "1",
        title: "Bobcares.com Revamp",
        slug: "bobcares-revamp",
        category: "Web",
        description: "Led the migration of Bobcares.com from WordPress to Next.js, with a custom admin panel replacing WordPress for content management.",
        overview: "Led the migration of the Bobcares.com website from WordPress to Next.js, including the development of a custom admin panel to replace WordPress for website and content management. Coordinated page migration, content management workflows, deployment planning, and collaboration between development and marketing teams to ensure a smooth transition to the new platform.",
        tags: ["Next.js", "Custom CMS", "Migration", "Delivery"],
        url: "https://bobcares.com/",
        created_at: "2025-06-01T00:00:00Z"
    },
    {
        id: "2",
        title: "ChurnAI",
        slug: "churnai",
        category: "AI Product",
        description: "AI-powered SaaS that flags customers at risk of cancelling, scores churn probability and turns usage and billing data into retention actions.",
        overview: "ChurnAI is an AI-powered SaaS platform that helps businesses proactively identify customers at risk of cancelling or discontinuing their services. It uses machine learning models and predictive analytics to analyse customer behaviour, assign churn probability scores, and surface actionable insights through an intuitive dashboard. It integrates with billing and customer management systems such as WHMCS to collect real-time usage and billing data, eliminating manual data entry and enabling data-driven retention strategies.",
        tags: ["Machine Learning", "Predictive Analytics", "WHMCS", "SaaS"],
        created_at: "2025-05-01T00:00:00Z"
    },
    {
        id: "3",
        title: "CDBQuery Hub",
        slug: "cdbquery-hub",
        category: "AI Product",
        description: "A centralised AI “brain” that lets support teams query complex client guidelines through a conversational interface.",
        overview: "CDBQuery Hub is an intelligent knowledge platform that allows support teams to query complex client guidelines using AI. It acts as a centralised “brain” for the company, turning static documentation into an interactive chat experience.",
        tags: ["RAG", "LLM", "Knowledge Base", "Support"],
        created_at: "2025-04-01T00:00:00Z"
    },
    {
        id: "4",
        title: "Smart Search",
        slug: "smart-search",
        category: "AI Product",
        description: "Semantic search assistant that understands intent, combining vector search with generative AI to answer in natural language.",
        overview: "An AI-powered search assistant that understands the meaning behind user questions rather than just matching keywords. It combines vector search with generative AI to provide natural-language answers, ranked service plans, and helpful resource links.",
        tags: ["Semantic Search", "ChromaDB", "Generative AI", "FastAPI"],
        created_at: "2025-03-01T00:00:00Z"
    },
    {
        id: "5",
        title: "NexBikes",
        slug: "nexbikes",
        category: "AI Product",
        description: "AI bicycle platform recommending bike-specific parts, tracking component lifecycles and offering AI support, with Garmin and HubSpot integrations.",
        overview: "An AI-powered bicycle platform that recommends bike-specific parts, tracks maintenance and component lifecycles, and provides AI bicycle support. Includes Garmin and HubSpot integrations.",
        tags: ["AI Recommendations", "Garmin", "HubSpot", "Integrations"],
        image: "/api/asset/projects/bicycles.png",
        created_at: "2025-02-01T00:00:00Z"
    },
    {
        id: "6",
        title: "Feedback Management",
        slug: "feedback-management",
        category: "Platform",
        description: "Collects quarterly client feedback from email and turns unstructured replies into structured ratings, insights and dashboards.",
        overview: "A centralised feedback management platform that automatically collects, stores, and analyses client feedback received via email on a quarterly basis. It transforms unstructured email responses into structured insights, ratings, and actionable dashboards.",
        tags: ["Automation", "NLP", "Dashboards", "Email Parsing"],
        created_at: "2025-01-01T00:00:00Z"
    },
    {
        id: "7",
        title: "cLabs",
        slug: "clabs",
        category: "Platform",
        description: "Laboratory Information Management System automating sample management, test results, reporting and quality control.",
        overview: "CLABS is a Laboratory Information Management System (LIMS) developed using CodeIgniter and MySQL. It automates and manages laboratory operations, including sample management, test results, reporting, and quality control.",
        tags: ["CodeIgniter", "MySQL", "LIMS"],
        image: "/api/asset/projects/clabs.png",
        created_at: "2022-01-01T00:00:00Z"
    },
    {
        id: "8",
        title: "myG Online",
        slug: "myg-online",
        category: "Mobile",
        description: "Mobile shopping app for digital gadgets, built with Flutter and a custom CS-Cart add-on.",
        overview: "The myG mobile application provides a user-friendly, accessible way to buy digital gadgets online. Flutter and a custom CS-Cart add-on power the app's functionality and convenience.",
        tags: ["Flutter", "CS-Cart", "E-commerce"],
        image: "/api/asset/projects/myg_online.png",
        created_at: "2021-06-01T00:00:00Z"
    },
    {
        id: "9",
        title: "Home2Labs",
        slug: "home2labs",
        category: "Mobile",
        description: "Book health tests from home: professionals collect samples at your door and results arrive in the app.",
        overview: "Home2Labs is a daily health testing service built with CodeIgniter, MySQL, Android, and REST APIs. Users book health tests from home, healthcare professionals collect the samples at their door, and results are delivered through the Home2Labs app.",
        tags: ["CodeIgniter", "MySQL", "Android", "REST API"],
        image: "/api/asset/projects/home2labs.png",
        created_at: "2020-06-01T00:00:00Z"
    },
    {
        id: "10",
        title: "Lions Club Manager",
        slug: "lions-club",
        category: "Platform",
        description: "Activity management for club events, visits, members and a blood bank, backed by procedures, triggers and REST APIs.",
        overview: "Lions Club Activity Management Software, developed in CodeIgniter with MySQL using prepared statements, stored procedures, triggers, and REST APIs. It manages club activities, events, visits, members, and a blood bank.",
        tags: ["CodeIgniter", "MySQL", "REST API"],
        image: "/api/asset/projects/lions_club.png",
        created_at: "2019-06-01T00:00:00Z"
    },
    {
        id: "11",
        title: "Currency Exchange",
        slug: "currency-exchange",
        category: "Platform",
        description: "Internal software for a currency exchange company: rate tracking, transactions, user management and reports.",
        overview: "Internal software for a currency exchange company, built with PHP and MySQL. It covers exchange rate tracking, transaction management, user management, security controls, and reporting, giving the business one accurate system for managing financial transactions.",
        tags: ["PHP", "MySQL", "Finance"],
        image: "/api/asset/projects/currency_exchange.png",
        created_at: "2018-06-01T00:00:00Z"
    },
    {
        id: "12",
        title: "TodaysDine",
        slug: "todaysdine",
        category: "Web",
        description: "Contactless QR menu platform for hotels and resorts.",
        overview: "A contactless QR digital menu platform built for hotels and resorts, replacing printed menus with an interactive, easily updated digital experience.",
        tags: ["CodeIgniter", "MySQL", "QR Menu"],
        image: "/api/asset/projects/todaysdine.png",
        created_at: "2021-01-01T00:00:00Z"
    }
];
