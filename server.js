// small, very simple, node, express and mongodb  server

const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
// const { setAppElement } = require("react-modal");

const app = express();

//app.use(bodyParser);
//(app.use(bodyParser.urlencoded({extended : true}));
//app.use(bodyParser.json());
app.use(express.json()) 

mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

// define product model
const Product = mongoose.model(
    "products", 
    new mongoose.Schema({
        _id: {type: String, default: shortid.generate},
        title: String,
        description: String,
        image: String,
        availableSizes: [String],
        price: Number,
      
    })
);


// first endpoint
app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
})

// endpint to create  producrs in database
app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

// endpint to delete  producrs from database
app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});



// listen to the port and lounch server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Evo me na adresi: http://localhost:5000"));





