import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function Header(){
    return (
        <header className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold">Chat AI</h1>
            <HamburgerMenuIcon className="cursor-pointer hover:bg-zinc-800 h-10 w-10 rounded-full p-2 transition"></HamburgerMenuIcon>
        </header>
    )
}