"use client";

import { useTranslations } from "next-intl";
import { type ReactNode } from "react";

import profile from "@/data/profile.json";
import { APP_CONFIG } from "@/types/common.constants";
import { LocaleProps } from "@/types/common.types";

export default function JsonLD({ locale }: Readonly<LocaleProps>): ReactNode {
    const t = useTranslations("Languages");

    const personJsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: `${profile.lastname} ${profile.firstname}`,
        url: `${APP_CONFIG.baseUrl}${locale}`,
        jobTitle: profile.job,
        email: `mailto:${profile.gmail}`,
        sameAs: `${APP_CONFIG.baseUrl}${locale}`,
        knowsLanguage: profile.languages.map((lang) => {
            return {
                "@type": "Language",
                name: t(lang),
                alternateName: lang,
            };
        }),
        nationality: profile.nationality.map((nat) => {
            return {
                "@type": "Country",
                name: t(nat),
                alternateName: nat,
            };
        }),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(personJsonLd),
            }}
        />
    );
}
