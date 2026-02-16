import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export default function NotFound() {
    const t = useTranslations("NotFound");

    return (
        <div className="error-main">
            <h1
                className="h1-primary"
                id="error-title"
            >
                {t("title")}
            </h1>
            <section>
                <p>{t("description")}</p>
            </section>
            <Link
                href="/"
                className="btn"
                style={{ marginTop: "1.5rem" }}
                aria-label={t("back-home")}
            >
                {t("back-home")}
            </Link>
        </div>
    );
}
