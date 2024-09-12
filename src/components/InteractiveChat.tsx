import { Cross1Icon, HamburgerMenuIcon, ExitFullScreenIcon, EnterFullScreenIcon, PaperPlaneIcon, SpeakerLoudIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { MoonIcon, SunIcon } from "lucide-react";
import Input from "@/components/input";
import Message from "./message";
import { Robocat } from "./robocat";
import { use, useEffect, useState } from "react";
import { useTheme } from "@/context/themecontext";
import { Chat, Messages } from "@/repositories/ChatRepository";
import chatMemory from "@/repositories/ChatMemory";
import useTranslation from "@/hooks/useTranslation";

export default function InteractiveChat(
    {open, toggleSideBar, 
    text, setText,
        currentChat, setCurrentChat
}: {
        open : boolean,  toggleSideBar : () => void, 
        text: string, setText: (value: string) => void
        currentChat : Chat,
        setCurrentChat : (chat: any) => void
    }) {
    const [animationComplete, setAnimationComplete] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);


    const {t} = useTranslation();
    const { theme, toggleTheme } = useTheme();


    const enterFullScreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            setFullscreen(true)
            elem.requestFullscreen();
        }
    }

    const exitFullScreen = () => {
        if (document.exitFullscreen) {
            setFullscreen(true)
            document.exitFullscreen();
        }
    }

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            sendMessage(text);
        }
    };

    useEffect(() => {
        console.log(currentChat);
        if (!currentChat) {
            setAnimationComplete(false);
            const chats = chatMemory.findAll();
            if (chats && chats.length > 0) {
                setCurrentChat(chats[0]);
                return
            }
            setCurrentChat({
                name: 'Chat',
                messages: []
            })
            return
        }
        if (currentChat.id && !currentChat.messages.length) {
            setAnimationComplete(false);
            sendMessage(text);
        }
    }, [currentChat]); // Runs when currentChat changes

    const sendMessage = (message: string) => {
        if (!currentChat?.id) {
            const id = chatMemory.create({
                name: 'Novo Chat',
                messages: []
            });
            const newChat = chatMemory.findById(id)!;
            setCurrentChat(newChat);
        } else {
            // If chat already exists and no messages, send the message directly
            sendMessageAfterChatCreated(message);
        }
    };

    const sendMessageAfterChatCreated = (message: string) => {
        if (message && message.trim() !== '') {
            const client_message: Messages = {
                is_mine: true,
                message: message,
                user: "João Gabriel Scheleder",
                createdAt: new Date().toLocaleDateString('pt-br') + ' ' + new Date().toLocaleTimeString('pt-br'),
            };
            const response: Messages = {
                is_mine: false,
                message: 'Olá, tudo bem?',
                user: 'Robocat',
                createdAt: new Date().toLocaleDateString('pt-br') + ' ' + new Date().toLocaleTimeString('pt-br'),
            };

            // Update currentChat state with new messages
            setCurrentChat((previous: Chat) => {
                if (previous) {
                    const updatedMessages = [...previous.messages, client_message, response];
                    return { ...previous, messages: updatedMessages };
                }
                return {
                    ...currentChat,
                    messages: [client_message, response]
                };
            });

            chatMemory.update({
                ...currentChat,
                messages: [...currentChat.messages, client_message, response]
            })


            // Clear input field
            setText('');
        }
    };



    const startSpeechRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'pt-BR';
        recognition.interimResults = false;
        recognition.continuous = false;
        recognition.onstart = () => {
            setIsRecording(true);
        };
        recognition.start();
        recognition.onresult = (event: { results: { transcript: any; }[][]; }) => {
            const speechToText = event.results[0][0].transcript;
            console.log(speechToText);
            setText(speechToText);
            setIsRecording(false);
            sendMessage(speechToText); // Pass the recognized text directly to sendMessage
        };
    };

    return (
        <div className="border-box flex-grow flex flex-col m-2 dark:bg-zinc-800 bg-zinc-100 p-4 rounded-2xl" style={{ minHeight: 'calc(100vh - 1rem)' }}>
            <div className="relative flex justify-between items-center">
                <div className="flex items-center">
                    {open ?
                        <Cross1Icon onClick={() => toggleSideBar()} className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-100 h-10 w-10 rounded-full p-2 transition"></Cross1Icon>
                        :
                        <HamburgerMenuIcon className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-100 h-10 w-10 rounded-full p-2 transition " onClick={() => toggleSideBar()}></HamburgerMenuIcon>
                    }

                    <h1 className="dark:text-zinc-100 text-zinc-700 text-base sm:text-xl lg:text-2xl font-bold lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">{currentChat?.name}</h1>
                </div>

                <div className="flex">
                    {
                        fullscreen ?
                            <ExitFullScreenIcon className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-100 h-10 w-10 rounded-full p-2 transition " onClick={exitFullScreen}></ExitFullScreenIcon> :
                            <EnterFullScreenIcon className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-100 h-10 w-10 rounded-full p-2 transition" onClick={enterFullScreen}></EnterFullScreenIcon>
                    }
                    {theme === 'dark' ?
                        <MoonIcon className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-100 h-10 w-10 rounded-full p-2 transition " onClick={toggleTheme} /> :
                        <SunIcon className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-100 h-10 w-10 rounded-full p-2 transition" onClick={toggleTheme} />}
                </div>
            </div>
            <div className="overflow-auto flex-grow">
                {!animationComplete && (
                    <motion.div
                        className="mx-auto w-fit mt-8"
                        initial="visible"
                        animate={currentChat?.messages.length === 0 ? "visible" : "hidden"}
                        variants={{
                            visible: { opacity: 1, scale: 1, display: 'block' },
                            hidden: { opacity: 0, scale: 0, transitionEnd: { display: 'none' } }
                        }}
                        transition={{
                            opacity: { duration: 0.2, delay: open ? 0.2 : 0 },
                            scale: { duration: 0.2, delay: open ? 0.2 : 0 },
                            display: { delay: 0.2 }
                        }}
                        onAnimationComplete={() => {
                            if (currentChat?.messages.length !== 0) {
                                setAnimationComplete(true);
                            }
                        }}
                    >
                        <Robocat className="w-72 h-72" />
                        <p className="dark:text-white text-black text-sm p-4 rounded-2xl text-center dark:bg-green-600 bg-green-100">
                            {t('welcome_message')}
                        </p>
                    </motion.div>
                )}
                {animationComplete && currentChat && currentChat?.messages.length > 0 && (
                    currentChat.messages.map((message: any, index) => (

                        <div key={index} className="flex flex-start">
                            <Message is_mine={message.is_mine} message={message.message} />
                        </div>

                    ))
                )}
            </div>
            <div className="flex gap-1 items-center">
                <Input onChange={setText} onKeyPress={handleKeyPress} placeholder="Mande sua mensagem..." value={text} type="text"></Input>
                <button >
                    <PaperPlaneIcon onClick={() => sendMessage(text)} className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-100 h-10 w-10 rounded-full p-2 transition mb-2"></PaperPlaneIcon>
                </button>
                <button>
                    <SpeakerLoudIcon onClick={startSpeechRecognition} className={"dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-100 h-10 w-10 rounded-full p-2 transition mb-2" + (isRecording ? ' bg-red-500 hover:bg-red-700' : '')}></SpeakerLoudIcon>
                </button>
            </div>
        </div>
    )
}