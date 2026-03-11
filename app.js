import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { connectDatabase } from './db/connectDatabase.js';

import authRouter from './routes/authRouter.js';
import usersRouter from './routes/usersRouter.js';

try {
    await connectDatabase();
    console.log('Database connection successful');
} catch (error) {
    console.log(error.message);
    process.exit(1);
}

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.use(express.static('public'));

app.use((_, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message });
});

app.listen(process.env.PORT, () => {
    console.log('Server is running. Use our API on port: ', process.env.PORT);
});
