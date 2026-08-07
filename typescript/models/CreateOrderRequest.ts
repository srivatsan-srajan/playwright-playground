export interface OrderRequestItem {
    country: string;
    productOrderedId: string;
}

export interface CreateOrderRequest {
    orders: OrderRequestItem[];
}
