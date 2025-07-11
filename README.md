#  Setup Instructions

## Clone the Repository

*  git clone https://github.com/your-username/resilient-email-service.git
*  cd resilient-email-service

## Install Dependencies

* npm install

## Run the Server

* npm run dev

## API Endpoints

#### POST /email/send
* Description: Sends an email using one of the providers.
* Method: POST
* Request Body: -->   {
        "to": "recipient@example.com",
        "subject": "Hello",
        "message": "This is a test email.",
        "idempotencyKey": "email-003"
   }
* How to test: Use Postman or any API client. This cannot be tested in browser because it requires a POST body.
 
#### GET /email/status
* Description: Returns the current delivery status of the email associated with the given idempotency key.
* Method: GET
* Test in browser: ✅ Yes
* Example:  --> https://pearlthoughts-task-kyzb.onrender.com/email/status?idempotencyKey=email-003


# Assumptions

* Email providers are mocked (ProviderA, ProviderB) and fail randomly.
* No real emails are sent — only simulated behavior.
* The system does not persist state across restarts (in-memory stores only).
* Idempotency is keyed via idempotencyKey field from client.
* Rate limiting is basic, per-IP (max 5 requests per minute).
* Circuit breaker logic is available (bonus) but not fully activated.
* No database or queue system is used for simplicity.

# Testing

* Unit tests using Jest inside the /tests/ directory.

# Future Improvements

* Integrate real email providers.
* Add persistent storage (e.g., Redis, MongoDB).
* Implement logging and monitoring.
* Add job queues (e.g., Bull, RabbitMQ) for async processing.
* Fully integrate circuit breaker pattern.

# Author
Nitin Pathak


