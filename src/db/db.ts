import mongoose from "mongoose";
import { MONGO_URL } from "../config/config";

// const options  = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false

// }

const connectDB = () => {
//   const db = mongoose.connect(MONGO_URL)

  // console.log('Connected to the mongodb');
//   const conection = mongoose.connection
//   conection.on('error', () => console.log('Cound not connected on the db'))
//   conection.on('connected', () => console.log('Connected to the mongodb'))

  const db = mongoose.createConnection(MONGO_URL, { maxPoolSize: 10 });
  db.on(`error`, console.error.bind(console, `connection error:`));
  db.once(`open`, function () {
    // we`re connected!
    console.log(`MongoDB connected on "  ${MONGO_URL}`);
  });
};
export default connectDB;
