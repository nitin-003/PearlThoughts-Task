const EmailService = require('../src/models/EmailService');
const ProviderA = require('../src/models/ProviderA');
const ProviderB = require('../src/models/ProviderB');
const { get: getStatus } = require('../src/utils/statusTracker');
const { has: idempotencyHas } = require('../src/utils/idempotencyStore');

describe("EmailService", () => {
  let emailService;
  const mockEmail = {
    to: "test@example.com",
    subject: "Test Email",
    body: "This is a test."
  };

  beforeEach(() => {
    const providers = [new ProviderA(), new ProviderB()];
    emailService = new EmailService(providers, {
      baseDelay: 100,  // Reduced for faster testing
      maxRetries: 2    // Fewer retries = faster
    });
  });

  test("should send email successfully with unique idempotencyKey", async () => {
    const result = await emailService.send(mockEmail, "key-success-1");
    expect(result.success).toBe(true);
    expect(result.provider).toBeDefined();
    expect(getStatus("key-success-1")).toBe("success");
  }, 15000);

  test("should detect duplicate email by idempotencyKey", async () => {
    const key = "key-duplicate";
    await emailService.send(mockEmail, key);
    const second = await emailService.send(mockEmail, key);
    expect(second.message).toBe("Duplicate request");
    expect(idempotencyHas(key)).toBe(true);
  }, 15000);

  test("should fail when all providers fail", async () => {
    class FailingProvider {
      async send() {
        throw new Error("Always fails");
      }
    }

    const failingService = new EmailService([new FailingProvider(), new FailingProvider()], {
      baseDelay: 100,
      maxRetries: 2
    });

    await expect(failingService.send(mockEmail, "fail-key")).rejects.toThrow("All providers failed");
  }, 15000);

  test("should track status as failed when all retries fail", async () => {
    class FailingProvider {
      async send() {
        throw new Error("Always fails");
      }
    }

    const failingService = new EmailService([new FailingProvider(), new FailingProvider()], {
      baseDelay: 100,
      maxRetries: 2
    });

    try{
      await failingService.send(mockEmail, "fail-key-2");
    } 
    catch (err) {}

    expect(getStatus("fail-key-2")).toBe("failed");
  }, 15000);
});



