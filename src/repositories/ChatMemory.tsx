import ChatRepository, { Messages } from "./ChatRepository";
import ChatHistoryRepository, { Chat } from "./ChatRepository";

class ChatMemory implements ChatRepository{
    
    private chatHistories: Chat[] = [];

    create(chatHistory: Chat): number {
        chatHistory.id = this.findMaxId() + 1;
        chatHistory.name += ' ' + chatHistory.id;
        this.chatHistories.push(chatHistory);
        return chatHistory.id
    }

    delete(id: number): void {
        this.chatHistories = this.chatHistories.filter(chatHistory => chatHistory.id !== id);
    }
    
    findAll(): Chat[] | null {
        return this.chatHistories;
    }

    findById(id: number): Chat | null {
        return this.chatHistories.find(chatHistory => chatHistory.id === id) || null;
    }

    update(chatHistory: Chat): void {
        this.chatHistories = this.chatHistories.map(ch => ch.id === chatHistory.id ? chatHistory : ch);
    }

    private findMaxId(): number{
        let maxId = 0;
        this.chatHistories.forEach(chatHistory => {
            if(chatHistory.id && chatHistory.id > maxId){
                maxId = chatHistory.id;
            }
        });
        return maxId;
    }
}

const chatMemory = new ChatMemory();
export default chatMemory;