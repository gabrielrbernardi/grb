import express from 'express';
import cors from 'cors';
import routes from './routes';
import mongoose from 'mongoose';
import 'dotenv/config'

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

mongoose
    .connect(process.env.MONGO_URL || "")
    .then(() => { console.log("DB Connected")})
    .catch((err) => console.log(err));

let port = process.env.PORT || 3333;
app.listen(port, () => {console.log(`Running on: ${port}`)});
