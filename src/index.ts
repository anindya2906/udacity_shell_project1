import express from 'express';

import iamgeProcRouter from './image_processing/app';


const app = express();
const port = 3000;

app.use("/api", iamgeProcRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});