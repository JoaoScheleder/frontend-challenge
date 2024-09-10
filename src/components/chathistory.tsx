export default function ChatHistory(){
    // CHAT GPT LIKE CHAT HISTORY LIKE BUTTONS WITH TEXT
    return (
        <div className="flex flex-col gap-1 p-2 h-full">
            <div className="flex gap-4 bg-zinc-700/50 p-2 rounded cursor-pointer hover:bg-zinc-800 transition">
                    <p className="text-base">João Chat 1</p>
            </div>
            <div className="flex gap-4 p-2 rounded cursor-pointer  hover:bg-zinc-800 transition">
                    <p className="text-base">João Chat 2</p>
            </div>
            <div className="flex gap-4  p-2 rounded cursor-pointer  hover:bg-zinc-800 transition">
                    <p className="text-base">João Chat 3</p>
            </div>
            <div className="flex gap-4  p-2 rounded cursor-pointer  hover:bg-zinc-800 transition">
                    <p className="text-base">João Chat 4</p>
            </div>
        </div>
    )
}