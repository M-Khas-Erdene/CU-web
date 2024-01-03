const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/', controller.getOrdersWithCustomerInfo);
router.post('/', controller.addOrdersWithCustomerInfo);
router.delete('/:id', controller.deleteOrderById);
module.exports = router;
