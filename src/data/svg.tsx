import { JSX } from "react";

interface SvgProps {
    height?: string | number;
    width?: string | number;
    fill?: string;
    arialLabel?: string;
}

export function Linkedin({
    height = 24,
    width = 24,
    fill = "#0077B7",
    arialLabel = "LinkedIn Logo",
}: SvgProps): JSX.Element {
    return (
        <svg
            height={height}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            fill={fill}
            role="img"
            arial-label={arialLabel}
        >
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
        </svg>
    );
}

export function Github({
    height = 24,
    width = 24,
    fill = "currentColor",
    arialLabel = "GitHub Logo",
}: SvgProps): JSX.Element {
    return (
        <svg
            height={height}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            fill={fill}
            role="img"
            arial-label={arialLabel}
        >
            <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z" />
        </svg>
    );
}

export function Gmail({
    height = 24,
    width = 24,
    arialLabel = "Gmail Logo",
}: SvgProps): JSX.Element {
    return (
        <svg
            height={height}
            width={width}
            viewBox="0 0 514 514"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            role="img"
            arial-label={arialLabel}
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
        </svg>
    );
}

export function FranceFlag({
    height = 24,
    width = 36,
    arialLabel = "France Flag",
}: SvgProps): JSX.Element {
    return (
        <svg
            height={height}
            width={width}
            viewBox="0 0 3 2"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            role="img"
            arial-label={arialLabel}
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
        </svg>
    );
}

export function UKFlag({
    height = 15,
    width = 30,
    arialLabel = "United Kingdom Flag",
}: SvgProps): JSX.Element {
    return (
        <svg
            height={height}
            width={width}
            viewBox="0 0 60 30"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            role="img"
            arial-label={arialLabel}
        >
            <clipPath id="t">
                <path d="M0,0 v30 h60 v-30 z" />
            </clipPath>
            <g clipPath="url(#t)">
                <path
                    d="M0,0 v30 h60 v-30 z"
                    fill="#012169"
                />
                <path
                    d="M0,0 L60,30 M60,0 L0,30"
                    stroke="#fff"
                    strokeWidth="6"
                />
                <path
                    d="M0,0 L60,30 M60,0 L0,30"
                    stroke="#C8102E"
                    strokeWidth="4"
                />
                <path
                    d="M30,0 v30 M0,15 h60"
                    stroke="#fff"
                    strokeWidth="10"
                />
                <path
                    d="M30,0 v30 M0,15 h60"
                    stroke="#C8102E"
                    strokeWidth="6"
                />
            </g>
        </svg>
    );
}
