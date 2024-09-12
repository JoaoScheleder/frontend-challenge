import ChatMessagesRepository, { ChatMessage } from "./ChatMessagesRepository";

class ChatMessagesMemory implements ChatMessagesRepository{
    
    private chatMessages: ChatMessage[] = [];

    create(chatMessage: ChatMessage): void {
        this.chatMessages.push(chatMessage);
    }

    delete(id: number): void {
        this.chatMessages = this.chatMessages.filter(chatMessage => chatMessage.id !== id);
    }
    
    findAll(): ChatMessage[] | null {
        return this.chatMessages;
    }
}

const chatMessagesMemory = new ChatMessagesMemory();
export default chatMessagesMemory