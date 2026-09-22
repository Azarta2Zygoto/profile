"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";

export interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps): ReactNode {
    const t = useTranslations("ErrorPage");
    const [showDetails, setShowDetails] = useState(false);
    const isDevelopment = process.env.NODE_ENV === "development";

    useEffect(() => {
        if (!isDevelopment) return;

        // Log error with contextual information
        console.error("Error Boundary Caught:", {
            timestamp: new Date().toISOString(),
            digest: error.digest,
            message: error.message,
            stack: error.stack,
            isDev: isDevelopment,
        });
    }, [error, isDevelopment]);

    return (
        <main
            className="error-main"
            aria-labelledby="error-title"
        >
            <h1
                className="h1-primary"
                id="error-title"
            >
                {t("title")}
            </h1>
            <p>{t("description")}</p>

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
                    type="button"
                    className="btn"
                    style={{ width: 200, height: "3rem" }}
                    onClick={() => reset()}
                    aria-label={t("retry-aria")}
                >
                    {t("retry")}
                </button>
                <Link
                    href="/"
                    style={{ width: 200, height: "3rem" }}
                    className="btn"
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
