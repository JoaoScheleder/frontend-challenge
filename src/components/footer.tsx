import { ExitIcon, GearIcon, SunIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="flex justify-between items-center p-4 flex-col gap-6 ">
            <div></div>
            <div className="flex gap-4 border-t border-gray-700 pt-4">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-bold">João Gabriel Scheleder</p>
                    <p className="text-xs text-neutral-400">Desenvolvedor</p>
                </div>
            </div>
            <div className="w-full">
                {/* links like logout settings dark mode */}
                <div className="flex gap-2 items-center text-sm text-zinc-300 cursor-pointer px-4 py-2 rounded text-left hover:bg-zinc-800 transition">
                    <GearIcon></GearIcon>
                    <p>Configurações</p>
                </div>
                <div className="flex gap-2 items-center text-sm text-zinc-300 cursor-pointer px-4 py-2 rounded text-left hover:bg-zinc-800 transition">
                    <ExitIcon></ExitIcon>
                    <p>Sair</p>
                </div>
                <motion.div
                    className="bg-orange-600 w-full rounded mt-4 p-4 flex justify-between items-center cursor-pointer hover:bg-orange-500 transition"
                    whileHover="hover"
                >                    <div>
                        <p className="text-xs text-orange-200">Aproveite mais</p>
                        <p className="text-orange-100">Atualize para o <br></br><span className="font-bold">Premium</span></p>
                    </div>
                    <motion.div
                        variants={{
                            hover: { x: [0, 10, 0] }
                        }}
                        transition={{ repeat: Infinity, duration: 1, ease: "easeOut" }}
                    >
                        <ArrowRight />
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    )
}