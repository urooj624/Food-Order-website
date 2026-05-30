const express = require("express");
const path = require("path");
const app = express();


app.use(express.json());

let orders = [];


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/orders", (req, res) => {
    res.json(orders);
});


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
