import type { ReactNode } from "react";

import { IconSVG, type SvgProps } from "@/components/svg";

const defaults = {
    height: 28,
    width: 28,
    fill: "currentColor",
    ariaLabel: "Link Icon",
    title: "Link",
    viewBox: "0 0 16 16",
};

export function Link45deg(props: SvgProps): ReactNode {
    return (
        <IconSVG
            {...defaults}
            {...props}
        >
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
        </IconSVG>
    );
}
