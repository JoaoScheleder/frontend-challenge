import { RocketIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";
import { Robocat } from "./robocat";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';

import styles from './message.module.css'

export default function Message({ message, is_mine = false }: Readonly<{ message: string, is_mine: boolean }>) {
    return (
        <motion.div
            className={"flex gap-4 mb-2 max-w-[60%] min-w-[300px]" + (is_mine ? ' float-right' : '')}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            <div className={"flex gap-4 bg-zinc-700/50 px-8 py-6 rounded-2xl mb-2" + (is_mine ? ' dark:bg-blue-700 bg-blue-500' : '')}>
                {is_mine ?
                    <Avatar className="w-12 h-12 mt-4">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                     :
                    <div className="w-12 h-12 mt-4 bg-zinc-700 rounded-full">
                        <Robocat className="w-12 h-12 mr-2 transition-transform" />
                    </div>
                }

                <div className="flex flex-col">
                    {/* <div className="flex gap-4"> */}
                    <p className="text-sm font-bold">
                        {
                            is_mine ? "Você" : "Astro Cat"
                        }
                    </p>
                    <p className="text-zinc-300 text-sm mb-2">
                        {new Date().toLocaleDateString('pt-br') + ' ' + new Date().toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {/* </div> */}
                    <div className={"text-base text-zinc-100 markdown-container" + " " + styles.reactmarkdown}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}