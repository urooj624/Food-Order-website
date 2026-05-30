const express = require("express");
const path = require("path");
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// In-memory data store
let orders = [];

// HOME PAGE ROUTE (Yeh index.html file ko browser mein bhejega)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// GET API: Saare orders list karne ke liye
app.get("/orders", (req, res) => {
    res.json(orders);
});

// POST API: Naya order add karne ke liye
app.post("/orders", (req, res) => {
    const { customer, food } = req.body;

    // VALIDATION
    if (!customer || !food) {
        return res.status(400).json({
            message: "All Fields Required"
        });
    }

    orders.push({ customer, food });

    res.json({
        message: "Order Placed Successfully"
    });
});

// DELETE API: Order delete karne ke liye (Array Index ke hisaab se)
app.delete("/orders/:id", (req, res) => {
    const id = req.params.id;

    if (id >= 0 && id < orders.length) {
        orders.splice(id, 1);
        res.json({ message: "Order Deleted" });
    } else {
        res.status(404).json({ message: "Order Not Found" });
    }
});

// SERVER PORT SETUP
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
});