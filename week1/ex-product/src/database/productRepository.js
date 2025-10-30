import { pick } from '../helpers/pick.js';
import { applyLimit, sortByDate } from '../helpers/sort.js';
import products from './products.json' with { type: 'json' };
import fs from "fs"

const DATA_PATH = './src/database/products.json';

export function getAllProducts(limit, sort) {
    let result = [...products]
    if (sort) {
        result = sortByDate(result, sort)
    }
    if (limit) {
        result = applyLimit(result, limit)
    }
    return result
}

export function addProduct(data) {
    data.createdAt = new Date()
    const updatedProducts = [data, ...products];
    return writeFile(DATA_PATH, updatedProducts);
}

export function getOneProduct(id, fieldsQuery) {
    const product = products.find(product => product.id === parseInt(id))
    if (!product) {
        throw new Error(`Product with id ${id} not found`);
    }
    if (!fieldsQuery) {
        return product
    }
    const fieldsPick = fieldsQuery.split(",")
    const result = pick(product, fieldsPick)
    return result;
}

export function updateProduct(id, updateData) {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
        throw new Error(`Product not found`);
    }
    const updatedProduct = { ...products[index], ...updateData };
    products[index] = updatedProduct;
    return writeFile(DATA_PATH, products);
}

export function deleteProduct(id) {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
        throw new Error(`Product not found`);
    }
    products.splice(index, 1)
    return writeFile(DATA_PATH, products);
}

function writeFile(source, data) {
    return fs.writeFileSync(source, JSON.stringify(data, null, 2));
}