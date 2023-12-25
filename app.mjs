// app.mjs
import express from 'express';
// import promotionRoutes from './routes/promotionRoutes.mjs';
// import productRoutes from './routes/productRoutes.mjs';
// import productDatasRoutes from './routes/productDatasRoutes.mjs';
import swaggerUi from "swagger-ui-express";
import swaggerJsondoc from "swagger-jsdoc";
import MyClass from './mymodule.mjs';
import data from './data.json' assert { type: 'json' };
import productRoutes from "./src/routes.js";
const app = express();
const port = 3000;



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
                url: "https://",
                email: "admin@num.edu.mn"
            }
        },
        servers: [
            {
                url: "http://localhost:3000/"
            }
        ]
    },
    apis: ["./app.mjs"]
};
const specs = swaggerJsondoc(options);
app.use("/docs", swaggerUi.serve);
app.get(
    "/docs",
    swaggerUi.setup(specs, {
        explorer: true
    })
);
/**
 * @swagger
 * tags:
 *  -
 *   name: "Product"
 *   description: Product related operations
 *      
 *  - 
 *   name: "About"
 *   description: Company info 
 *
 *  - 
 *   name: "Order"
 *   description: Order related operations 

 */
/**
 * @swagger
 * paths:
 *  /products:
 *    get:
 *      tags:
 *          - Product
 *      summary: Get specific product from CU
 *      responses:
 *        "200":
 *          description: GET from CU API
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */
app.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const product = data.productDatas.find(productData => productData.More === productId);
  
    if (product) {
      res.send(product);
    } else {
      res.status(404).send('Product not found');

    }
  });
app.get('/products',
(req, res) => {
    res.send(data)
})

/**
 * @swagger
 *  paths:
 *   /about:
 *    get:
 *     tags: 
 *      - About
 *     summary: Get product likes                
 *     responses:
 *      "200":
 *       description: GET about data from CU API
 *       content:
 *        application/json:
 *         schema:
 *          type: string
 */
app.get('/', (req, res) => {
    const myClass = new MyClass(req, res);
    myClass.render();
});

app.use("/test", productRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
