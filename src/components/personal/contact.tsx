"use client";

import { JSX, type ReactNode } from "react";

import data from "@/data/personal_data.json";
import { Github, Gmail, Linkedin } from "@/data/svg";

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
                    href={"mailto:" + data.gmail}
                >
                    <Gmail />
                    {data.gmail}
                </a>
            </li>
        </ul>
    );
}
