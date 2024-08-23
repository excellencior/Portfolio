import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import mailRouter from '../api/server.js';
import configSupabase from '../api/supabaseConfig.js';
import homeAPI from '../api/homeAPI.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", homeAPI);
app.use("/mail", mailRouter);
app.use("/supabase-config", configSupabase);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    }
);