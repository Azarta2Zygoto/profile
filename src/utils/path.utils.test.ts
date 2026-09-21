import { describe, expect, it } from "vitest";

import { buildAssetPath, buildLocalePath, isActiveNavLink } from "./path.utils";

describe("buildLocalePath", () => {
    it("construit un chemin avec une route", () => {
        expect(buildLocalePath("en", "/projects")).toBe("/en/projects");
    });

    it("fonctionne avec une autre locale", () => {
        expect(buildLocalePath("fr", "/study")).toBe("/fr/study");
    });

    it("supprime le slash au début de la route", () => {
        expect(buildLocalePath("en", "projects")).toBe("/en/projects");
    });

    it("supprime le slash à la fin de la route", () => {
        expect(buildLocalePath("en", "/projects/")).toBe("/en/projects");
    });

    it("supprime les slashs au début et à la fin", () => {
        expect(buildLocalePath("en", "/projects/")).toBe("/en/projects");
    });

    it("retourne la locale seule pour une route vide", () => {
        expect(buildLocalePath("en", "")).toBe("/en");
    });

    it("retourne la locale seule pour une route '/'", () => {
        expect(buildLocalePath("fr", "/")).toBe("/fr");
    });

    it("utilise la route par défaut si elle est omise", () => {
        expect(buildLocalePath("en")).toBe("/en");
    });
});

describe("activeNavLink", () => {
    it("retourne true si le pathname correspond à la route", () => {
        expect(isActiveNavLink("/en/projects", "en", "/projects")).toBe(true);
    });

    it("retourne false si le pathname ne correspond pas", () => {
        expect(isActiveNavLink("/en/studies", "en", "/projects")).toBe(false);
    });

    it("retourne true avec une route sans slash initial", () => {
        expect(isActiveNavLink("/en/projects", "en", "projects")).toBe(true);
    });

    it("retourne true pour la racine avec une route vide", () => {
        expect(isActiveNavLink("/en", "en", "")).toBe(true);
    });

    it("retourne false si la locale est différente", () => {
        expect(isActiveNavLink("/fr/projects", "en", "/projects")).toBe(false);
    });

    it("retourne false si le pathname contient un slash final", () => {
        expect(isActiveNavLink("/en/projects/", "en", "/projects")).toBe(false);
    });

    it("retourne false si le pathname contient une route supplémentaire", () => {
        expect(isActiveNavLink("/en/projects/details", "en", "/projects")).toBe(
            false,
        );
    });

    it("respecte la casse du pathname", () => {
        expect(isActiveNavLink("/en/Projects", "en", "/projects")).toBe(false);
    });
});

describe("buildAssetPath", () => {
    it("construit un chemin avec un basePath", () => {
        expect(buildAssetPath("logo.svg", "/profile/")).toBe(
            "/profile/logo.svg",
        );
    });

    it("fonctionne avec un basePath racine", () => {
        expect(buildAssetPath("photo.jpg", "/")).toBe("/photo.jpg");
    });

    it("fonctionne avec un basePath vide", () => {
        expect(buildAssetPath("logo.svg", "")).toBe("logo.svg");
    });

    it("concatène les chemins sans ajouter de slash", () => {
        expect(buildAssetPath("logo.svg", "/profile")).toBe("/profilelogo.svg");
    });

    it("fonctionne avec un asset dans un sous-dossier", () => {
        expect(buildAssetPath("images/photo.jpg", "/assets/")).toBe(
            "/assets/images/photo.jpg",
        );
    });
});
