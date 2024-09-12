"use client";

import ChatHistory from "@/components/chathistory";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Input from "@/components/input";
import Message from "@/components/message";
import { Robocat } from "@/components/robocat";
import { useTheme } from "@/context/themecontext";
import useScreenSize from "@/hooks/useWidth";
import useWidth from "@/hooks/useWidth";
import { Cross1Icon, EnterFullScreenIcon, ExitFullScreenIcon, HamburgerMenuIcon, MoonIcon, PaperPlaneIcon, SunIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [text, setText] = useState('')
  const [animationComplete, setAnimationComplete] = useState(false);
  const [messages, setMessages] = useState<any[]>([

  ])

  const { theme, toggleTheme } = useTheme();
  const {width, height} = useScreenSize();


  useEffect(() => {
    if (messages.length === 0) {
      setAnimationComplete(false);
    }
  }, [messages]);

  // close the navbar if mobile
  useEffect(() => {
    if (width < 1024) {
      setOpen(false);
    }
  }, [width]);

  const handleKeyPress = (event : any) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };


  const sendMessage = () => {
    if (text.trim() !== '') {
      setMessages((previous) => {
        return [...previous, {
          is_mine: true,
          message: text
        }]
      })
      const response = {
        is_mine: false,
        message: 'Olá, tudo bem?'
      }
      setMessages((previous) => {
        return [...previous, response]
      })
      setText('')
    }
  }

  const toggleSidebar = () => {
    setOpen(!open);
  };

  // function that make the screen go full screen
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
        <ChatHistory></ChatHistory>
        <Footer></Footer>
      </motion.div>
      <div className="border-box flex-grow flex flex-col m-2 dark:bg-zinc-800 bg-zinc-100 p-4 rounded-2xl" style={{ minHeight: 'calc(100vh - 1rem)' }}>
        <div className="flex justify-between">

          {open ?
            <Cross1Icon onClick={() => toggleSidebar()} className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-100 h-10 w-10 rounded-full p-2 transition"></Cross1Icon>
            :
            <HamburgerMenuIcon className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-100 h-10 w-10 rounded-full p-2 transition mb-2" onClick={() => toggleSidebar()}></HamburgerMenuIcon>
          }

          <div className="flex">
            {
              fullscreen ?
                <ExitFullScreenIcon className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-100 h-10 w-10 rounded-full p-2 transition mb-2" onClick={exitFullScreen}></ExitFullScreenIcon> :
                <EnterFullScreenIcon className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-100 h-10 w-10 rounded-full p-2 transition mb-2" onClick={enterFullScreen}></EnterFullScreenIcon>
            }
            {theme === 'dark' ?
              <MoonIcon className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-100 h-10 w-10 rounded-full p-2 transition mb-2" onClick={toggleTheme} /> :
              <SunIcon className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-100 h-10 w-10 rounded-full p-2 transition mb-2" onClick={toggleTheme} />}
          </div>
        </div>
        <div className="overflow-auto flex-grow">
        {!animationComplete && (
        <motion.div
          className="mx-auto w-fit"
          initial="visible"
          animate={messages.length === 0 ? "visible" : "hidden"}
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
            if (messages.length !== 0) {
              setAnimationComplete(true);
            }
          }}
        >
          <Robocat className="w-72 h-72" />
          <p className="dark:text-white text-black text-sm p-4 rounded-2xl text-center dark:bg-green-600 bg-green-100">
            Oii, sou o Astro Cat, como posso te ajudar?
          </p>
        </motion.div>
      )}
{animationComplete && messages.length > 0 && (
        messages.map((message : any, index) => (
          
            <div key={index} className="flex flex-start">
              <Message is_mine={message.is_mine} message={message.message} />
            </div>

        ))
      )}
        </div>
        <div className="flex gap-1 items-center">
          <Input onChange={setText} onKeyPress={handleKeyPress} placeholder="Mande sua mensagem..." value={text} type="text"></Input>
          <button >
            <PaperPlaneIcon onClick={sendMessage} className="dark:text-zinc-100 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-zinc-100 h-10 w-10 rounded-full p-2 transition mb-2"></PaperPlaneIcon>
          </button>
        </div>
      </div>
    </div>
  );
}