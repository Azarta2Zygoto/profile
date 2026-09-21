"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import type { ReactNode } from "react";

import Social from "@/components/personal/social";
import profile from "@/data/profile.json";
import { ASSETS } from "@/types/common.constants";
import { buildAssetPath } from "@/utils/path.utils";

export default function Bar(): ReactNode {
    const t = useTranslations("Bar");

    return (
        <div className="bar-container">
            <Image
                src={buildAssetPath(ASSETS.IMAGES.PHOTO)}
                alt={t("alt-profile-picture")}
                className="img-profile"
                width={128}
                height={128}
            />
            <h2 className="h2-primary">
                {profile.firstname + " " + profile.lastname}
            </h2>
            <p>{t("student") + profile.job}</p>
            <Social />
        </div>
    );
}
