"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import type { ReactNode } from "react";

import { APP_CONFIG } from "@/data/config";
import { ASSETS, buildAssetPath } from "@/data/constants";
import data from "@/data/profile-data.json";

import Social from "./personal/social";

export default function Bar(): ReactNode {
    const t = useTranslations("Bar");

    return (
        <div className="bar-container">
            <Image
                src={buildAssetPath(ASSETS.IMAGES.PHOTO, APP_CONFIG.basePath)}
                alt={t("alt-profile-picture")}
                className="img-profile"
                width={128}
                height={128}
            />
            <h2 className="h2-primary">
                {data.firstname + " " + data.lastname}
            </h2>
            <p>{t("student") + data.job}</p>
            <Social />
        </div>
    );
}
