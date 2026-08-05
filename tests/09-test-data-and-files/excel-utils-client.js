const ExcelUtils = require("./excel-utils");

const path = require('path');
const FILE_PATH = path.join(__dirname, '../../resources/excel-sample.xlsx');
const SHEET_NAME = "Sheet1";

(async () => {

    console.log("========================================");
    console.log("Loading Workbook");
    console.log("========================================");

    const workbook = await ExcelUtils.loadWorkbook(FILE_PATH);

    const worksheet = ExcelUtils.getWorksheet(
        workbook,
        SHEET_NAME
    );

    console.log("Workbook loaded successfully.\n");

    // ------------------------------------------------------
    // Read Cell
    // ------------------------------------------------------

    console.log("Reading Cell (1,1)");

    const value = ExcelUtils.readCell(
        worksheet,
        1,
        1
    );

    console.log(value);

    // ------------------------------------------------------
    // Find Cell
    // ------------------------------------------------------

    console.log("\nSearching for 'Mango'...");

    const position = ExcelUtils.findCell(
        worksheet,
        "Mango"
    );

    if (position) {

        console.log(position);

    }
    else {

        console.log("Not Found");

    }

    // ------------------------------------------------------
    // Update Cell
    // ------------------------------------------------------

    console.log("\nUpdating Cell (2,2)...");

    ExcelUtils.updateCell(
        worksheet,
        2,
        2,
        "Playwright"
    );

    // ------------------------------------------------------
    // Update By Value
    // ------------------------------------------------------

    console.log("\nReplacing Apple -> Tropical Mango");

    ExcelUtils.updateCellByValue(
        worksheet,
        "Apple",
        "Tropical Mango"
    );

    // ------------------------------------------------------
    // Append Row
    // ------------------------------------------------------

    console.log("\nAppending Row...");

    ExcelUtils.appendRow(
        worksheet,
        [
            "Guava",
            "Summer Fruit",
            "India",
            12
        ]
    );

    // ------------------------------------------------------
    // Read Entire Sheet
    // ------------------------------------------------------

    console.log("\nEntire Worksheet");

    console.table(
        ExcelUtils.getSheetData(
            worksheet
        )
    );

    // ------------------------------------------------------
    // Read Row
    // ------------------------------------------------------

    console.log("\nRow 2");

    console.log(
        ExcelUtils.getRowValues(
            worksheet,
            2
        )
    );

    // ------------------------------------------------------
    // Read Column
    // ------------------------------------------------------

    console.log("\nColumn 1");

    console.log(
        ExcelUtils.getColumnValues(
            worksheet,
            1
        )
    );

    // ------------------------------------------------------
    // Save Workbook
    // ------------------------------------------------------

    console.log("\nSaving Workbook...");

    await ExcelUtils.saveWorkbook(
        workbook,
        FILE_PATH
    );

    console.log("Workbook saved.");

    // ------------------------------------------------------
    // Convenience Method
    // ------------------------------------------------------

    console.log("\nRunning Convenience Method...");

    await ExcelUtils.updateValue({

        filePath: FILE_PATH,

        sheetName: SHEET_NAME,

        searchText: "Playwright",

        replaceText: "Playwright Automation"

    });

    console.log("Convenience update completed.");

    console.log("\n========================================");
    console.log("Demo Completed Successfully");
    console.log("========================================");

})();