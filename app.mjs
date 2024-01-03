// app.mjs
import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerJsondoc from "swagger-jsdoc";
import cors from 'cors';
import productRoutes from "./src/routes.js";
import privateRoutes from "./src_private/routes.js"
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: { 
            title: "CU API",
            version: "1.0.0",
            description:
                "Web development API for CU", 
            license: {
                name: "CU",
                url: "https://"
            },
            contact: {
                name: "WebDevAdmin",
                url: "http://localhost:5000/",
                email: "admin@num.edu.mn"
            }
        },
        servers: [
            {
                url: "http://localhost:5000/"
            }
        ]
    },
    apis: ['./src/routes.js', './src_private/routes.js']
};
const specs = swaggerJsondoc(options);
app.use("/docs", swaggerUi.serve);
app.get(
    "/docs",
    swaggerUi.setup(specs, {
        explorer: true
    })
);

app.use("/products", productRoutes);
app.use("/private",  privateRoutes);



/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API operations related to products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The product name
 *         description:
 *           type: string
 *           description: The product description
 *         Price:
 *           type: string
 *           description: The product price
 *         image:
 *           type: string
 *           description: URL of the product image
 *         discount:
 *           type: string
 *           description: The product discount percentage
 *         discountingPrice:
 *           type: string
 *           description: The discounted price
 *         manufacturer:
 *           type: string
 *           description: The manufacturer of the product
 *         weight:
 *           type: string
 *           description: The weight of the product
 *         expiration:
 *           type: string
 *           description: The expiration date of the product
 *         ingredients:
 *           type: string
 *           description: The ingredients of the product
 *         instructions:
 *           type: string
 *           description: The usage instructions for the product
 *         storage:
 *           type: string
 *           description: Storage instructions for the product
 *         pID:
 *           type: integer
 *           description: The product ID
 *         type:
 *           type: string
 *           description: The type or category of the product
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
