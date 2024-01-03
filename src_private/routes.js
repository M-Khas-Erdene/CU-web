const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/', controller.getOrdersWithCustomerInfo);
router.post('/', controller.addOrdersWithCustomerInfo);

module.exports = router;
