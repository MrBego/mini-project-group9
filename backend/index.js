const express = require("express");
const PORT = 8000;
const app = express();
const { db } = require("./database");
const {
  authRouter,
  productRouter,
  myStoreRouter,
  myProductRouter,
} = require("./routers");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/my-store", myStoreRouter);
app.use("/my-store/my-product", myProductRouter);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
