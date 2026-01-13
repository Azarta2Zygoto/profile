import { JSX } from "react";

import color from "@/data/language-color.json";

interface BoxProps {
    name: string;
    primary?: boolean;
}

export default function Box({ name, primary = true }: BoxProps): JSX.Element {
    const langColor = (color as { [key: string]: string })[name];
    return (
        <div
            className="box"
            style={{
                backgroundColor: langColor
                    ? primary
                        ? langColor
                        : langColor + "a0"
                    : "#ececec",
            }}
        >
            {name}
        </div>
    );
}
