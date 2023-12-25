// promotionRoutes.mjs
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  -
 *   name: "Promotion"
 *   description: Promotion related operations
 */

/**
 * @swagger
 *  paths:
 *      /promotions:
 *          get:
 *              tags:
 *                  - Promotion
 *              summary: Get promotion data from NUM
 *              responses:
 *                  "200":
 *                      description: Success. Promotion data
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  type: array
 */
router.get('/', (req, res) => {
    res.send({ promotions: req.params.promotionData });
});

export default router;
