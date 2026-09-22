import type { ReactNode } from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface SubAccordionItem {
    title: string;
    content: ReactNode;
}

interface Props {
    items: SubAccordionItem | Array<SubAccordionItem>;
}

export default function CustomAccordion({ items }: Readonly<Props>): ReactNode {
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
