// require('dotenv').config({path  : './env'});
import dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config({ path: './env' });

connectDB();










/**
const app = express();
(async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
        app.on("error", (err) => { console.log(err); throw err });
        app.listen(`${process.env.PORT}`, () => { console.log("App running"); });
    }
    catch (err) {
        console.error("Error connecting to MongoDB", err);
    }

})();
*/