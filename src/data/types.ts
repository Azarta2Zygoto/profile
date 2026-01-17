import locales from "@/data/locales.json";

export type Locale = keyof typeof locales;
export type Themes = "light" | "dark";

export interface StudyType {
    id: string;
    name: string;
    city: string;
    link: string;
    logo?: string;
    locales: Locale[];
    period: {
        start: string;
        end: string;
    };
    lessons: LessonType[];
}

export interface LessonType {
    id: string;
    link?: string;
    tools: string[];
    languages: string[];
    projects?: string[];
}

export interface StudyDetailType {
    title: string;
    description: string;
    lessons: {
        [id: string]: {
            name: string;
            description: string;
        };
    };
}

export interface ProjectType {
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
}

export interface ProjectDetailType {
    description: string;
    name: string;
    paragraph?: {
        text: string;
        li: string[];
    };
}

export interface ColorScheme {
    background: string;
    color: string;
}
