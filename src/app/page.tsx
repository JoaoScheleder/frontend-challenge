import ChatHistory from "@/components/chathistory";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Input from "@/components/input";
import Message from "@/components/message";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="max-h-screen min-h-full flex  overflow-hidden">
        <div className=" border-gray-700 border-r w-72 overflow-auto flex justify-between flex-col">
          <Header></Header>
          <ChatHistory></ChatHistory>
          <Footer></Footer>
        </div>
        <div className="border-box flex-grow flex flex-col m-2 bg-zinc-800 p-4 rounded-2xl" style={{ minHeight: 'calc(100vh - 1rem)' }}>
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