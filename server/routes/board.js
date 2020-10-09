const express = require('express');
const multer = require('multer');

const router = express.Router();
const board_controller = require('../controllers/board');
const upload = multer({ dest: './uploads/images' });

router.get('/get-all', board_controller.board_get_all);

router.get('/:id', board_controller.board_get_by_id);

router.post('/create', board_controller.board_create);

router.post('/add-image/:id', upload.single('image'), board_controller.board_add_image);

router.put('/:id/save', board_controller.board_save_changes);

router.put('/:id/dismiss', board_controller.board_dismiss_chagnes);

module.exports = router;