import NotFoundPage from "@/components/app/not-found";
import Shell from "@/components/app/shell";
import { routing } from "@/i18n/routing";

export default function NotFound() {
    console.log("root not found rendered", routing);
    return (
        <Shell locale={routing.defaultLocale}>
            <NotFoundPage />
        </Shell>
    );
}
