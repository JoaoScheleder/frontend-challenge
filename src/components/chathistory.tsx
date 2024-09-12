import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import chatHistoryMemory from "@/repositories/ChatHistoryMemory";
import { Chat } from "@/repositories/ChatHistoryRepository";
import { TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export default function ChatHistory(){
     const [chats, setChats] = useState<Chat[]>([]);

    const { toast } = useToast()
    const {t} = useTranslation();

    const createNewChat = () => {
        const new_chat = {
            name: 'Novo Chat',
            createdAt: new Date()
        }
        // create new chat
        chatHistoryMemory.create(new_chat)
        setChats((previous)=>{
            return [...previous, new_chat]
        })

    }

    const getAllChats = () => {
        const chats = chatHistoryMemory.findAll();
        if(chats){
            setChats(chats);
        }
    }

    const deleteChat = (chat : Chat) => {
        chatHistoryMemory.delete(chat.id!);
        toast({
            title: "Deletado",
            description: "Chat deletado!",
          })
        setChats((previous)=>{
            return previous.filter((c)=> c.id !== chat.id);
        })
    }

    useEffect(()=>{
        getAllChats();
    },[chats])


    return (
        <div className="flex flex-col gap-1 p-2 h-full overflow-auto">
            <button onClick={createNewChat} className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600 transition rounded dark:text-white text-black p-2 text-xs mb-2">
                {t('new_chat')}
            </button>

            {
                chats.map((chat, index)=>{
                    return (
                        <div key={index} className="border-l-4 border-blue-700 flex justify-between items-center gap-4 dark:bg-zinc-800 bg-zinc-100 p-2 rounded cursor-pointer dark:hover:bg-zinc-800 hover:bg-zinc-100 transition">
                            <p className="text-sm dark:text-zinc-300 text-zinc-600">{chat.name}</p>
                            <div className="flex items-center gap-1">
                                {/* <Pencil1Icon className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-200 rounded-full h-6 w-6 p-1 transition "></Pencil1Icon> */}
                                <TrashIcon onClick={()=>deleteChat(chat)} className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-200 rounded-full h-6 w-6 p-1 transition"></TrashIcon>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
