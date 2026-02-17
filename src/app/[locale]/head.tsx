"use client";

import { useTranslations } from "next-intl";
import { type JSX } from "react";

import { APP_CONFIG } from "@/data/config";
import personalData from "@/data/personal_data.json";

interface JSONLDProps {
    locale: string;
}

export default function JSONLD({ locale }: JSONLDProps): JSX.Element {
    const t = useTranslations("Languages");

    const personJsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: `${personalData.lastname} ${personalData.firstname}`,
        url: `${APP_CONFIG.baseUrl}${locale}`,
        jobTitle: personalData.job,
        email: `mailto:${personalData.gmail}`,
        sameAs: `${APP_CONFIG.baseUrl}${locale}`,
        knowsLanguage: personalData.languages.map((lang) => {
            return {
                "@type": "Language",
                name: t(lang),
                alternateName: lang,
            };
        }),
        nationality: personalData.nationality.map((nat) => {
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
