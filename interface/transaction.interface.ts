export interface ITransition {
    id: string;
    category: {
        id: string;
        name: string;
        type: string;
    };
    amount: number;
    remark?: string;
    transactionDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface IAddTransition {
    categoryId: string;
    amount: number;
    remark?: string;
    transactionDate: string;
}