var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
const sqlite3 = require('sqlite3').verbose();

// Define userSchema
const UserSchema = new Schema({
    //Necessary fields for a user
	username: { type: String, unique: true, required: true }, //Username for logging in
	password: { type: String, unique: false, required: true }, //Password for logging in
    email: {type: String, unique: false, required: true},
    amount: {type: Number, unique: false, required: true}
})

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;

                //========= adding new user info to database ===================
                    const insertuser = 'INSERT INTO USERS (username, password, email, amount) VALUES (' + '\'' + user.username + '\'' + ', ' + '\'' + user.password + '\'' + ', ' + '\'' +  user.email + '\'' + ', ' + user.amount + ')';
                    const sqllocation = __dirname.slice(0,__dirname.lastIndexOf('/')) + '/controllers/users.db'
                    const db = new sqlite3.Database(sqllocation);
                    db.all(insertuser, (err, rows) => {
                        if (!err) {
                            console.log('User has been inserted!');
                            return next('0a0a');
                        }
                        else {
                            console.log(err);
                            return next(err);
                        }
                    });
                //======================= end ===========================
            });

        });
    } else {
        return next();
    }
});

UserSchema.pre('findUser', function (err, user) {
    // const finduser = 'SELECT USER FROM USERS WHERE USER = \'' + user + '\'';
    // const sqllocation = __dirname.slice(0,__dirname.lastIndexOf('/')) + '/controllers/users.db'
    // const db = new sqlite3.Database(sqllocation);
    // db.all(finduser, (err, row) => {
    //     if(!err){
    //         console.log(row);
            
    //         return (null, row)
    //     }
    //     else {
    //         console.log(err);
            
    //         return (err, null)
    //     }
    // });
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    }); 
};


module.exports = mongoose.model('User', UserSchema);