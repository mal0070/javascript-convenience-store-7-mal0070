import path from 'path';
/*import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);*/

const FILE_PATHS = {
    PRODUCTS: path.resolve(process.cwd(),'public','products.md'),
    PROMOTION: path.resolve(process.cwd(),'public', 'promotions.md')
};


export default FILE_PATHS;