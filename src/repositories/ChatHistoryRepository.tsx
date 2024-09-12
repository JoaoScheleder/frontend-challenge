
export interface ChatHistory{
    id: number;
    message: string;
    createdAt: Date;
}

export default interface ChatHistoryRepository{
    create(chatHistory : ChatHistory) : void;
    findAll(chatHistory : ChatHistory) : ChatHistory[] | null;
    delete(id: number) : void;
}