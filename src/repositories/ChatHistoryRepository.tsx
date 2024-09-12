
export interface Chat{
    id?: number;
    name: string;
    createdAt: Date;
}

export default interface ChatHistoryRepository{
    create(chatHistory : Chat) : void;
    findAll(chatHistory : Chat) : Chat[] | null;
    delete(id: number) : void;
}