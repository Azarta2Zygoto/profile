import type { JSX } from "react";

import { IconSVG, type SvgProps } from "@/data/svg";

export function FranceFlag(props: SvgProps): JSX.Element {
    const defaults = {
        height: 24,
        width: 36,
        arialLabel: "France Flag",
        viewBox: "0 0 3 2",
    };

    return (
        <IconSVG
            {...defaults}
            {...props}
        >
            <rect
                width="1"
                height="2"
                fill="#000091"
            />
            <rect
                x="1"
                width="1"
                height="2"
                fill="#FFF"
            />
            <rect
                x="2"
                width="1"
                height="2"
                fill="#E1000F"
            />
        </IconSVG>
    );
}
