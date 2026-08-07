import ExcelJS, { Workbook, Worksheet, CellValue } from 'exceljs';

export interface CellPosition {
    row: number;
    column: number;
}

export interface CellOffset {
    rowChange: number;
    colChange: number;
}

export interface UpdateValueOptions {
    filePath: string;
    sheetName: string;
    searchText: string;
    replaceText: CellValue;
    offset?: CellOffset;
}

export class ExcelUtils {

    public static async loadWorkbook(filePath: string): Promise<Workbook> {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        return workbook;
    }

    public static getWorksheet(
        workbook: Workbook,
        sheetName: string
    ): Worksheet {

        const worksheet = workbook.getWorksheet(sheetName);

        if (!worksheet) {
            throw new Error(`Worksheet "${sheetName}" not found.`);
        }

        return worksheet;
    }

    public static findCell(
        worksheet: Worksheet,
        searchText: string
    ): CellPosition | null {

        for (let row = 1; row <= worksheet.rowCount; row++) {

            const currentRow = worksheet.getRow(row);

            for (let column = 1; column <= currentRow.cellCount; column++) {

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

    public static readCell(
        worksheet: Worksheet,
        row: number,
        column: number
    ): CellValue {

        return worksheet.getCell(row, column).value;
    }

    public static updateCell(
        worksheet: Worksheet,
        row: number,
        column: number,
        value: CellValue
    ): void {

        worksheet.getCell(row, column).value = value;
    }

    public static updateCellByValue(
        worksheet: Worksheet,
        searchText: string,
        replaceText: CellValue,
        offset: CellOffset = {
            rowChange: 0,
            colChange: 0
        }
    ): CellPosition {

        const position = this.findCell(
            worksheet,
            searchText
        );

        if (!position) {
            throw new Error(`"${searchText}" not found.`);
        }

        const targetRow =
            position.row + offset.rowChange;

        const targetColumn =
            position.column + offset.colChange;

        this.updateCell(
            worksheet,
            targetRow,
            targetColumn,
            replaceText
        );

        return {
            row: targetRow,
            column: targetColumn
        };
    }

    public static appendRow(
        worksheet: Worksheet,
        values: CellValue[]
    ): void {

        worksheet.addRow(values);
    }

    public static getSheetData(
        worksheet: Worksheet
    ): CellValue[][] {

        const data: CellValue[][] = [];

        worksheet.eachRow(row => {

            const rowData: CellValue[] = [];

            row.eachCell(cell => {
                rowData.push(cell.value);
            });

            data.push(rowData);
        });

        return data;
    }

    public static getColumnValues(
        worksheet: Worksheet,
        column: number
    ): CellValue[] {

        const values = worksheet.getColumn(column).values;

        if (!Array.isArray(values)) {
            return [];
        }

        return values.slice(1) as CellValue[];
    }

    public static getRowValues(
        worksheet: Worksheet,
        row: number
    ): CellValue[] {

        const values = worksheet.getRow(row).values;

        if (!Array.isArray(values)) {
            return [];
        }

        return values.slice(1) as CellValue[];
    }

    public static async saveWorkbook(
        workbook: Workbook,
        filePath: string
    ): Promise<void> {

        await workbook.xlsx.writeFile(filePath);
    }

    public static async updateValue(
        options: UpdateValueOptions
    ): Promise<CellPosition> {

        const workbook = await this.loadWorkbook(
            options.filePath
        );

        const worksheet = this.getWorksheet(
            workbook,
            options.sheetName
        );

        const position = this.updateCellByValue(
            worksheet,
            options.searchText,
            options.replaceText,
            options.offset
        );

        await this.saveWorkbook(
            workbook,
            options.filePath
        );

        return position;
    }
}