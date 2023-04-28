import express, { Router } from 'express';
import { AppRoutes } from './routes/routes';
import cors from 'cors';
const app = express();

app.use(express.json());

app.use(AppRoutes);
const appCors = cors({
    origin:'*'
});
app.use(appCors);

//rodando na porta 8080
app.listen(8080,()=>'Server running at http://localhost:8080');