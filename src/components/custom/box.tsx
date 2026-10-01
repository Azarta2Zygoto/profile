import { CSSProperties, type ReactNode } from "react";

import color from "@/data/category-color.json";
import { cn } from "@/lib/utils";

interface Props {
    name: string;
    className?: string;
    style?: CSSProperties;
}

interface ColorScheme {
    background: string;
    color: string;
}

export default function Box({
    name,
    className,
    style,
}: Readonly<Props>): ReactNode {
    const langColor = (color as Record<string, ColorScheme>)[name];
    return (
        <span
            className={cn("box", className)}
            style={{
                ...style,
                backgroundColor:
                    langColor && langColor.background
                        ? langColor.background
                        : "#ececec",
                color:
                    langColor && langColor.color ? langColor.color : "#000000",
            }}
        >
            {name}
        </span>
    );
}
