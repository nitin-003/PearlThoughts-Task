class ProviderA{
  async send(email){
    if(Math.random() < 0.5) 
      throw new Error("ProviderA failed");

    return { success: true, provider: "ProviderA" };
  }
}

module.exports = ProviderA;




