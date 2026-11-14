import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import generateSubMetadata from "@/components/app/subMetadata";
import { PATH } from "@/types/common.constant";
import type { AsyncLocaleProps } from "@/types/common.type";

export async function generateMetadata(
    props: Readonly<AsyncLocaleProps>,
): Promise<Metadata> {
    const { locale } = await props.params;
    return generateSubMetadata(locale, PATH.study);
}

export default function StudyLayout({ children }: Readonly<PropsWithChildren>) {
    return children;
}
