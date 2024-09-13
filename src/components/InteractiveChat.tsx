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
import geminiAIService from "@/services/GeminiAIService";


export default function InteractiveChat({ open, toggleSideBar, text, setText, currentChat, setCurrentChat }: {
    open: boolean, toggleSideBar: () => void,
    text: string, setText: (value: string) => void
    currentChat: Chat,
    setCurrentChat: (chat: any) => void
}) {
    const [animationComplete, setAnimationComplete] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);

    const { t } = useTranslation();
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

    const createChatAndSendMessage = async (message: string) => {
        const id = chatMemory.create({
            name: 'Novo Chat',
            messages: []
        });
        const newChat = chatMemory.findById(id)!;
        setCurrentChat(newChat);
        await sendMessageAfterChatCreated(message);
    }

    const sendMessage = async (message: string) => {
        if (!currentChat?.id) {
            createChatAndSendMessage(message)
            return
        }
        await sendMessageAfterChatCreated(message);
    };
    useEffect(() => {
        if (currentChat.messages.length === 0) {
            setAnimationComplete(false);
        }
        console.log(currentChat, chatMemory)
    }, [currentChat])

    const sendMessageAfterChatCreated = async (message: string) => {
        if (message && message.trim() !== '') {
            setCurrentChat((previous: Chat) => {
                const client_message: Messages = {
                    is_mine: true,
                    message: message,
                    user: "João Gabriel Scheleder",
                    createdAt: new Date().toLocaleDateString('pt-br') + ' ' + new Date().toLocaleTimeString('pt-br'),
                };
                setText('');
                const response: Messages = {
                    is_mine: false,
                    message: '',
                    user: 'Robocat',
                    createdAt: new Date().toLocaleDateString('pt-br') + ' ' + new Date().toLocaleTimeString('pt-br'),
                };
                const updatedMessages = [...previous.messages, client_message, response];
                chatMemory.update({ ...previous, messages: updatedMessages });
                return { ...previous, messages: updatedMessages };
            });
            geminiAIService.listenForMessages(
                message,
                (newMessageChunk) => {
                    setCurrentChat((previous: Chat) => {
                        if (previous && previous.messages.length > 0) {
                            const updatedMessages = [...previous.messages];
                            const lastMessage = { ...updatedMessages[updatedMessages.length - 1] };
                            lastMessage.message += newMessageChunk;
                            updatedMessages[updatedMessages.length - 1] = lastMessage;
                            chatMemory.update({ ...previous, messages: updatedMessages });
                            return { ...previous, messages: updatedMessages };
                        }
                        return previous;
                    });
                },
                (error) => {
                    console.error('Error receiving messages:', error);
                }
            );
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
                        }}>
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
                <Input onChange={setText} onKeyPress={handleKeyPress} placeholder={t("send_your_message")} value={text} type="text"></Input>
                <button >
                    <PaperPlaneIcon onClick={() => sendMessage(text)} className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-100 h-10 w-10 rounded-full p-2 transition mb-2"></PaperPlaneIcon>
                </button>
                <button>
                    <svg
                        onClick={startSpeechRecognition}
                        className={"dark:fill-zinc-100 fill-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-100 h-10 w-10 rounded-full p-2 transition mb-2" + (isRecording ? ' bg-red-500 hover:bg-red-700' : '')}
                        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5 6.5C3.77614 6.5 4 6.72386 4 7V8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8V7C12 6.72386 12.2239 6.5 12.5 6.5C12.7761 6.5 13 6.72386 13 7V8C13 10.5927 11.0267 12.7245 8.5 12.9753V15H11.5C11.7761 15 12 15.2239 12 15.5C12 15.7761 11.7761 16 11.5 16H4.5C4.22386 16 4 15.7761 4 15.5C4 15.2239 4.22386 15 4.5 15H7.5V12.9753C4.97334 12.7245 3 10.5927 3 8V7C3 6.72386 3.22386 6.5 3.5 6.5Z"  />
                        <path d="M10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8V3C6 1.89543 6.89543 1 8 1C9.10457 1 10 1.89543 10 3V8ZM8 0C6.34315 0 5 1.34315 5 3V8C5 9.65685 6.34315 11 8 11C9.65685 11 11 9.65685 11 8V3C11 1.34315 9.65685 0 8 0Z"/>
                    </svg>

                </button>
            </div>
        </div>
    )
}