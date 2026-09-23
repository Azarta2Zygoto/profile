import { describe, expect, it } from "vitest";

import { buildAssetPath, isActiveNavLink } from "./path.utils";

describe("isActiveNavLink", () => {
    describe('when route is "/"', () => {
        it("returns true for the root pathname", () => {
            expect(isActiveNavLink("/", "/")).toBe(true);
        });

        it("returns true for a pathname with one segment", () => {
            expect(isActiveNavLink("/fr", "/")).toBe(true);
            expect(isActiveNavLink("/en", "/")).toBe(true);
        });

        it("returns false for a locale followed by a second segment", () => {
            expect(isActiveNavLink("/fr/foo", "/")).toBe(false);
            expect(isActiveNavLink("/en/foo", "/")).toBe(false);
        });

        it("returns false for a non-locale first segment followed by a second segment", () => {
            expect(isActiveNavLink("/foo/bar", "/")).toBe(false);
        });

        it("returns false for a pathname with more than two segments", () => {
            expect(isActiveNavLink("/fr/foo/bar", "/")).toBe(false);
        });

        it("returns false for an unknown locale", () => {
            expect(isActiveNavLink("/xx/foo", "/")).toBe(false);
        });

        it("handles trailing slashes", () => {
            expect(isActiveNavLink("/fr/", "/")).toBe(true);
            expect(isActiveNavLink("/fr/foo/", "/")).toBe(false);
        });
    });

    describe("when route is not /", () => {
        it("returns true when pathname ends with the route", () => {
            expect(isActiveNavLink("/fr/about", "/about")).toBe(true);
            expect(isActiveNavLink("/en/about", "/about")).toBe(true);
        });

        it("returns true when pathname is exactly the route", () => {
            expect(isActiveNavLink("/about", "/about")).toBe(true);
        });

        it("returns false when pathname does not end with the route", () => {
            expect(isActiveNavLink("/fr/contact", "/about")).toBe(false);
        });

        it("works with nested routes", () => {
            expect(isActiveNavLink("/fr/products/details", "/details")).toBe(
                true,
            );
        });

        it("returns false when the route is only a partial suffix", () => {
            expect(isActiveNavLink("/fr/about-us", "/about")).toBe(false);
        });

        it("handles trailing slashes according to endsWith behavior", () => {
            expect(isActiveNavLink("/fr/about/", "/about")).toBe(false);
        });
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
