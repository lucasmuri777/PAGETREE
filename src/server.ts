import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import http from 'http';
import https from 'https';
import fs from 'fs';

import publicRoutes from './routes/public';
import adminRoutes from './routes/admin';
import { requestIntercepter } from './utils/requestIntercepter';

dotenv.config();

const server = express();

const allowedOrigin = process.env.ALLOWED_ORIGIN;

server.use(
    cors({
      origin: allowedOrigin || "*", // Público se não houver domínio no .env
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true
    })
  );
server.use(express.json());
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended:true}));

server.all('*', requestIntercepter);

server.use(publicRoutes);
server.use('/admin',adminRoutes);

const runServer = (port: number, server: http.Server) => {
    server.listen(port, ()=>{
        console.log(`Running at PORT ${port}`);
    });
}

const regularServer = http.createServer(server);

if(process.env.NODE_ENV === 'production'){
    const options = {
        key: fs.readFileSync(process.env.SSL_KEY as string),
        cert: fs.readFileSync(process.env.SSL_CERT as string)
    }
    const secServer = https.createServer(options, server);
    runServer(80, regularServer);
    runServer(443, secServer);
}else{
    const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
    runServer(serverPort, regularServer);
}