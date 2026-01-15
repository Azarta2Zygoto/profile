"use client";

import { useTranslations } from "next-intl";
import { JSX } from "react";

import Contact from "./personal/contact";

export default function Footer(): JSX.Element {
    const t = useTranslations("Footer");
    return (
        <footer
            className="footer-container"
            role="contentinfo"
        >
            <div className="contact">
                <p>{t("contact-me")}</p>
                <Contact />
            </div>
            {t("copyright")}
        </footer>
    );
}
