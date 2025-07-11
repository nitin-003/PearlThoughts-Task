let tokens = 10;
const interval = 1000;

setInterval(() => {
  tokens = 10;
}, interval);

module.exports = function rateLimiter(req, res, next){
  if(tokens > 0){
    tokens--;
    next();
  } 
  else{
    res.status(429).json({ message: "Rate limit exceeded" });
  }
};



