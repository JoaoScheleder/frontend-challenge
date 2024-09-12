export interface ChatMessage{
    id: number;
    message: string;
    createdBy : string;
    createdAt: Date;
}

export default interface ChatMessagesRepository{
    create(chatMessage : ChatMessage) : void;
    findAll() : ChatMessage[] | null;
    delete(id: number) : void;
}