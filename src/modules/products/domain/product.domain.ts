export interface ProductRequireds {
    productName: string;
    description: string;
    price: number;
    stock: number;
    category: string;
}

export interface ProductOptionals {
    id: string;
    active: boolean;
    createdAt: Date;
    updateAt: Date;
    createdBy: string;
    updatedBy: string;
    disabledAt: Date | null;
}

export type ProductProperties = ProductRequireds & Partial<ProductOptionals>;

export class Product {
    id: string;
    productName: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    active: boolean;
    createdAt: Date;
    updateAt: Date;
    createdBy: string;
    updatedBy: string;
    disabledAt: Date | null;

    constructor(props: ProductProperties) {
        Object.assign(this, props);
        this.active = true;
        this.createdAt = new Date();
        this.updateAt = new Date();
    }
}
