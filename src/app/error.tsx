"use client";

import Link from "next/link";
import { useEffect } from "react";

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
        <main className="notfound-main">
            <h1 className="h1-primary">Oups ! Une erreur est survenue</h1>
            <p>Il semble y avoir un problème avec votre demande.</p>
            <div
                className="row m-800-"
                style={{ marginTop: "1.5rem", gap: "1rem" }}
            >
                <button
                    className="btn-text"
                    style={{ width: 175 }}
                    onClick={() => reset()}
                >
                    Réessayer
                </button>
                <Link
                    href="/"
                    style={{ width: 175 }}
                    className="btn-text"
                >
                    Retourner à l&apos;accueil
                </Link>
            </div>
        </main>
    );
}
