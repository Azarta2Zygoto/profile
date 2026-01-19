"use client";

import Link from "next/link";
import { useEffect } from "react";

import "./globals.css";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <html lang="fr">
            <head>
                <title>Erreur - Profil</title>
                <meta
                    name="description"
                    content="Page d'erreur 404 du site web faisant office de
                    portfolio"
                />
            </head>
            <body>
                <main className="error-main">
                    <h1 className="h1-primary">
                        Oups ! Une erreur est survenue
                    </h1>
                    <p>Il semble y avoir un problème avec votre demande.</p>
                    <div
                        className="rows"
                        style={{ marginTop: "1.5rem", gap: "1rem" }}
                    >
                        <button
                            className="btn"
                            style={{ width: 200, height: "3rem" }}
                            onClick={() => reset()}
                        >
                            Réessayer
                        </button>
                        <Link
                            href="/"
                            style={{ width: 200, height: "3rem" }}
                            className="btn"
                        >
                            Retourner à l&apos;accueil
                        </Link>
                    </div>
                </main>
            </body>
        </html>
    );
}
