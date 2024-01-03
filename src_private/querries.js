const getOrdersWithCustomerInfo = `
    SELECT * FROM private;
`;

const addOrdersWithCustomerInfo = `
    INSERT INTO private (firstName, lastName, phoneNumber, eMail, address, description, concatenatedString, totalPrice)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
`;
const deleteOrderById = `
    DELETE FROM private
    WHERE id = $1
    RETURNING *;
`;
module.exports = {   
    getOrdersWithCustomerInfo,
    addOrdersWithCustomerInfo,
    deleteOrderById,
};
