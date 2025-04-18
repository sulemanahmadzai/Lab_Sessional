const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`[API-GATEWAY] ${req.method} ${req.url}`);
  next();
});

// Add a test endpoint
app.get("/api/test", (req, res) => {
  return res.json({
    success: true,
    message: "API Gateway test endpoint is working!",
    timestamp: new Date().toISOString(),
  });
});

// Menu service routes
app.get("/api/menu", async (req, res) => {
  try {
    console.log("Accessing menu service");
    const response = await fetch("http://menu-service:3001/menu");

    if (!response.ok) {
      throw new Error(`Menu service returned ${response.status}`);
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching from menu service:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.get("/api/menu/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Accessing menu item ${id}`);
    const response = await fetch(`http://menu-service:3001/menu/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: "Menu item not found" });
      }
      throw new Error(`Menu service returned ${response.status}`);
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching from menu service:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Order service routes
app.get("/api/orders", async (req, res) => {
  try {
    console.log("Accessing order service");
    const response = await fetch("http://order-service:3001/orders");

    if (!response.ok) {
      throw new Error(`Order service returned ${response.status}`);
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching from order service:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    console.log("Creating new order");
    const response = await fetch("http://order-service:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`Order service returned ${response.status}`);
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error creating order:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Payment service routes
app.post("/api/payments", async (req, res) => {
  try {
    console.log("Processing payment");
    const response = await fetch("http://payment-service:3001/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`Payment service returned ${response.status}`);
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error processing payment:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Inventory service routes
app.get("/api/inventory", async (req, res) => {
  try {
    console.log("Accessing inventory");
    const response = await fetch("http://inventory-service:3001/inventory");

    if (!response.ok) {
      throw new Error(`Inventory service returned ${response.status}`);
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching inventory:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Customer service routes
app.get("/api/customers", async (req, res) => {
  try {
    console.log("Accessing customers");
    const response = await fetch("http://customer-service:3001/customers");

    if (!response.ok) {
      throw new Error(`Customer service returned ${response.status}`);
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching customers:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/customers", async (req, res) => {
  try {
    console.log("Creating new customer");
    const response = await fetch("http://customer-service:3001/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`Customer service returned ${response.status}`);
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error creating customer:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Add a root endpoint for testing
app.get("/", (req, res) => {
  res.json({
    message: "Cafe Management System API Gateway is running!",
    endpoints: [
      "/api/test",
      "/api/menu",
      "/api/orders",
      "/api/payments",
      "/api/inventory",
      "/api/customers",
    ],
  });
});

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
  console.log("Available routes:");
  console.log("- GET / (Welcome message)");
  console.log("- GET /api/test (Test endpoint)");
  console.log("- GET /api/menu (Menu service)");
  console.log("- POST /api/orders (Create order)");
  console.log("- POST /api/payments (Process payment)");
  console.log("- GET /api/inventory (Inventory service)");
  console.log("- GET/POST /api/customers (Customer service)");
});
