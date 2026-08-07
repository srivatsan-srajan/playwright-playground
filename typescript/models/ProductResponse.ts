import { Product } from './Product';

export interface ProductResponse {
    data: Product[];
    count: number;
    message: string;
}
