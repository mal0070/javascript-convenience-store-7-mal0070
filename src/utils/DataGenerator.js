import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';
import Promotion from '../models/Promotion.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function fetchData(filePath) {
    try {
        const absolutePath = path.resolve(__dirname, filePath);
        const file = await readFile(absolutePath, 'utf-8');
        return getFileContent(file);
    } catch (error) {
        throw new Error("[ERROR] 데이터 로딩 오류");
    }
}

function getFileContent(file){
    const rows = file.split('\n').filter(row => row.trim());
    const [header, ...dataRows] = rows;
    const headerTitle = header.split(',');
    if(headerTitle.length === 4){
        return parseProducts(dataRows);
    } else {
        return parsePromotions(dataRows);
    }
}

function parseProducts(dataRows) {
    return dataRows.map(row => {
        const [name, price, quantity, promotion] = row.split(',');
        return new Product(name, parseInt(price), parseInt(quantity), promotion);
    })
}

function parsePromotions(dataRows){
    return dataRows.map(row => {
        const [name, buy, get,start_date,end_date] = row.split(',');
        return new Promotion(name, parseInt(buy), parseInt(get), new Date(start_date),new Date(end_date));
    });
}

