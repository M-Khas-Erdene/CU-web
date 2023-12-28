const pool = require ('../db');
const queries = require('../src/querries');
const getProducts = (req , res)=>{
    pool.query(queries.getProducts, (error, result)=>{
        if(error) throw error;
        res.status(200).json(result.rows);
    });
};
const getProductById = (req, res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getProductById, [id], (error, result)=>{
        if(error) throw error;
        res.status(200).json(result.rows);
    });
};
const addProducts = (req, res) =>{
    const {name, description, Price, image, discount, discountingPrice, manufacturer, weight, expiration, ingredients, instructions, storage, More, type} = req.body;
    pool.query(queries.addProducts, [name, description, Price, image, discount, discountingPrice, manufacturer, weight, expiration, ingredients, instructions, storage, More, type], (error, result)=>{
        if(error) throw error;
        res.status(201).send("Product Created Successfully!");
   
    });
};

const deleteProduct = (req, res) =>{
    const id = parseInt(req.params.id);
    pool.query(queries.getProductById, [id], (error, result)=>{
        const noProductFound = !result.rows.length;
        if(noProductFound){
        res.send("Product doesn't exist in the database");
        }
    pool.query(queries.deleteProduct, [id], (error,result)=>{
        if(error) throw error;
        res.send("Product Deleted Successfully!");
    });
    });
};
const updateProduct = (req, res) =>{
    const id = parseInt(req.params.id);
    const {name} = req.body;
    pool.query(queries.getProductById, [id], (error, result)=>{
        const noProductFound = !result.rows.length;
        if(noProductFound){
            res.send("Product doesn't exist in the database");
        }
        pool.query (queries.updateProduct, [name, id],(error, result)=>{
            if(error) throw error;
            res.status(200).send("Product Updated Successfully!");
        });
    }
    );
};
module.exports = {
    getProducts,
    getProductById,
    addProducts,
    deleteProduct,
    updateProduct,
}