import mongoose from 'mongoose';

let Schema = mongoose.Schema;

var roleSchema = new Schema({
    name      : String
  , routes    : [String]
  , features  : [String]

});

export default mongoose.model('roles', roleSchema);

