import { JSX } from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface SubAccordionItem {
    title: string;
    content: JSX.Element;
}

interface AccordionProps {
    items: SubAccordionItem | Array<SubAccordionItem>;
}

export default function ImplementAccordion({
    items,
}: AccordionProps): JSX.Element {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full"
        >
            {Array.isArray(items) ? (
                items.map((item) => (
                    <AccordionItem
                        key={item.title}
                        value={`item-${item.title}`}
                        className="Accordion"
                    >
                        <AccordionTrigger className="open-Accordion">
                            {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="in-Accordion">
                            {item.content}
                        </AccordionContent>
                    </AccordionItem>
                ))
            ) : (
                <AccordionItem
                    value={`item-${items.title}`}
                    className="Accordion"
                >
                    <AccordionTrigger className="open-Accordion">
                        {items.title}
                    </AccordionTrigger>
                    <AccordionContent className="in-Accordion">
                        {items.content}
                    </AccordionContent>
                </AccordionItem>
            )}
        </Accordion>
    );
}
