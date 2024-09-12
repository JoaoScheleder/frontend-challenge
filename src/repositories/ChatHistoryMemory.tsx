import ChatHistoryRepository, { ChatHistory } from "./ChatHistoryRepository";

export default class ChatHistoryMemory implements ChatHistoryRepository{
    
    private chatHistories: ChatHistory[] = [];

    create(chatHistory: ChatHistory): void {
        this.chatHistories.push(chatHistory);
    }

    delete(id: number): void {
        this.chatHistories = this.chatHistories.filter(chatHistory => chatHistory.id !== id);
    }
    
    findAll(): ChatHistory[] | null {
        return this.chatHistories;
    }
}