import { Locale } from "@/i18n/routing";

export interface Study {
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
    lessons: Lesson[];
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

export interface Lesson {
    id: string;
    link?: string;
    tools: string[];
    languages: string[];
    projects?: string[];
}
