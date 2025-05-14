import express from 'express';
import { paymentController } from '../controllers/index.js';

const router = express.Router();

router.get('/', paymentController.getAll);
router.get('/:id', paymentController.getById);
router.post('/', paymentController.create);

// Whatever you name after the : becomes the key in req.params and you can use in controller
// define a param name id, so in controller
//  you can use variable id in params keyword
router.delete('/:id', paymentController.deleteById);

// put -> update all a record
// patch -> update a part of record
router.put('/:id', paymentController.updateById);

export default router;
