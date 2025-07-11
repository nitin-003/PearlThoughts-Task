const express = require('express');
const router = express.Router();

const rateLimiter = require('../middlewares/rateLimiter');
const { sendEmail, getStatus } = require('../controllers/emailController');

router.post('/send', rateLimiter, sendEmail);
router.get('/status', getStatus);

router.get('/', (req, res) => {
  res.send('Email API is active. Use:\n• POST /email/send\n• GET /email/status?idempotencyKey=your-key');
});

module.exports = router;



