import exceljs from 'exceljs';
const { Workbook } = exceljs;
import fs from 'fs';
import { COLUMN_WIDTH, EXCEL_FILE } from '../config/constants.js';

export const getWorkbook = async () => {
    try {
        if (fs.existsSync(EXCEL_FILE)) {
            const workbook = new Workbook();
            await workbook.xlsx.readFile(EXCEL_FILE);
            return workbook;
        } else {
            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet('AirdropData');
            
            worksheet.columns = [
                { header: 'LINK AIRDROP', width: COLUMN_WIDTH },
                { header: 'AIRDROP NAME', width: COLUMN_WIDTH },
                { header: 'AIRDROP TYPE', width: COLUMN_WIDTH },
                { header: 'WALLET ADDRESS', width: COLUMN_WIDTH },
                { header: 'DATE & TIME', width: COLUMN_WIDTH }
            ];
            
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true };
                cell.alignment = { horizontal: 'center', vertical: 'center' };
            });
            
            await workbook.xlsx.writeFile(EXCEL_FILE);
            return workbook;
        }
    } catch (error) {
        console.error('Error in getWorkbook:', error);
        throw error;
    }
};

export const saveWorkbook = async (workbook) => {
    await workbook.xlsx.writeFile(EXCEL_FILE);
};
