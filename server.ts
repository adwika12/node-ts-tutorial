import application from './src/app';
import * as http from 'http';
import { Server as S } from 'http';
import { connection } from "./config/db";

const server: S = http.createServer(application.instance);
const PORT = 3000;

server.listen(PORT, () => {
    connection();
    console.log(`Server started and running on http://localhost:${PORT} time: ${new Date()}`);
});
