"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import Contact from "./personal/social";

export default function Footer(): ReactNode {
    const t = useTranslations("Footer");
    return (
        <footer className="footer-container">
            <div className="contact">
                <p>{t("contact-me")}</p>
                <Contact />
            </div>
            {t("copyright")}
        </footer>
    );
}
