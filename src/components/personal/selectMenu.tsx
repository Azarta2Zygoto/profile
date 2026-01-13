import { useTranslations } from "next-intl";
import { JSX, useState } from "react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface SelectMenuProps {
    id?: string;
    options: (string | { label: string; value: string | number })[];
    selectedOption: string;
    className?: string;
    style?: React.CSSProperties;
    onSelect: (option: string) => void;
}

export function SelectMenu({
    id,
    options,
    selectedOption,
    onSelect,
    className = "",
    style,
}: SelectMenuProps): JSX.Element {
    const t = useTranslations("DefaultTexts");

    const [isOpen, setIsOpen] = useState(false);

    function handleOptionSelect(option: string) {
        onSelect(option);
        setIsOpen(false);
    }

    return (
        <Popover
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <PopoverTrigger
                className={className + " btn btn-select"}
                id={id}
                onClick={() => setIsOpen(!isOpen)}
                style={style}
            >
                {selectedOption || t("selectAnOption")}
                <i className={`bi bi-caret-${isOpen ? "down" : "up"}-fill`} />
            </PopoverTrigger>
            <PopoverContent className="popover-list">
                <div className="flex flex-col gap-2">
                    {options.map((option, i) => (
                        <button
                            key={i}
                            className={`btn btn-ghost ${
                                selectedOption ===
                                (typeof option === "string"
                                    ? option
                                    : option.label)
                                    ? "btn-selected"
                                    : ""
                            }`}
                            onClick={() =>
                                handleOptionSelect(
                                    typeof option === "string"
                                        ? option
                                        : option.value.toString(),
                                )
                            }
                        >
                            {typeof option === "string" ? option : option.label}
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
