import products from './products.json' with { type: 'json' };
import fs from "fs"

const SORT = {
    ASC: "asc",
    DESC: "desc"
}

const DATA_PATH = './src/database/products.json';

export function getAllProducts(limit, sort) {
    let result = [...products]
    if (sort) {
        const orderBy = sort.toLowerCase();
        if (orderBy === SORT.ASC) result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        if (orderBy === SORT.DESC) result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (limit) {
        result = result.slice(0, parseInt(limit));
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
    const fields = fieldsQuery.split(",");
    const picked = {};
    for (const field of fields) {
        if (field in product) picked[field] = product[field];
    };
    return picked;
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