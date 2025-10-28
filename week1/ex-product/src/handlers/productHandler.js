import { getAllProducts, addProduct, getOneProduct, updateProduct} from "../database/productRepository.js";

export async function getProducts(ctx) {
    try {
        const {limit, sort} = ctx.query
        const products = getAllProducts(limit, sort);
        ctx.body = {
            data: products
        }
    } catch (e) {
        ctx.status = 404
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

export async function createProduct(ctx) {
    try {
        const newProduct = ctx.request.body
        console.log(newProduct)
        addProduct(newProduct)
        ctx.body = {
            success: true
        }
    } catch (e) {
        ctx.status = 404
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

export async function getProductById(ctx) {
    try {
        const {id} = ctx.params
        const fieldsQuery = ctx.query.fields;
        const product = getOneProduct(id, fieldsQuery)
        ctx.body = {
            data: product
        }
    } catch (e) {
        ctx.status = 404
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

export async function updateProductById(ctx) {
    try {
        const {id} = ctx.params
        const updateData = ctx.request.body
        updateProduct(id, updateData)
        ctx.body = {
            success: true
        }
    } catch (e) {
        ctx.status = 404
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

export async function deleteProductById(ctx) {
    try {
        const {id} = ctx.params
        deleteProduct(id)
        ctx.body = {
            success: true
        }
    } catch (e) {
        ctx.status = 404
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}