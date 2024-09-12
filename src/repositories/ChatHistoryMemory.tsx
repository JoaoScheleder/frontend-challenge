import ChatHistoryRepository, { Chat } from "./ChatHistoryRepository";

class ChatHistoryMemory implements ChatHistoryRepository{
    
    private chatHistories: Chat[] = [];

    create(chatHistory: Chat): void {
        chatHistory.id = this.findMaxId() + 1;
        chatHistory.name += ' ' + chatHistory.id;
        this.chatHistories.push(chatHistory);
    }

    delete(id: number): void {
        this.chatHistories = this.chatHistories.filter(chatHistory => chatHistory.id !== id);
    }
    
    findAll(): Chat[] | null {
        return this.chatHistories;
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

const chatHistoryMemory = new ChatHistoryMemory();
export default chatHistoryMemory;