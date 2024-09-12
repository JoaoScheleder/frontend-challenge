"use client";

import ChatList from "@/components/chatList";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Input from "@/components/input";
import InteractiveChat from "@/components/InteractiveChat";
import LanguageSelector from "@/components/languageSelector";
import Message from "@/components/message";
import { Robocat } from "@/components/robocat";
import { useTheme } from "@/context/themecontext";
import useTranslation from "@/hooks/useTranslation";
import useScreenSize from "@/hooks/useWidth";
import useWidth from "@/hooks/useWidth";
import chatMemory from "@/repositories/ChatMemory";
import { Chat, Messages } from "@/repositories/ChatRepository";
import { Cross1Icon, EnterFullScreenIcon, ExitFullScreenIcon, HamburgerMenuIcon, MoonIcon, PaperPlaneIcon, SpeakerLoudIcon, SunIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { use, useEffect, useState } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function Home() {
  const [open, setOpen] = useState(true);
  const { width, height } = useScreenSize();
  const [text, setText] = useState('')
  const [currentChat, setCurrentChat] = useState<Chat>({
    name: 'Chat',
    messages: []
});
const setChatAndMessages = (chat: Chat) => {
  setCurrentChat(chatMemory.findById(chat.id!)!);
}

  const toggleSidebar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (width < 1024) {
      setOpen(false);
    }
  }, [width]);

  return (
    <div className="max-h-screen min-h-full flex  overflow-hidden">
      <motion.div
        className={"overflow-auto flex justify-between flex-col flex-shrink-0"}
        animate={{
          width: (open ? "300px" : "0px"),
          opacity: open ? 1 : 0,
          overflow: "hidden",
        }}
        transition={{
          opacity: { duration: 0.05, delay: open ? 0.2 : 0 },
          width: { duration: 0.3 },
        }}
      >
        <Header></Header>
        <ChatList onDelete={() => setText('')} selectedChat={currentChat} onSelectedChat={setChatAndMessages}></ChatList>
        <Footer></Footer>
      </motion.div>
      <InteractiveChat open={open} toggleSideBar={toggleSidebar} text={text} setText={setText} currentChat={currentChat} setCurrentChat={setCurrentChat}></InteractiveChat>
    </div>
      );
}