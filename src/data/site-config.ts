export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    website: string;
    logo?: Image;
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    website: 'https://nrfrank.github.io',
    title: 'Nathan Frank',
    subtitle: 'ML Platform & Operations Leader',
    description: 'Engineering & AI/ML leader turning complex platforms into well-governed, widely adopted products.',
    image: {
        src: '/nathan-preview.jpg',
        alt: 'Nathan Frank - ML Platform & Operations Leader'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'About',
            href: '/about'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Contact',
            href: '/contact'
        },
        {
            text: 'Resume',
            href: '/resume'
        }
    ],
    socialLinks: [
        {
            text: 'LinkedIn',
            href: 'https://www.linkedin.com/in/nrfrank'
        },
        {
            text: 'Email',
            href: 'mailto:nathan.frank@grainger.com'
        }
    ],
    hero: {
        title: 'Scaling responsible AI adoption at enterprise scale',
        text: "I'm **Nathan Frank**, an engineering and AI/ML leader who builds platforms that teams actually use. At Grainger (Fortune-500; ~25k employees), I lead Machine Learning Platform & Operations, bringing Databricks, Kubernetes, production-grade model serving, vector search, and multi-provider LLM access together so product, machine learning, data science, and analytics teams can ship faster.\n\nMy approach is pragmatic and people-first: translate between data scientists, engineers, security, and business stakeholders; break down complex topics; and coach teams toward best practices.",
        actions: [
            {
                text: 'View Resume',
                href: '/resume'
            },
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ]
    },
    subscribe: {
        title: 'Subscribe to Dante Newsletter',
        text: 'One update per week. All the latest posts directly in your inbox.',
        formUrl: '#'
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
