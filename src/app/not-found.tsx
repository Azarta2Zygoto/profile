import Link from "next/link";
import { type ReactNode } from "react";

import "./globals.css";

export default function NotFound(): ReactNode {
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
