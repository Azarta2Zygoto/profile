import { Locale } from "@/i18n/routing";

export type Ordering = "default" | "date" | "lexicographical";

export interface SelectOption<T = string> {
    label: string;
    value: T;
}

export interface AsyncLocaleProps {
    params: Promise<{ locale: string }>;
}

export interface LocaleProps {
    locale: Locale;
}
