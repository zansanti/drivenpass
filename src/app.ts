import express from 'express';
import authRouter from './routers/authRouter';
import credentialRouter from './routers/credentialRouter';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send("I'm OK!");
});

app.use(authRouter);
app.use('/credentials', credentialRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));