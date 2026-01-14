import locales from "@/data/locales.json";

export type Locale = keyof typeof locales;
export type Themes = "light" | "dark";

export interface StudyType {
    id: string;
    name: string;
    title: string;
    description: string;
    period: string;
    city: string;
    link?: string;
    lessons: LessonType[];
}

export interface LessonType {
    name: string;
    description: string;
    tools: string[];
    languages: string[];
    projects?: string[];
}

export interface ProjectType {
    id: string;
    name: string;
    description: string;
    commanditaire?: string;
    period: string;
    link?: string;
    repo?: string;
    languages: string[];
    tools: string[];
}

export interface ColorScheme {
    background: string;
    color: string;
}
