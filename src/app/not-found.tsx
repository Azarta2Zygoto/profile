"use client";

import Link from "next/link";

import "./globals.css";

export default function NotFound() {
    return (
        <html lang="fr">
            <body>
                <main className="notfound-main">
                    <h1 className="h1-primary">Page non trouvée</h1>
                    <section>
                        <p>
                            Désolé, la page que vous recherchez n&apos;existe
                            pas ou a été déplacée.
                        </p>
                    </section>
                    <Link
                        href="/"
                        className="btn-text"
                        style={{ marginTop: "1.5rem" }}
                    >
                        Retour à l&apos;accueil
                    </Link>
                </main>
            </body>
        </html>
    );
}
