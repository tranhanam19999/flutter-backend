const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');
const constant = require('./constant');
const api = require('./api');

const multer = require('multer');
const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        // no larger than 5mb.
        fileSize: 5 * 1024 * 1024,
    },
});

require('dotenv').config();
const connectionString = process.env.MONGO;

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) console.log(err);
    console.log('success connect');
});

const app = express();

const httpServer = http.createServer(app);
require('./utils/socket').handleSocketConnection(httpServer);

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
};

app.use(allowCrossDomain);

const corsOptions = {
    origin: '*',
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(multerMid.single('file'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', api.authRouter);
app.use('/chat', api.chatRouter);
app.use('/user', api.userRouter);
app.use('/memory', api.memoryRouter)
app.use("/motto", api.mottoRouter)

app.use('/', (_, res) => {
    res.json('NodeJS-API is working!');
});

httpServer.listen(process.env.PORT || constant.PORT, () => {
    console.log('Server is running on port: ', process.env.PORT || constant.PORT);
});
httpServer.setTimeout(5000000);
