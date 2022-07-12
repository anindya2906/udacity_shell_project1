import express from 'express';

import imageProcRouter from './image_processing/app';

const app = express();
const port = 3000;

app.use('/api', imageProcRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
