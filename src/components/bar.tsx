"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import type { ReactNode } from "react";

import { APP_CONFIG } from "@/data/config";
import { ASSETS, buildAssetPath } from "@/data/constants";
import data from "@/data/profile-data.json";

import Contact from "./personal/contact";

/**
 * Bar Component - Sidebar displaying user profile information
 * @returns {ReactNode} A profile sidebar with photo, name, and contact information
 */
export default function Bar(): ReactNode {
    const t = useTranslations("Bar");

    return (
        <div className="bar-container">
            <Image
                src={buildAssetPath(ASSETS.IMAGES.PHOTO, APP_CONFIG.basePath)}
                alt={t("alt-profile-picture")}
                className="img-profile"
                width={516}
                height={516}
            />
            <h2 className="h2-primary text-center">
                {data.firstname + " " + data.lastname}
            </h2>
            <Contact>
                <li>{t("student") + data.job}</li>
            </Contact>
        </div>
    );
}
