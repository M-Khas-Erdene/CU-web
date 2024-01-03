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
const addProducts = (req, res) => {
    const {
    
      name,
      description,
      Price,
      image,
      discount,
      discountingPrice,
      manufacturer,
      weight,
      expiration,
      ingredients,
      instructions,
      storage,
      pID,
      type,
      count
    } = req.body;
  
    pool.query(
      queries.addProducts, [name, description, Price, image, discount, discountingPrice, manufacturer, weight, expiration, ingredients, instructions, storage,pID,  type, count],
      (error, result) => {
        if (error) {
          console.error('Error adding product to the database:', error);
          res.status(500).send('Internal server error');
        } else {
          res.status(201).send('Product added to the database successfully!');
        }
      }
    );
  };

  const deleteProduct = (req, res) => {
    const pID = parseInt(req.params.id);
    pool.query(queries.getProductById, [pID], (error, result) => {
        if (error) {
            console.error("Error fetching product:", error);
            return res.status(500).send("Internal Server Error");
        }

        const noProductFound = !result.rows.length;
        if (noProductFound) {
            return res.send("Product doesn't exist in the database");
        }

        pool.query(queries.deleteProduct, [pID], (error, result) => {
            if (error) {
                console.error("Error deleting product:", error);
                return res.status(500).send("Internal Server Error");
            }

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
const deleteAllProducts = (req, res) => {
  pool.query(queries.deleteAllProducts, (error, result) => {
    if (error) {
      console.error("Error deleting all products:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json({ message: "All products deleted successfully!" });
  });
};
  
module.exports = {
    getProducts,
    getProductById,
    addProducts,
    deleteProduct,
    updateProduct,
    deleteAllProducts,
}