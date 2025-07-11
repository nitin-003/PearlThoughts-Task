#  Setup Instructions

## Clone the Repository

*  git clone https://github.com/your-username/resilient-email-service.git
*  cd resilient-email-service

## Install Dependencies

* npm install

## Run the Server

* npm run dev

## API Endpoints

* POST /email/send --->  https://pearlthoughts-task-kyzb.onrender.com/email/send

* GET /email/status  --->  https://pearlthoughts-task-kyzb.onrender.com/status?idempotencyKey=email-123

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


