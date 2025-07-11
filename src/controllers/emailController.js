const EmailService = require('../models/EmailService');
const ProviderA = require('../models/ProviderA');
const ProviderB = require('../models/ProviderB');
const { get: getStatus } = require('../utils/statusTracker');

const providers = [new ProviderA(), new ProviderB()];
const emailService = new EmailService(providers);

exports.sendEmail = async (req, res) => {
  const { to, subject, body, idempotencyKey } = req.body;

  if(!idempotencyKey) return res.status(400).json({ message: "Idempotency key is required" });

  try{
    const result = await emailService.send({ to, subject, body }, idempotencyKey);
    res.status(200).json({ message: "Email sent", result });
  } 
  catch(err){
    res.status(500).json({ message: err.message });
  }
};

exports.getStatus = (req, res) => {
  const { idempotencyKey } = req.query;
  const status = getStatus(idempotencyKey);
  res.status(200).json({ idempotencyKey, status });
};


