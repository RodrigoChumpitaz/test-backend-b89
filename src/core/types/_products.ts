import { ProductListResultApplication } from 'src/modules/products/application/results/product-list-result';

export type ProductListResultApp = ProductListResultApplication[];
export type ProductResultOne = ProductListResultApplication;

export class ProductListResultOrigin {
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
    disabledAt: null;
}
