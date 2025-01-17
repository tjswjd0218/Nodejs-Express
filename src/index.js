import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import Controllers from './controllers/index.js';

const app = express();

// 미들웨어
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "700mb" }));

Controllers.forEach((controller) => {
    app.use(controller.path, controller.router)
});

app.get("/", (req, res) => {
    res.send("Nodejs 강의 재밌어요!")
});

app.listen(8000, () => {
    console.log("Server is running on port 8000")
});