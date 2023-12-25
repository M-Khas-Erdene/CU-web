// productDatasRoutes.mjs
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  -
 *   name: "ProductData"
 *   description: Product data related operations
 */

/**
 * @swagger
 *  paths:
 *      /productDatas:
 *          get:
 *              tags:
 *                  - ProductData
 *              summary: Get product data from NUM
 *              responses:
 *                  "200":
 *                      description: Success. Product data
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  type: array
 */
router.get('/Product', (req, res) => {
    res.send({ productDatas: req.params.productDatas });
});

export default router;
