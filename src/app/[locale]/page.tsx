"use client";

import { useTranslations } from "next-intl";
import { Fragment, use } from "react";

import Bar from "@/components/bar";
import Footer from "@/components/footer";
import { FlagSelectMenu } from "@/components/personal/flagSelectMenu";
import ThemeSwitch from "@/components/personal/themeSwitch";
import locales_json from "@/data/locales.json";

const correctedLocale: { label: string; value: string }[] = Object.entries(
    locales_json,
).map(([key, locale]) => ({
    label: locale.name as string,
    value: key,
}));

export default function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params);
    const t = useTranslations("HomePage");
    return (
        <Fragment>
            <header>
                <ThemeSwitch />
                <FlagSelectMenu
                    options={correctedLocale}
                    selectedOption={locale}
                />
            </header>
            <main>
                <Bar />
                <div className="page-container">
                    <h1 className="h1-primary">{t("title")}</h1>
                    <section>
                        {t.rich("introduction", {
                            link: (chunks) => (
                                <a
                                    className="inline-link"
                                    href="https://www.ec-lyon.fr/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {chunks}
                                </a>
                            ),
                        })}
                    </section>
                    <h2 className="h2-primary">{t("study")}</h2>
                </div>
            </main>
            <Footer />
        </Fragment>
    );
}
