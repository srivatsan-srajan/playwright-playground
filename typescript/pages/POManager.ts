import { Page } from '@playwright/test';

import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { CartPage } from './CartPage';
import { OrdersReviewPage } from './OrdersReviewPage';
import { OrdersHistoryPage } from './OrdersHistoryPage';

export class POManager {
    constructor(private readonly page: Page) {}

    public getLoginPage(): LoginPage {
        return new LoginPage(this.page);
    }

    public getDashboardPage(): DashboardPage {
        return new DashboardPage(this.page);
    }

    public getCartPage(): CartPage {
        return new CartPage(this.page);
    }

    public getOrdersReviewPage(): OrdersReviewPage {
        return new OrdersReviewPage(this.page);
    }

    public getOrdersHistoryPage(): OrdersHistoryPage {
        return new OrdersHistoryPage(this.page);
    }
}