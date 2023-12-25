// productRoutes.mjs
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  -
 *   name: "Product"
 *   description: Product related operations
 */

/**
 * @swagger
 *  paths:
 *      /products:
 *          get:
 *              tags:
 *                  - Product
 *              summary: Get product data from NUM
 *              responses:
 *                  "200":
 *                      description: Success. Product data
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  type: array
 */
router.get('/', (req, res) => {
    // Your logic to retrieve and send product data
    res.send({ products: req.params.productData });
});

export default router;
