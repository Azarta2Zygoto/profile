import type { ReactNode } from "react";

export interface SvgProps {
    height?: string | number;
    width?: string | number;
    fill?: string;
    ariaLabel?: string;
    title?: string;
}

interface Props extends SvgProps {
    viewBox?: string;
    children: ReactNode;
}

export function IconSVG({
    height,
    width,
    fill,
    ariaLabel,
    title,
    children,
    viewBox = "0 0 24 24",
}: Readonly<Props>): ReactNode {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            height={height}
            width={width}
            focusable="false"
            fill={fill}
            role="img"
            aria-label={ariaLabel}
        >
            {title && <title>{title}</title>}
            {children}
        </svg>
    );
}
