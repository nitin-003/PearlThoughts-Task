const sleep = require('../utils/sleep');
const { has, add } = require('../utils/idempotencyStore');
const { set: setStatus } = require('../utils/statusTracker');
const { shouldAllow, recordFailure } = require('../utils/circuitBreaker');

const MAX_RETRIES = 3;
const BASE_DELAY = 500; // milliseconds

class EmailService{
  constructor(providers){
    this.providers = providers;
  }

  async send(email, idempotencyKey){
    // Idempotency check
    if(has(idempotencyKey)){
      console.log(`[Idempotent] Skipping duplicate request: ${idempotencyKey}`);
      return { message: 'Duplicate request', idempotencyKey };
    }

    // Try each provider
    for(let i=0; i<this.providers.length; i++){
      const provider = this.providers[i];
      const providerName = provider.constructor.name;

      // Circuit breaker check
      if(!shouldAllow(providerName)){
        console.log(`[Circuit Breaker] Skipping ${providerName} (OPEN)`);
        continue;
      }

      console.log(`[Provider Attempt] Trying ${providerName}`);

      // Retry logic
      for(let attempt=1; attempt<=MAX_RETRIES; attempt++){
        try{
          const response = await provider.send(email);

          // Success
          console.log(`[Success] Email sent via ${providerName} on attempt ${attempt}`);
          add(idempotencyKey);
          setStatus(idempotencyKey, 'success');

          return{
            ...response,
            attempt,
            provider: providerName
          };
        } 
        catch(err){
          // Failure
          recordFailure(providerName);
          console.log(`[Retry ${attempt}] ${providerName} failed: ${err.message}`);
          await sleep(BASE_DELAY * Math.pow(2, attempt));
        }
      }

      console.log(`[Fallback] Moving to next provider after ${providerName} failed`);
    }

    // All providers failed
    console.log(`[Failure] All providers failed for key: ${idempotencyKey}`);
    setStatus(idempotencyKey, 'failed');
    throw new Error("All providers failed");
  }
}

module.exports = EmailService;



