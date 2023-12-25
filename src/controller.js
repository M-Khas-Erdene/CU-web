const pool = require ('../db')
const getProducts = (req , res)=>{
    pool.query("SELECT * FROM product_datas", (error, result)=>{
        if(error) throw error;
        res.status(200).json(result.rows);
    })
};

module.exports = {
    getProducts,
}