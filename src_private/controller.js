const pool = require('../db');
const queries = require('../src_private/querries');

const getOrdersWithCustomerInfo = async (req, res) => {
    try {
        const result = await pool.query(queries.getOrdersWithCustomerInfo);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching orders with customer info:', error);
        res.status(500).send('Internal Server Error');
    }
};

const addOrdersWithCustomerInfo = async (req, res) => {
    const {
        firstName,
        lastName,
        phoneNumber,
        eMail,
        address,
        description,
        concatenatedString,
        totalPrice,
    } = req.body;

    try {
        const result = await pool.query(queries.addOrdersWithCustomerInfo, [
            firstName,
            lastName,
            phoneNumber,
            eMail,
            address,
            description,
            concatenatedString,
            totalPrice,
        ]);

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error adding order with customer info:', error);
        res.status(500).send('Internal Server Error');
    }
};
const deleteOrderById = async (req, res) => {
    const orderId = req.params.id;
    
    try {
        const result = await pool.query(queries.deleteOrderById, [orderId]);

        if (result.rows.length === 0) {
            return res.status(404).send('Order not found');
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting order by id:', error);
        res.status(500).send('Internal Server Error');
    }
};
module.exports = {
    getOrdersWithCustomerInfo,
    addOrdersWithCustomerInfo,
    deleteOrderById,
};
