import type { JSX } from "react";

import { IconSVG, type SvgProps } from "@/data/svg";

export function LinkExternal(props: SvgProps): JSX.Element {
    const defaults = {
        height: 14,
        width: 14,
        fill: "currentColor",
        arialLabel: "External Link Icon",
        title: "External Link",
        viewBox: "0 0 16 16",
    };

    return (
        <IconSVG
            {...defaults}
            {...props}
        >
            <path
                fillRule="evenodd"
                d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
            />
            <path
                fillRule="evenodd"
                d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
            />
        </IconSVG>
    );
}
