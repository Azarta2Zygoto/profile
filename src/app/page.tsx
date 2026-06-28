import Script from "next/script";

export default function RootRedirectPage() {
    return (
        <html lang="fr">
            <head>
                <title>Redirection - Mon Profil</title>
                <Script id="redirect-script">
                    {`
                        var lang = window.navigator.language || window.navigator.userLanguage || "en";
                        var locale = lang.toLowerCase().startsWith("fr") ? "fr" : "en";
                        window.location.replace("/profile/" + locale);
                    `}
                </Script>
            </head>
            <body>
                <p>Redirection...</p>
            </body>
        </html>
    );
}
