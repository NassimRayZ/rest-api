import cart_routes from "./routes/cart_routes.js"
import express from "express"
import dotenv from "dotenv"
import prisma from "./db/prisma.js"
dotenv.config()
const app = express()
const port = 8000
app.use(express.json())
app.use("/api/cart", cart_routes)
app.get("/", (req, res) => {
  res.send({
    message: "API is running!!!"
  })
})


app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`)
})
