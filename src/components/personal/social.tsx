import type { ReactNode } from "react";

import { Gmail } from "@/components/icons/gmail";
import data from "@/data/profile-data.json";

import { SOCIAL_MAP } from "./socialMap";

export default function Social(): ReactNode {
    return (
        <ul>
            {data.socials.map((networks) => {
                const social =
                    SOCIAL_MAP[networks.type as keyof typeof SOCIAL_MAP];
                if (!social) return null;

                return (
                    <li
                        key={networks.type}
                        className="li-bar"
                    >
                        <a
                            className="inline-icon underline-anim"
                            href={networks.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <social.icon />
                            {social.label}
                        </a>
                    </li>
                );
            })}
            <li className="li-bar">
                <a
                    className="inline-icon underline-anim"
                    href={`mailto:${data.gmail}`}
                >
                    <Gmail />
                    {data.gmail}
                </a>
            </li>
        </ul>
    );
}
