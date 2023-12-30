const getProducts = "SELECT * FROM Basket";
const getProductById = "SELECT * FROM Basket WHERE pID = $1";
const addProducts = "INSERT INTO Basket (pID, name, description, Price, image, discount, discountingPrice, manufacturer, weight, expiration, ingredients, instructions, storage, type) VALUES($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11,$12,$13,$14)";
const deleteProduct = "DELETE FROM Basket WHERE pID = $1";
const updateProduct = "UPDATE Basket SET name =$1 WHERE pID=$2";


module.exports = {
    getProducts,
    getProductById,
    addProducts,
    deleteProduct,
    updateProduct,
};