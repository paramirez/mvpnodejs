import mongoose from 'mongoose';
import { connection_string } from './global';

mongoose.Promise = global.Promise;

mongoose.connect(connection_string)
    .then(() => console.log("Run mongoose"), err => console.log(err));

export default mongoose;