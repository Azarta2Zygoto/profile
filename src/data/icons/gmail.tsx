import type { JSX } from "react";

import { IconSVG, type SvgProps } from "@/data/svg";

export function Gmail(props: SvgProps): JSX.Element {
    const defaults = {
        height: 24,
        width: 24,
        arialLabel: "Gmail Logo",
        title: "Gmail",
        viewBox: "0 0 514 514",
    };

    return (
        <IconSVG
            {...defaults}
            {...props}
        >
            <path
                d="M158 391v-142l-82-63V361q0 30 30 30"
                fill="#4285f4"
            />
            <path
                d="M 154 248l102 77l102-77v-98l-102 77l-102-77"
                fill="#ea4335"
            />
            <path
                d="M354 391v-142l82-63V361q0 30-30 30"
                fill="#34a853"
            />
            <path
                d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26"
                fill="#c5221f"
            />
            <path
                d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26"
                fill="#fbbc04"
            />
        </IconSVG>
    );
}
