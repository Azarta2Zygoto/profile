"use client";

import { useLocale, useTranslations } from "next-intl";
import { type ReactNode, useState } from "react";

import { ChevronDownIcon } from "lucide-react";

import { FranceFlag } from "@/components/icons/france-flag";
import { UKFlag } from "@/components/icons/uk-flag";
import { Website } from "@/components/icons/website";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Link, usePathname } from "@/i18n/navigation";
import { SELECT_LOCALE } from "@/i18n/routing";

export default function FlagSelectMenu(): ReactNode {
    const t = useTranslations("DefaultTexts");
    const pathname = usePathname();
    const locale = useLocale();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popover
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <PopoverTrigger
                className="btn btn-select"
                id="locale-select-menu"
                style={{ height: "40px" }}
                aria-label={t("selectLanguage")}
            >
                {chooseFlag(locale)}
                <ChevronDownIcon
                    className={`pointer-events-none size-4 translate-y-0.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    style={{ marginBottom: "4px" }}
                />
            </PopoverTrigger>
            <PopoverContent className="select-menu-options">
                {SELECT_LOCALE.map((option) => (
                    <Link
                        key={option.value}
                        href={pathname}
                        locale={option.value}
                        className={`btn btn-option ${
                            locale === option.value ? "btn-option-selected" : ""
                        }`}
                        aria-label={option.label}
                    >
                        {chooseFlag(option.value)}
                        {option.label}
                    </Link>
                ))}
            </PopoverContent>
        </Popover>
    );
}

function chooseFlag(countryCode: string): ReactNode {
    switch (countryCode) {
        case "fr":
            return (
                <FranceFlag
                    width={30}
                    height={20}
                />
            );
        case "en":
            return <UKFlag />;
        default:
            return <Website />;
    }
}
