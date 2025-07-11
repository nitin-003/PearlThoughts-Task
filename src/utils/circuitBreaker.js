const breakerState = {};

const THRESHOLD = 3;
const OPEN_TIME = 10000;

function shouldAllow(providerName){
  const entry = breakerState[providerName];
  if(!entry) return true;

  const now = Date.now();

  if(entry.open && now - entry.lastFailure < OPEN_TIME){
    return false;
  }

  if(entry.open && now - entry.lastFailure >= OPEN_TIME){
    breakerState[providerName] = { failures: 0, open: false };
    return true;
  }

  return true;
}

function recordFailure(providerName){
  if(!breakerState[providerName]){
    breakerState[providerName] = { failures: 1, open: false, lastFailure: Date.now() };
  } 
  else{
    breakerState[providerName].failures++;
    breakerState[providerName].lastFailure = Date.now();

    if(breakerState[providerName].failures >= THRESHOLD){
      breakerState[providerName].open = true;
      console.log(`[Circuit Breaker] OPEN for ${providerName}`);
    }
  }
}

module.exports = {
  shouldAllow,
  recordFailure
};


