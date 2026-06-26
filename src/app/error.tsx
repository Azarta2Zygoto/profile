"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";

import "./globals.css";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}): ReactNode {
    const [showDetails, setShowDetails] = useState(false);
    const isDevelopment = process.env.NODE_ENV === "development";

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
        <html lang="fr">
            <body>
                <main
                    className="error-main"
                    aria-labelledby="error-title"
                >
                    <h1
                        className="h1-primary"
                        id="error-title"
                    >
                        Oups ! Une erreur est survenue
                    </h1>
                    <p>
                        Il semble y avoir un problème avec votre demande. Merci
                        de réessayer ou de revenir au menu.
                    </p>

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
                                setShowDetails(
                                    (e.target as HTMLDetailsElement).open,
                                )
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
                                    <code>
                                        {error.message || "Unknown error"}
                                    </code>
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
                                                backgroundColor:
                                                    "var(--hover-bg)",
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
                            aria-label="Recharger la page pour réessayer"
                        >
                            Réessayer
                        </button>
                        <Link
                            href="/"
                            style={{ width: 200, height: "3rem" }}
                            className="btn"
                            aria-label="Retourner à l'accueil"
                        >
                            Accueil
                        </Link>
                    </div>

                    <p
                        style={{
                            marginTop: "2rem",
                        }}
                    >
                        Si le problème persiste, veuillez contacter le support
                        ou essayer de vider le cache de votre navigateur.
                    </p>
                </main>
            </body>
        </html>
    );
}
