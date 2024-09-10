import { RocketIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Message({ message, is_mine = false }: Readonly<{ message: string, is_mine: boolean }>) {
    return (
        <div className={"flex gap-8 mb-2 max-w-[60%] p-4" + (is_mine ? ' float-right' : '')}>
            {is_mine ?
                <Avatar className="w-16 h-16 mt-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                :
                <div className="w-16 h-16 mt-8 bg-zinc-700 rounded-full">
                    <RocketIcon className="w-16 h-16 p-4"></RocketIcon>
                </div>
            }
            <div className={"flex gap-8 bg-zinc-700/50 px-8 py-6 rounded-2xl" + (is_mine ? ' float-right bg-blue-700' : '')}>

                <div className="flex flex-col">
                    {/* <div className="flex gap-4"> */}
                    <p className="text-sm font-bold">
                        {
                            is_mine ? "Você" : "AI"
                        }
                    </p>
                    <p className="text-zinc-300 text-sm mb-2">
                        {new Date().toLocaleDateString('pt-br') + ' ' + new Date().toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {/* </div> */}
                    <p className="text-base text-zinc-100">{message}</p>
                </div>
            </div>

        </div>
    )
}