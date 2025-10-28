import Router from "koa-router";
import { getProducts, createProduct, getProductById, updateProductById, deleteProductById} from "../handlers/productHandler.js";
import {productSchema, productUpdateSchema} from "../middleware/productMiddleware.js"
import { validate } from "../middleware/validate.js";

const router = new Router({prefix: '/api/products'})

router.get("/", getProducts)
router.post("/", validate(productSchema), createProduct)
router.get("/:id", getProductById)
router.put("/:id", validate(productUpdateSchema) ,updateProductById)
router.delete("/:id", deleteProductById)

export default router