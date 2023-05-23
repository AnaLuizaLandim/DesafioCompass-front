import express, { Router } from 'express';
import { AppRoutes } from './routes/routes';
import cors from 'cors';
import { InsertTable } from './controller/constants-controller';
import CreateTablePosts from './service/post-service';
const app = express();
CreateTablePosts();
InsertTable();
app.use(express.json());
 
  

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(AppRoutes);

//rodando na porta 8080
app.listen(8080, () => 'Server running at http://localhost:8080');