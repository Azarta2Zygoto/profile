"use client";

import { type CSSProperties, type ReactNode, useState } from "react";

import { ChevronDownIcon } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { SelectOption } from "@/types/common.types";

interface Props {
    id: string;
    options: SelectOption[];
    selectedOption: SelectOption;
    style?: CSSProperties;
    onSelect: (option: string | number) => void;
}

export default function SelectMenu({
    id,
    options,
    selectedOption,
    style,
    onSelect,
}: Readonly<Props>): ReactNode {
    const [isOpen, setIsOpen] = useState(false);

    function handleSelect(option: string | number) {
        if (option !== selectedOption.value) {
            onSelect(option);
        }
        setIsOpen(false);
    }

    return (
        <Popover
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <PopoverTrigger
                id={id}
                className="btn btn-select"
                style={{ ...style, height: "40px" }}
            >
                {selectedOption.label}
                <ChevronDownIcon
                    className={`pointer-events-none size-4 translate-y-0.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    style={{ marginBottom: "4px" }}
                />
            </PopoverTrigger>
            <PopoverContent className="select-menu-options">
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        className={`btn btn-option ${
                            selectedOption.value === option.value
                                ? "btn-option-selected"
                                : ""
                        }`}
                        onClick={() => handleSelect(option.value)}
                        aria-label={option.label}
                    >
                        {option.label}
                    </button>
                ))}
            </PopoverContent>
        </Popover>
    );
}
