const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());


const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
