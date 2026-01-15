"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { base_path } from "@/data/env";
import data from "@/data/personal_data.json";

import Contact from "./personal/contact";

export default function Bar() {
    const t = useTranslations("Bar");

    return (
        <div className="bar-container">
            <Image
                src={base_path + "photo.jpg"}
                alt={t("alt-profile-picture")}
                className="img-profile"
                width={516}
                height={516}
            />
            <h2 className="h2-primary text-center">
                {data.prenom + " " + data.nom}
            </h2>
            <Contact>
                <li>{t("student") + data.job}</li>
            </Contact>
        </div>
    );
}
