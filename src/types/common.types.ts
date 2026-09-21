export enum ThemeEnum {
    LIGHT = "light",
    DARK = "dark",
}

export type Ordering = "default" | "date" | "lexicographical";

export interface ColorScheme {
    background: string;
    color: string;
}

export interface SelectOption<T = string> {
    label: string;
    value: T;
}

export interface LocaleProps {
    params: Promise<{ locale: string }>;
}
