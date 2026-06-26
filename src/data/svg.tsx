import type { JSX, ReactNode } from "react";

export interface SvgProps {
    height?: string | number;
    width?: string | number;
    fill?: string;
    arialLabel?: string;
    title?: string;
}

interface IconSVGProps extends SvgProps {
    viewBox?: string;
    children: ReactNode;
}

export function IconSVG({
    height,
    width,
    fill,
    arialLabel,
    title,
    children,
    viewBox = "0 0 24 24",
}: IconSVGProps): JSX.Element {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            height={height}
            width={width}
            focusable="false"
            fill={fill}
            role="img"
            arial-label={arialLabel}
        >
            {title && <title>{title}</title>}
            {children}
        </svg>
    );
}
