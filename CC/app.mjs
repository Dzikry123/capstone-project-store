// app.mjs
import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './user.mjs';
import companyRouter from './company.mjs';
import joblistRouter from './joblist.mjs';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/company', companyRouter);
app.use('/joblist', joblistRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
