import Head from "next/head";
import Link from "next/link";
import { type JSX } from "react";

import "./globals.css";

export default function NotFound(): JSX.Element {
    return (
        <html lang="fr">
            <Head>
                <title>Erreur - Profil</title>
                <meta
                    name="description"
                    content="Page d'erreur 404 du site web faisant office de
                    portfolio"
                />
            </Head>
            <body>
                <main
                    className="error-main"
                    role="main"
                    aria-labelledby="error-title"
                >
                    <h1
                        className="h1-primary"
                        id="error-title"
                    >
                        Page non trouvée
                    </h1>
                    <section>
                        <p>
                            Désolé, la page que vous recherchez n&apos;existe
                            pas ou a été déplacée.
                        </p>
                    </section>
                    <Link
                        href="/"
                        className="btn"
                        style={{ marginTop: "1.5rem" }}
                    >
                        Retour à l&apos;accueil
                    </Link>
                </main>
            </body>
        </html>
    );
}
