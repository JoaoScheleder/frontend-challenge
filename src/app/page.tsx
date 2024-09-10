"use client";

import ChatHistory from "@/components/chathistory";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Input from "@/components/input";
import Message from "@/components/message";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(true);
  const toggleSidebar = () => {
    setOpen(!open);
  };
  return (
    <div className="max-h-screen min-h-full flex  overflow-hidden">
        {/* <div className="w-72 overflow-auto flex justify-between flex-col">
          <Header isOpen={open} openSidebar={()=>setOpen}></Header>
          <ChatHistory></ChatHistory>
          <Footer></Footer>
        </div> */}
        <motion.div
          className={"overflow-auto flex justify-between flex-col"}
          animate={{
            width:  (open ? "300px" : "0px"),
            opacity: open ? 1 : 0,
            overflow: "hidden",
          }}
          transition={{
            opacity: { duration: 0.05, delay: open ? 0.2 : 0 },
            width: { duration: 0.3 },
          }}
        >
          <Header isOpen={open} openSidebar={toggleSidebar}></Header>
          <ChatHistory></ChatHistory>
          <Footer></Footer>
        </motion.div>
        <div className="border-box flex-grow flex flex-col m-2 bg-zinc-800 p-4 rounded-2xl" style={{ minHeight: 'calc(100vh - 1rem)' }}>
          <HamburgerMenuIcon className="cursor-pointer hover:bg-zinc-700 h-10 w-10 rounded-full p-2 transition" onClick={()=>toggleSidebar()}></HamburgerMenuIcon>
          <div className="overflow-auto flex-grow">
                <Message  is_mine={false} message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quas quasi deleniti ullam rem illum dignissimos error ex, impedit distinctio cupiditate dolore placeat at tenetur laudantium debitis eum ducimus tempore?"></Message>
                <Message is_mine={true} message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quas quasi deleniti ullam rem illum dignissimos error ex, impedit distinctio cupiditate dolore placeat at tenetur laudantium debitis eum ducimus tempore?"></Message>
          </div>
          <div>
            <Input placeholder="Mande sua mensagem..." value="teste" type="text"></Input>
          </div>
        </div>
    </div>
  );
}