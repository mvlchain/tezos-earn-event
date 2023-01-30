export type User = {
    id: string;
    email: string | null;
    name: string;
    avatar: string | null;
    pending: boolean;
    createdAt: Date;
    updatedAt: Date;
    country: string | null;
    data: object | null;
    deletedAt: Date | null;
};
