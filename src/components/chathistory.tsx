import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

export default function ChatHistory(){
    // CHAT GPT LIKE CHAT HISTORY LIKE BUTTONS WITH TEXT
    return (
        <div className="flex flex-col gap-1 p-2 h-full">
            <button className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600 transition rounded dark:text-white text-black p-2 text-xs mb-2">
                Novo Chat
            </button>
            <div className="border-l-4 border-blue-700 flex justify-between items-center gap-4 dark:bg-zinc-800 bg-zinc-100 p-2 rounded cursor-pointer dark:hover:bg-zinc-800 hover:bg-zinc-100 transition">
                    <p className="text-sm dark:text-zinc-300 text-zinc-600">João Chat 1</p>
                    <div className="flex items-center gap-1">
                        {/* <Pencil1Icon className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-200 rounded-full h-6 w-6 p-1 transition "></Pencil1Icon> */}
                        <TrashIcon className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-200 rounded-full h-6 w-6 p-1 transition"></TrashIcon>
                    </div>
            </div>
        </div>
    )
}