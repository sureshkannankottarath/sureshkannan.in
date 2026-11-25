export const profile = {
    name: "Suresh Kannan",
    role: "Technical Project Manager",
    focus: "AI & Automation",
    location: "Kochi, Kerala, India",
    timezone: "Asia/Kolkata",
    email: "sureshk4.info@gmail.com",
    socials: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/skk369/" },
        { label: "GitHub", href: "https://github.com/sureshkannankottarath" },
        { label: "Pinterest", href: "https://in.pinterest.com/sureshk4info/" },
    ],
    summary:
        "Project Manager and R&D leader with 8+ years in software development, project planning, team leadership and product delivery, combining project management with hands-on knowledge of AI, automation and product engineering to ship business-focused solutions.",
};

export const stats = [
    { value: 8, suffix: "+", label: "Years shipping software" },
    { value: 12, suffix: "+", label: "Products shipped" },
    { value: 3, suffix: "", label: "Companies, one craft" },
];

export type Role = { title: string; period: string; points: string[] };
export type Job = { company: string; place: string; years: string; roles: Role[] };

export const experience: Job[] = [
    {
        company: "Poornam Info Vision",
        place: "Kakkanad, Kochi",
        years: "2023 to now",
        roles: [
            {
                title: "R&D Team Lead, AI & Automation",
                period: "Oct 2024 to Present",
                points: [
                    "Lead an AI & R&D team delivering AI-powered products, automation solutions and software platforms.",
                    "Own the end-to-end SDLC: requirements, estimation, resource allocation, development and deployment.",
                    "Drive Agile/Scrum (sprint planning, prioritisation, reviews and retrospectives) and set technical direction across AI, APIs and automation.",
                ],
            },
            {
                title: "Project Manager",
                period: "Oct 2023 to Sep 2024",
                points: [
                    "Managed projects from requirements through testing, deployment and delivery.",
                    "Prepared WBS, schedules, estimates, resource plans, milestones and tracking reports.",
                ],
            },
        ],
    },
    {
        company: "Finekube IT Solutions",
        place: "Kakkanad, Kochi",
        years: "2020 to 2023",
        roles: [
            {
                title: "Project Manager & Software Developer",
                period: "Oct 2020 to Oct 2023",
                points: [
                    "Managed multiple projects across scope, schedule, resources, risks, dependencies and deliverables.",
                    "Handled client requirements and change requests; prepared proposals and estimates; joined code reviews.",
                ],
            },
        ],
    },
    {
        company: "Calcus Technologies",
        place: "Mannuthy, Thrissur",
        years: "2017 to 2020",
        roles: [
            {
                title: "Project Manager & Software Developer",
                period: "Jun 2017 to Oct 2020",
                points: [
                    "Led projects with Agile and Waterfall, managing scope, schedules, resources and stakeholders.",
                    "Built web applications with PHP, MySQL, CodeIgniter, JavaScript and REST APIs.",
                ],
            },
        ],
    },
];

export const education = {
    school: "JCT College of Engineering and Technology",
    degree: "B.E. Computer Science",
    years: "2013 to 2017",
    place: "Coimbatore, Tamil Nadu",
};

// The three stages of the "method" section; each maps to a WebGL particle formation
export const method = [
    {
        index: "01",
        title: "Map the chaos",
        body: "Every project starts as noise: ideas, constraints, stakeholders pulling in different directions. I map it: mind maps, fishbone diagrams, ROI analysis and honest estimates.",
        tools: ["Whimsical", "XMind", "MindMeister", "ROI Analysis", "Fishbone"],
    },
    {
        index: "02",
        title: "Give it structure",
        body: "Then the noise becomes a plan. WBS and RBS, milestones, risk registers, resource allocation and sprints. A lattice the whole team can see and trust.",
        tools: ["WBS / RBS", "Agile & Scrum", "Jira", "ClickUp", "MS Project"],
    },
    {
        index: "03",
        title: "Automate & ship",
        body: "Finally the plan becomes a living system. AI, automation and solid engineering turn structure into products that keep working long after launch.",
        tools: ["n8n", "FastAPI", "Next.js", "ChromaDB", "Docker"],
    },
];

export const toolkit = [
    ["Agile", "Scrum", "Waterfall", "WBS", "RBS", "Risk Management", "Resource Allocation", "ROI Analysis", "Gantt Charts", "Sprint Planning", "Client Communication", "Lead Conversion"],
    ["Claude Code", "Codex", "Cursor", "OpenRouter", "MCP", "n8n", "Zapier", "Make", "FastAPI", "Next.js", "PostgreSQL", "MongoDB", "ChromaDB", "Docker", "Portainer", "CircleCI", "Sentry"],
];
