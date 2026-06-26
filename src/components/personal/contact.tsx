import { JSX, type ReactNode } from "react";

import { Github } from "@/data/icons/github";
import { Gmail } from "@/data/icons/gmail";
import { Linkedin } from "@/data/icons/linkedin";
import data from "@/data/profile-data.json";

interface ContactProps {
    children?: ReactNode;
}

export default function Contact({ children }: ContactProps): JSX.Element {
    return (
        <ul>
            {children}
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
                    href={`mailto:${data.gmail}`}
                >
                    <Gmail />
                    {data.gmail}
                </a>
            </li>
        </ul>
    );
}
