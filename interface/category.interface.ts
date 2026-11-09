import { Transaction_Type } from "@/config/enum";

export interface ICategory {
    id: string;
    name: string;
    type: Transaction_Type;
    remark?: string;
    createdAt: Date;
    updatedAt?: Date;

}
export interface ISelectCategory {
    id: string;
    name: string;
}

export interface IAddCategory {
    name: string;
    type: Transaction_Type;
    remark?: string;
}
