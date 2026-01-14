"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { base_path } from "@/data/env";
import data from "@/data/personal_data.json";
import { Github, Gmail, Linkedin } from "@/data/svg";

export default function Bar() {
    const t = useTranslations("Bar");

    return (
        <div className="bar-container">
            <Image
                src={base_path + "photo.jpg"}
                alt={t("alt-profile-picture")}
                className="img-profile"
                width={416}
                height={516}
            />
            <h2
                className="h2-primary"
                style={{ textAlign: "center" }}
            >
                {data.prenom} {data.nom}
            </h2>
            <ul>
                <li>{t("student") + data.job}</li>
                <li className="li-bar">
                    <a
                        className="inline-icon underline-anim"
                        href={data.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Linkedin />
                        LinkedIn
                    </a>
                </li>
                <li className="li-bar">
                    <a
                        className="inline-icon underline-anim"
                        href={data.github}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Github />
                        GitHub
                    </a>
                </li>
                <li className="li-bar">
                    <a
                        className="inline-icon underline-anim"
                        href={"mailto:" + data.gmail}
                    >
                        <Gmail />
                        {data.gmail}
                    </a>
                </li>
            </ul>
        </div>
    );
}
