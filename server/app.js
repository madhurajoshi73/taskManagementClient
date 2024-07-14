import express from 'express';
import cors from 'cors';
import { userRoutes } from './services/userService.js'
import { taskRoutes } from './services/taskService.js'

const app = express();


//localhost cors error
const corsOps = {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400,
    credentials: true,
  }

app.use(express.json());
app.use(cors(corsOps));
app.use('/api',userRoutes)
app.use('/api',taskRoutes)
//test
app.get('/', (req, res) => {
    res.send('Hello World');  
});

//server on 3000 port
app.listen(3000, () => {
    console.log(`Server listening on port ${3000}`);  
});