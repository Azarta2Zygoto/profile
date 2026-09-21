export interface Project {
    id: string;
    large?: boolean;
    commanditaire?: {
        name: string;
        url: string;
        logo?: string;
    };
    period: {
        start?: string;
        end?: string;
        in?: string;
    };
    study?: string;
    languages: string[];
    tools: string[];
    websites?: { name: string; url: string }[];
    repo?: string;
    creators?: ProjectSocial[];
}

export interface ProjectDetail {
    description: string;
    name: string;
    paragraph?: {
        text?: string;
        li?: string[];
    };
}

export interface ProjectSocial {
    name: string;
    linkedin?: string;
    github?: string;
    website?: string;
}
