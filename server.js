import express from 'express'
import { dbConnection } from './dataBase/dbConnection.js';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { routes } from './Src/modules/index.routes.js';
dotenv.config();

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

routes(app)
dbConnection();
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// handle error outside express

process.on('unhandledRejection',(err) => {
    console.log('unhandledRejection',err)
})