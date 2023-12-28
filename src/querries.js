const getProducts = "SELECT * FROM productDatas";
const getProductById = "SELECT * FROM productDatas WHERE More = $1";
const addProducts = "INSERT INTO productDatas (name, description, Price, image, discount, discountingPrice, manufacturer, weight, expiration, ingredients, instructions, storage, More, type) VALUES($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11,$12,$13,$14)";
const deleteProduct = "DELETE FROM productDatas WHERE More = $1";
const updateProduct = "UPDATE productDatas SET name =$1 WHERE More=$2";
module.exports = {
    getProducts,
    getProductById,
    addProducts,
    deleteProduct,
    updateProduct,
};