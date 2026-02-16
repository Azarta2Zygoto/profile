"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { node_env } from "@/data/env";
import { Link } from "@/i18n/navigation";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const t = useTranslations("ErrorPage");

    const [showDetails, setShowDetails] = useState(false);
    const isDevelopment = node_env === "development";

    useEffect(() => {
        // Log error with contextual information
        const errorContext = {
            timestamp: new Date().toISOString(),
            digest: error.digest,
            message: error.message,
            stack: error.stack,
            isDev: isDevelopment,
        };
        if (isDevelopment)
            console.error("Error Boundary Caught:", errorContext);
    }, [error, isDevelopment]);

    return (
        <main
            className="error-main"
            role="main"
            aria-labelledby="error-title"
        >
            <h1
                className="h1-primary"
                id="error-title"
            >
                {t("title")}
            </h1>
            <p>{t("description")}</p>

            {/* Error details (development only) */}
            {isDevelopment && (
                <details
                    style={{
                        marginBottom: "2rem",
                        padding: "1rem",
                        borderRadius: "8px",
                        backgroundColor: "var(--selected-bg)",
                        textAlign: "left",
                        maxWidth: "600px",
                        margin: "1rem auto 2rem",
                    }}
                    open={showDetails}
                    onToggle={(e) =>
                        setShowDetails((e.target as HTMLDetailsElement).open)
                    }
                >
                    <summary
                        style={{
                            cursor: "pointer",
                            fontWeight: "600",
                            padding: "0.5rem",
                            userSelect: "none",
                        }}
                    >
                        📋 Error Details (Development Only)
                    </summary>
                    <div
                        style={{
                            marginTop: "1rem",
                            fontFamily: "monospace",
                            fontSize: "0.85rem",
                            overflowX: "auto",
                        }}
                    >
                        {error.digest && (
                            <p>
                                <strong>Digest :</strong>{" "}
                                <code>{error.digest}</code>
                            </p>
                        )}
                        <p>
                            <strong>Message:</strong>{" "}
                            <code>{error.message || "Unknown error"}</code>
                        </p>
                        {error.stack && (
                            <details
                                style={{ marginTop: "0.5rem" }}
                                open={false}
                            >
                                <summary style={{ cursor: "pointer" }}>
                                    Stack Trace
                                </summary>
                                <pre
                                    style={{
                                        marginTop: "0.5rem",
                                        padding: "0.5rem",
                                        backgroundColor: "var(--hover-bg)",
                                        borderRadius: "4px",
                                        overflow: "auto",
                                    }}
                                >
                                    {error.stack}
                                </pre>
                            </details>
                        )}
                    </div>
                </details>
            )}

            <div
                className="rows"
                style={{
                    marginTop: "1.5rem",
                    gap: "1rem",
                    justifyContent: "center",
                }}
            >
                <button
                    className="btn"
                    style={{ minWidth: "150px", padding: "0.75rem 1.5rem" }}
                    onClick={() => reset()}
                    aria-label={t("retry-aria")}
                >
                    {t("retry")}
                </button>
                <Link
                    href="/"
                    className="btn"
                    style={{ minWidth: "150px", padding: "0.75rem 1.5rem" }}
                    aria-label={t("back-to-home")}
                >
                    {t("back-to-home")}
                </Link>
            </div>

            <p
                style={{
                    marginTop: "2rem",
                }}
            >
                {t("advise")}
            </p>
        </main>
    );
}
