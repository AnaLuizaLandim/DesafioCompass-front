import express, { Router } from 'express';
const app = express();

const route = Router();

app.use(express.json());

route.get('/', (req, res)=>{
    res.json({
        message: 'hey'
    })
});

app.use(route);

app.listen(8080,()=>'Server running at http://localhost:8080');