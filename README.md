# Cafe Management System

A microservices-based cafe management system built with Node.js.

## Architecture

The system consists of the following microservices:

- **API Gateway**: Entry point for all client requests
- **Order Service**: Manages customer orders
- **Menu Service**: Handles the cafe menu items
- **Payment Service**: Processes payments
- **Inventory Service**: Tracks inventory levels
- **Customer Service**: Manages customer information

## Prerequisites

- Node.js (v18 or later)
- Docker Desktop (make sure it's installed and running)
- Docker Compose (included with Docker Desktop)
- MongoDB (or use the MongoDB container provided in docker-compose)

## Installation

### Local Development

1. Install dependencies for each service:

```bash
# Install dependencies for all services
cd order-services && npm install
cd ../menu-services && npm install
cd ../payment-services && npm install
cd ../inventory-services && npm install
cd ../customer-services && npm install
cd ../api-gateway && npm install
```

2. Run each service individually:

```bash
# Run each service in a separate terminal
cd order-services && node index.js
cd menu-services && node index.js
cd payment-services && node index.js
cd inventory-services && node index.js
cd customer-services && node index.js
cd api-gateway && node index.js
```

### Using Docker

1. Make sure Docker Desktop is running on your machine.

2. Build and run all services using Docker Compose:

```bash
# For newer Docker versions
docker compose up -d

# For older Docker versions
docker-compose up -d
```

3. To stop all services:

```bash
# For newer Docker versions
docker compose down

# For older Docker versions
docker-compose down
```

## API Endpoints

Access the system through the API Gateway at `http://localhost:3000`:

- **Orders**: `/api/orders`
- **Menu**: `/api/menu`
- **Payments**: `/api/payments`
- **Inventory**: `/api/inventory`
- **Customers**: `/api/customers`

## CI/CD Pipeline

The project includes a GitHub Actions workflow for continuous integration and deployment. On push to the main branch, it:

1. Installs dependencies for all services
2. Runs tests for all services
3. Builds Docker images
4. Pushes images to Docker Hub (requires setting up Docker Hub secrets)

## Environment Variables

Each service uses environment variables for configuration. In local development, you can create `.env` files in each service directory. In Docker, environment variables are provided through the docker-compose.yml file.

## Troubleshooting

- **Docker daemon not running**: Make sure Docker Desktop is running on your machine. On macOS, you can start it from the Applications folder or using Spotlight search.
- **Port conflicts**: If you encounter port conflicts, you can change the ports in the docker-compose.yml file.

## License

ISC
