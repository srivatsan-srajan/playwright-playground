import path from 'path';

import { test, expect } from '@playwright/test';

import { ExcelUtils } from '../utils/ExcelUtils';

const BASE_URL =
    'https://rahulshettyacademy.com/upload-download-test/index.html';

test.describe('Excel Upload / Download', () => {

    test(
        'should update the Excel file and verify the uploaded data',
        async ({ page }) => {

            const searchText = 'Mango';
            const updatedValue = '350';

            await page.goto(BASE_URL);

            const filePath = path.join(
                __dirname,
                '../../resources/excel-sample.xlsx'
            );

            const downloadPromise =
                page.waitForEvent('download');

            await page
                .getByRole('button', {
                    name: 'Download'
                })
                .click();

            const download = await downloadPromise;

            await download.saveAs(filePath);

            await ExcelUtils.updateValue({
                filePath,
                sheetName: 'Sheet1',
                searchText,
                replaceText: updatedValue,
                offset: {
                    rowChange: 0,
                    colChange: 2
                }
            });

            await page
                .locator('#fileinput')
                .setInputFiles(filePath);
            
            const row = page
                .getByRole('row')
                .filter({
                    has: page.getByText(searchText)
                });
            await expect(
                row.locator('#cell-4-undefined')
            ).toContainText(updatedValue);

        });

});