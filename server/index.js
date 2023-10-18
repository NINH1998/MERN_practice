const express = require('express');
const mongoose = require('mongoose');
const app = express();
const env = require('dotenv');
const Auth = require('./Routes/auth');
const Post = require('./Routes/Pots');
const cors = require('cors');

env.config();

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnt.m5obr6x.mongodb.net/MERN?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        console.log('Mongodb Connected');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/auth', Auth);
app.use('/api/posts', Post);

const PORT = 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
