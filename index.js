const express = require('express');
const Razorpay=require('razorpay');
const app = express();
app.use(express.static("./public"));
app.use(express.json());
app.get("/", (req, res) => {
    res.status(200).send("<h4>Well Come to Razorpay Portal</h4>")

})


app.post("/order", async (req, res) => {
    const amount = req.body.amount;
  
    var instance = new Razorpay({
      key_id: "rzp_test_GBAPQvSB30JfAG",
      key_secret: "APmysLQk1nX7LS15HGtR0NwG"
      // this needs to go in .env
    });
  
    var options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11"
    };
    //   instance.orders.create(options, function (err, order) {
    //     console.log(order);
    //   });
  
    const myOrder = await instance.orders.create(options);
  
    res.status(200).json({
      success: true,
      amount,
      order: myOrder
    });
  });
/*
app.post("/order", async(req, res) => {
    const amount = req.body.amount;
    const instance = new Razorpay({ key_id: 'rzp_test_GBAPQvSB30JfAG', key_secret: 'APmysLQk1nX7LS15HGtR0NwG' })

    const option = instance.orders.create({
        amount: amount * 50000,
        currency: "INR",
        receipt: "receipt#1",
       /* notes: {
            key1: "value3",
            key2: "value2"
        }
    })
    const myorder = await instance.order.amount(option);

    res.status(200).json({
        success: true,
        amount,
        order: myorder
    })
})*/

app.listen(4000, (req, res) => { console.log("server is up and running on port: 4000 ") });