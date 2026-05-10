import express from "express"
import dotenv from "dotenv";
import cors from "cors"

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();


const app = express();
const PORT = process.env.PORT;


app.use(cors({
    origin: "http://localhost:5173",
}))
app.use(express.json()) //this middleware pass json body
app.use(rateLimiter)
// app.use((req, res, next) => {
//     console.log(`Req URL is ${req.url}`)
//     next();
// })



app.use("/api/notes", notesRoutes);
// app.use("/api/product", productRoutes);


connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log("Server started on PORT: ", PORT);
    })
});

