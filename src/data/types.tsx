import locales from "@/data/locales.json";

export type Locale = keyof typeof locales;
export type Themes = "light" | "dark";

export interface StudyType {
    name: string;
    title: string;
    description: string;
    period: string;
    city: string;
    lessons: LessonType[];
}

export interface LessonType {
    name: string;
    description: string;
    tools: string[];
    languages: string[];
}
