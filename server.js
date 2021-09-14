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

app.use("/", express.static(__dirname + "/build"))
app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"))


mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/react-shopping-cart-db", 
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

// define product/artikal model
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

// ORDER MODEL and API-s

const Order = mongoose.model(
    "order",
    new mongoose.Schema(
      {
        _id: {
          type: String,
          default: shortid.generate,
        },
        email: String,
        name: String,
        address: String,
        total: Number,
        cartItems: [
          {
            _id: String,
            title: String,
            price: Number,
            count: Number,
          },
        ],
      },
      {
        timestamps: true,
      }
    )
  );
  
  app.post("/api/orders", async (req, res) => {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.address ||
      !req.body.total ||
      !req.body.cartItems
    ) {
      return res.send({ message: "Narudžbina nije kompletna." });
    }
    const order = await Order(req.body).save();
    res.send(order);
  });
  
  app.get("/api/orders", async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
  });
  app.delete("/api/orders/:id", async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.send(order);
  });



// listen to the port and lounch server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Evo me na adresi: http://localhost:5000"));





