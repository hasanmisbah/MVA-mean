var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var post = mongoose.model('Post');
//temporary data store
var users = {};
module.exports = function (passport) {

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function (user, done) {
        console.log('serializing user:', user.username);
        return done(null, user.username);
    });

    passport.deserializeUser(function (username, done) {

        return done(null, users[username]);

    });

    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        function (req, username, password, done) {
            if (!users[username]) {
                return done('user not Found', false);
            }
            if (!isValidPassword(users[username], password)) {
                return done('invalid Password', false);
            }
            // for success login
            console.log('successfully logged in');
            return done(null, users[username]);
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {

            User.findOne({
                username : username
            }, function(err, user){
                if(err){
                    return done('db Error', false);
                }
                if(user){
                    return done('username allready Taken', false);
                }
                var newUser = new User();
                user.username = username;
                user.password = createHash(password);

                user.save(function(err, user){
                    if(err){
                        return done(err, false);
                    }
                    console.log('user has been succesfully Signed up '+ username);
                    return done(null, newUser);
                });
                

            });
            /* // check if user exist
            if (users[username]) {
                return done('username allready Taken by another user', false);
            }
            // add user to db
            users[username] = {
                username: username,
                password: createHash(password)
            };

            return done(null, users[username]); */

        }));

    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};