import { Cross1Icon } from "@radix-ui/react-icons";

export default function Header({openSidebar, isOpen} : {openSidebar: () => void, isOpen: boolean}) {
    return (
        <header className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold">Chat AI</h1>
            {isOpen &&
                <Cross1Icon onClick={()=>openSidebar()} className="cursor-pointer hover:bg-zinc-800 h-10 w-10 rounded-full p-2 transition"></Cross1Icon>
            }
        </header>
    )
}