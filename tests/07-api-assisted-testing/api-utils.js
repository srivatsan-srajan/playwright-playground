const { expect } = require('@playwright/test');

const BASE_API = 'https://rahulshettyacademy.com/api/ecom';

class ApiUtils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    /**
     * Authenticate and return the JWT token.
     */
    async getToken() {
        const loginResponse = await this.apiContext.post(
            `${BASE_API}/auth/login`,
            {
                data: this.loginPayload
            }
        );

        expect(loginResponse.status()).toBe(200);

        const loginResponseJson = await loginResponse.json();

        if (!loginResponseJson.token) {
            throw new Error(
                `Login succeeded but no token was returned.\n${JSON.stringify(loginResponseJson, null, 2)}`
            );
        }

        return loginResponseJson.token;
    }

    /**
     * Retrieve the product ID for the given product name.
     */
    async getProductId(token, productName) {
        const productResponse = await this.apiContext.post(
            `${BASE_API}/product/get-all-products`,
            {
                headers: {
                    Authorization: token
                }
            }
        );
        
        expect(productResponse.status()).toBe(200);

        const productResponseJson = await productResponse.json();

        const product = productResponseJson.data.find(
            product => product.productName === productName
        );

        if (!product) {
            throw new Error(
                `Product "${productName}" not found.\n\nAvailable products:\n${productResponseJson.data
                    .map(product => `- ${product.productName}`)
                    .join('\n')}`
            );
        }
        
        return product._id;
    }

    /**
     * Create an order for the specified product.
     */
    async createOrder(productName, country = 'Cuba') {
        const token = await this.getToken();

        const productId = await this.getProductId(
            token,
            productName
        );

        const orderPayload = {
            orders: [
                {
                    country,
                    productOrderedId: productId
                }
            ]
        };

        const orderResponse = await this.apiContext.post(
            `${BASE_API}/order/create-order`,
            {
                data: orderPayload,
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            }
        );

        const status = orderResponse.status();
        const orderResponseJson = await orderResponse.json();

        if (status !== 201) {
            throw new Error(
                `Order creation failed (${status})\n${JSON.stringify(orderResponseJson, null, 2)}`
            );
        }

        if (
            !Array.isArray(orderResponseJson.orders) ||
            orderResponseJson.orders.length === 0
        ) {
            throw new Error(
                `Unexpected order creation response.\n${JSON.stringify(orderResponseJson, null, 2)}`
            );
        }

        return {
            token,
            orderId: orderResponseJson.orders[0],
            productId
        };
    }
}

module.exports = { ApiUtils };