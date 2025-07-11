class ProviderB{
  async send(email){
    if(Math.random() < 0.5) 
      throw new Error("ProviderB failed");

    return { success: true, provider: "ProviderB" };
  }
}

module.exports = ProviderB;




