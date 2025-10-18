import express from 'express';
import cors from 'cors';

import mailRouter from '../api/server.js';
import homeAPI from '../api/homeAPI.js';
import photoAPI from '../api/photoAPI.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", homeAPI);
app.use("/mail", mailRouter);
app.use("/photography", photoAPI);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    }
);