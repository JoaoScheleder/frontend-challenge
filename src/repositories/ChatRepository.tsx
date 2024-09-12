
export interface Chat{
    id?: number;
    name: string;
    messages : Messages[];
}

export interface Messages{
    message: string;
    createdAt: string;
    is_mine : boolean;
    user: string;
}

export default interface ChatRepository{
    create(chatHistory : Chat) : void;
    findAll(chatHistory : Chat) : Chat[] | null;
    findById(id: number) : Chat | null;
    delete(id: number) : void;
    update(chat : Chat) : void;
}