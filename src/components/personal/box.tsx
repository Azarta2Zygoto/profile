import { JSX } from "react";

import color from "@/data/language-color.json";
import type { ColorScheme } from "@/data/types";

interface BoxProps {
    name: string;
    primary?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export default function Box({
    name,
    primary = true,
    className,
    style,
}: BoxProps): JSX.Element {
    const langColor = (color as { [key: string]: ColorScheme })[name];
    return (
        <span
            className={`box ${className ? className : ""}`}
            style={{
                ...style,
                backgroundColor:
                    langColor && langColor.background
                        ? primary
                            ? langColor.background
                            : langColor.background + "a0"
                        : "#ececec",
                color:
                    langColor && langColor.color ? langColor.color : "#000000",
            }}
        >
            {name}
        </span>
    );
}
