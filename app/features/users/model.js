import mongoose from 'mongoose';

let Schema = mongoose.Schema;

var userSchema = new Schema({
    login     : String
  , password  : {type: String, select: false} // see http://stackoverflow.com/questions/18791616/removing-attribute-from-javascript-object-returned-by-mongooses-findoneandupd
  , language  : String
  , role      : String
  , firstName : String
  , lastName  : String
  , email     : String
});

export default mongoose.model('users', userSchema);

/* Front-end Use:
 var User = Backbone.Model.extend({urlRoot:"/api/users", idAttribute: "_id"})
 bob = new User({email:"sam@gmail.com",twitter:"@sam",firstName:"sam", lastName:"zed"})
 bob.save().then(function(data) { console.log(data); }).fail(function(err) { console.log("Error", err); })
 */