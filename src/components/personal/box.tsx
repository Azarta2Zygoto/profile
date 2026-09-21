import { CSSProperties, type ReactNode } from "react";

import color from "@/data/category-color.json";
import { cn } from "@/lib/utils";
import type { ColorScheme } from "@/types/common.types";

interface Props {
    name: string;
    className?: string;
    style?: CSSProperties;
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
