import HomePage from "@/components/app/page/homePage";
import Shell from "@/components/app/shell";
import { routing } from "@/i18n/routing";

export default function Home() {
    return (
        <Shell locale={routing.defaultLocale}>
            <HomePage locale={routing.defaultLocale} />
        </Shell>
    );
}
