//
// Upload Object
//
const path = require('path');
const multer = require('multer');

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, cb) {
			cb(null, path.join(__dirname, '..', 'uploads'));
		},
		filename(req, file, cb) {
			cb(
				null,
				`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
			);
		},
	}),
	limits: {
		fileSize: 10 * 1024 * 1024, // 10 MB
	},
});

module.exports = upload;
