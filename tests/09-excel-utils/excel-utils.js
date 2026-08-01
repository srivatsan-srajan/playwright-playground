const ExcelJS = require("exceljs");

class ExcelUtils {

    /**
     * Loads an Excel workbook.
     */
    static async loadWorkbook(filePath) {

        const workbook = new ExcelJS.Workbook();

        await workbook.xlsx.readFile(filePath);

        return workbook;

    }

    /**
     * Returns a worksheet by name.
     */
    static getWorksheet(workbook, sheetName) {

        const worksheet = workbook.getWorksheet(sheetName);

        if (!worksheet) {
            throw new Error(
                `Worksheet "${sheetName}" not found.`
            );
        }

        return worksheet;

    }

    /**
     * Finds the first occurrence of a value.
     */
    static findCell(worksheet, searchText) {

        for (let row = 1; row <= worksheet.rowCount; row++) {

            const currentRow = worksheet.getRow(row);

            for (
                let column = 1;
                column <= currentRow.cellCount;
                column++
            ) {

                const cell = currentRow.getCell(column);

                if (cell.value === searchText) {

                    return {
                        row,
                        column
                    };

                }

            }

        }

        return null;

    }

    /**
     * Reads a cell.
     */
    static readCell(worksheet, row, column) {

        return worksheet
            .getCell(row, column)
            .value;

    }

    /**
     * Updates a cell.
     */
    static updateCell(
        worksheet,
        row,
        column,
        value
    ) {

        worksheet
            .getCell(row, column)
            .value = value;

    }

    /**
     * Updates first matching value.
     */
    static updateCellByValue(
        worksheet,
        searchText,
        replaceText
    ) {

        const position =
            this.findCell(
                worksheet,
                searchText
            );

        if (!position) {

            throw new Error(
                `"${searchText}" not found.`
            );

        }

        this.updateCell(
            worksheet,
            position.row,
            position.column,
            replaceText
        );

        return position;

    }

    /**
     * Appends a row.
     */
    static appendRow(
        worksheet,
        values
    ) {

        worksheet.addRow(values);

    }

    /**
     * Returns all worksheet data.
     */
    static getSheetData(
        worksheet
    ) {

        const data = [];

        worksheet.eachRow((row) => {

            const rowData = [];

            row.eachCell((cell) => {

                rowData.push(cell.value);

            });

            data.push(rowData);

        });

        return data;

    }

    /**
     * Returns entire column.
     */
    static getColumnValues(
        worksheet,
        column
    ) {

        return worksheet
            .getColumn(column)
            .values
            .slice(1);

    }

    /**
     * Returns entire row.
     */
    static getRowValues(
        worksheet,
        row
    ) {

        return worksheet
            .getRow(row)
            .values
            .slice(1);

    }

    /**
     * Saves workbook.
     */
    static async saveWorkbook(
        workbook,
        filePath
    ) {

        await workbook.xlsx.writeFile(filePath);

    }

    /**
     * Convenience method.
     */
    static async updateValue({

        filePath,

        sheetName,

        searchText,

        replaceText

    }) {

        const workbook =
            await this.loadWorkbook(filePath);

        const worksheet =
            this.getWorksheet(
                workbook,
                sheetName
            );

        const position =
            this.updateCellByValue(
                worksheet,
                searchText,
                replaceText
            );

        await this.saveWorkbook(
            workbook,
            filePath
        );

        return position;

    }

}

module.exports = ExcelUtils;