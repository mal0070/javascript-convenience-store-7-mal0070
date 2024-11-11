import { readFile } from 'fs/promises';
import path from 'path';
import Product from '../models/Product.js';
import Promotion from '../models/Promotion.js';

export default async function fetchData(filePath) {
    try {
        const absolutePath = path.resolve(process.cwd(), filePath);
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
        let processedPromotion = promotion;
        if (processedPromotion === "null") processedPromotion = null;
        return new Product(name, parseInt(price), parseInt(quantity), processedPromotion);
    })
}

function parsePromotions(dataRows){
    return dataRows.map(row => {
        const [name, buy, get,start_date,end_date] = row.split(',');
        return new Promotion(name, parseInt(buy), parseInt(get), new Date(start_date),new Date(end_date));
    });
}
