import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import pc from "picocolors";
import cookieParser from 'cookie-parser';

/* ----------------------------- Initialization ----------------------------- */
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;
import authenticationRoutes from './routes/authentication.routes.js';
import dishesRoutes from './routes/dishes.routes.js';
import usersRoutes from './routes/users.routes.js';

/* ------------------------------- Middleware ------------------------------- */
app.use(cors({
  origin: [
    /https?:\/\/(.+\.)?clr-server\.com$/,
    /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/
  ],
  credentials: true
}));

app.use(express.json());

app.use(cookieParser());

/* --------------------------------- Routes --------------------------------- */
app.use('/authentication', authenticationRoutes);
app.use('/dishes', dishesRoutes);
app.use('/users', usersRoutes);

/* ------------------------------- Connection ------------------------------- */
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB!');

    /* --------------------------------- Listen --------------------------------- */
    const isDev = process.env.NODE_ENV === 'development';

    app.listen(port, () => {
      setTimeout(() => {
        console.log("\n-------------------------------------------");
        console.log(`  ● Server is running on port ${port}!`);
        if (isDev) console.log(`  › ${pc.blue(pc.underline(`http://localhost:${port}/`))}`)
        else console.log(`  › ${pc.blue(pc.underline('https://projekt.api.clr-server.com/'))}`);
        console.log("-------------------------------------------");
      }, 500);
    });

  })
  .catch((error) => {
    console.error(`Couldn't connect:`, error);
  });