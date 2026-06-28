"use client";

import { useTranslations } from "next-intl";
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

interface FlagSelectMenuProps {
    options: { label: string; value: string }[];
    selectedOption: string;
}

export default function FlagSelectMenu({
    options,
    selectedOption,
}: FlagSelectMenuProps): ReactNode {
    const t = useTranslations("DefaultTexts");
    const pathname = usePathname();

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
                {chooseFlag(selectedOption)}
                <ChevronDownIcon
                    className={`pointer-events-none size-4 translate-y-0.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    style={{ marginBottom: "4px" }}
                />
            </PopoverTrigger>
            <PopoverContent className="select-menu-options">
                {options.map((option) => (
                    <Link
                        key={option.value}
                        href={pathname}
                        locale={option.value}
                        className={`btn btn-option ${
                            selectedOption === option.value
                                ? "btn-option-selected"
                                : ""
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
