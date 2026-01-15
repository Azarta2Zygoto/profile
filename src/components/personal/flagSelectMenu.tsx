"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX, useState } from "react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { FranceFlag, UKFlag } from "@/data/svg";

interface FlagSelectMenuProps {
    options: (string | { label: string; value: string | number })[];
    selectedOption: string;
}

export default function FlagSelectMenu({
    options,
    selectedOption,
}: FlagSelectMenuProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Popover
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <PopoverTrigger
                className="btn btn-select"
                id="locale-select-menu"
                onClick={() => setIsOpen(!isOpen)}
                style={{ height: "40px" }}
            >
                {chooseFlag(selectedOption)}
                <i className={`bi bi-caret-${isOpen ? "down" : "up"}-fill`} />
            </PopoverTrigger>
            <PopoverContent className="select-menu-options">
                {options.map((option, i) => (
                    <Link
                        key={i}
                        href={`/${typeof option === "string" ? option : option.value}/${pathname.split("/").slice(2).join("/")}`}
                        className={`btn btn-ghost ${
                            selectedOption ===
                            (typeof option === "string"
                                ? option
                                : option.value.toString())
                                ? "btn-selected"
                                : ""
                        }`}
                    >
                        {chooseFlag(
                            typeof option === "string"
                                ? option
                                : option.value.toString(),
                        )}
                        {typeof option === "string" ? option : option.label}
                    </Link>
                ))}
            </PopoverContent>
        </Popover>
    );
}

function chooseFlag(countryCode: string): JSX.Element {
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
            return <></>;
    }
}
