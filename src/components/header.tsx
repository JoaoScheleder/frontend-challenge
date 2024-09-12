import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Input from "./input";
import useTranslation from "@/hooks/useTranslation";

export default function Header() {
    const {t} = useTranslation();
    return (
        <header className="flex justify-between items-center p-4 items-center">
            <div className="flex gap-2 items-center">
                <span>&#x1F680;</span>
                <div>
                    <h1 className="text-xl dark:text-zinc-200 text-zinc-700 font-bold">Astro Cat</h1>
                    <p className="font-thin dark:text-zinc-300 text-zinc-500 text-xs">{t("your_virtual_assistant")}</p>
                </div>
            </div>
            <DotsHorizontalIcon></DotsHorizontalIcon>
        </header>
    )
}