
const { validatePassword } = require('../helper/bcrypt');
const { createToken } = require('../helper/jwt');
const {User} = require('../models');
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client();



class userController {
    static async registerUser(req, res, next) {
        try {
            const {email, password, firstName, lastName, profilePicture} = req.body;

            const newUser = await User.create({email, password, firstName, lastName, profilePicture});

            res.status(201).json({
                message : "User succesfully added",
                data : {id : newUser.id, email : newUser.email}
            });
        } catch (error) {
            next(error);
        };
    };

    static async loginUser(req, res, next) {
        try {
            const {email, password} = req.body;

            if (!email || !password) {
                throw {name : "Invalid Input"}
            }

            const user = await User.findOne({
                where : {
                    email
                }
            });

            if (!user) {
                throw {name : "Invalid User"}
            };

            let isValidPassword = validatePassword(password, user.password);

            if (!isValidPassword) {
                throw {name : "Invalid User"}
            };

            const token = createToken({
                id : user.id
            });

            res.status(200).json({
                token,
                email : user.email,
            });
        } catch (error) {
            next(error);
        }
    };

    static async googleLogin(req, res, next) {
        try {
            const {google_token} = req.headers;
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: "982258102041-eo1doeutrvrckku3fqiv4t05ue50q6qj.apps.googleusercontent.com",
            });
            const payload = ticket.getPayload();
            
            const [user, created] = await User.findOrCreate({
                where : {
                    email : payload.email
                },
                defaults : {
                    email : payload.email,
                    password : String(Math.random() * 10000),
                    firstName : payload.given_name,
                    lastName : payload.family_name,
                    profilePicture : payload.picture
                }
            });

            const access_token = createToken({
                id : user.id,
                email : user.email,
            });

            res.status(200).json({ access_token })
        } catch (error) {
            next(error);
        }
    };

    static async getUserData(req, res, next) {
        try {
            const UserId = req.user.id;

            const user = await User.findByPk(UserId);

            res.status(200).json({
                user
            });
        } catch (error) {
            next(error);
        }
    };

    static async updateProfile(req, res, next) {
        try {
            const UserId = req.user.id;
            const {firstName, lastName, profilePicture} = req.body;

            // if (!firstName || !lastName || !profilePicture) {
            //     throw {name : "Invalid Input"}
            // };

            const user = await User.findByPk(UserId);

            if (!user) {
                throw {name : "Not Found"}
            }

            const updated = await user.update(req.body);

            res.status(200).json({
                message : "Berhasil mengupdate user",
                data : {
                    id : updated.id,
                    email : updated.email,
                    firstName : updated.firstName,
                    lastName : updated.lastName
                }
            })
        } catch (error) {
            next(error);
        }
    };
};

module.exports = userController;