import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATHS = ({
    PRODUCTS: path.resolve(__dirname, '..','..','public','products.md'),
    PROMOTION: path.resolve(__dirname, '..', '..', 'public', 'promotions.md')
});


export default FILE_PATHS;