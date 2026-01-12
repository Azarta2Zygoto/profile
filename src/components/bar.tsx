"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import data from "@/data/data.json";
import { Github, Gmail, Linkedin } from "@/data/svg";

export default function Bar() {
    const t = useTranslations("Bar");

    return (
        <div className="bar-container">
            <Image
                src="photo.jpg"
                alt={t("alt-profile-picture")}
                className="img-profile"
                width={416}
                height={516}
            />
            <h2 className="h2-primary">
                {data.prenom} {data.nom}
            </h2>
            <ul>
                <li>
                    <a
                        className="inline-icon"
                        href={data.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Linkedin />
                        LinkedIn
                    </a>
                </li>
                <li style={{ marginTop: "0.5rem" }}>
                    <a
                        className="inline-icon"
                        href={data.github}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Github />
                        GitHub
                    </a>
                </li>
                <li
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    <a
                        className="inline-icon"
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
