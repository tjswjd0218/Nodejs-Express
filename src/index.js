const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const Controllers = require('./controllers');
const { swaggerDocs, options } = require('./controllers/swagger/index.js');
const swaggerUi = require('swagger-ui-express');

const app = express();

// 미들웨어
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "700mb" }));

// app.use("/users", UserController.router);

Controllers.forEach((controller) => {
    app.use(controller.path, controller.router)
});

app.get("/swagger.json", (req, res) => {
    res.status(200).json(swaggerDocs);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(undefined, options));

app.get("/", (req, res) => {
    res.send("Nodejs 강의 재밌어요!")
});

app.use((err, req, res, next) => {
    console.log(err);
    // err.message;
    res
        .status(err.status || 500)
        .json({ message: err.message || "서버에서 에러가 발생하였습니다."});
});

app.listen(8000, () => {
    console.log(`😎Server is running on port 8000😎`)
});

module.exports = { swaggerDocs, options };