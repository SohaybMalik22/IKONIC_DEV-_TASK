const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const User = require("../model/user");
const commonServices = require("../commonServices/common-services");
const checkAuth = require("../middleware/checkAuth");

// Create
router.post("/signup",
    [check("email").isEmail(),
    check("password").isLength({ min: 6 })
    ],
    async (req, res) => {
        let existingUser;
        let AuthToken;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            })
        }

        try {
            const { name, contact, address, email, password, confirmPassword } = req.body;
            existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(422).json({
                    success: false,
                    message: "user already exists"
                })
            }

            if (password !== confirmPassword) {
                return res.status(422).json({
                    success: false,
                    message: "password doesn't match"
                })
            }

            // Hash the password
            const hashedPassword = commonServices.encryptDataWithKey(
                process.env.AES_KEY,
                password
            );

            const newUser = await User.create({
                name,
                contact,
                address,
                email,
                password: hashedPassword
            });

            AuthToken = await commonServices.loggedInStatus(
                newUser
            );

            return res.status(201).json({
                success: true,
                message: "User created",
                data: {
                    name: newUser.name,
                    contact: newUser.contact,
                    authToken: AuthToken
                }
            })

        } catch (err) {
            await commonServices.saveLog({
                moduleName: "user",
                error: err.stack,
            });
            return res.status(500).json({
                message: "Internal Error",
                success: false,
            });
        }
    });
// Retrieve
router.get("/getUsers",
    [checkAuth],
    async (req, res) => {
        let existingUsers;
        // const skip = req.query.skip || req.params.skip;
        // const limit = req.query.limit || req.params.limit; 

        try {
            existingUsers = await User.find().lean();
            // .skip(parseInt(skip)).limit(parseInt(limit)).exec();

            if (existingUsers.length === 0) {
                return res.status(422).json({
                    success: false,
                    message: "no data found"
                })
            }

            return res.status(200).json({
                success: true,
                message: "sucessfully get data",
                data: existingUsers
            })

        } catch (err) {
            await commonServices.saveLog({
                moduleName: "user",
                error: err.stack,
            });
            return res.status(500).json({
                message: "Internal Error",
                success: false,
            });
        }
    });
//Update 
router.put("/updateUser",
    [checkAuth,
        check("email").isEmail(),
        check("password").isLength({ min: 6 })
    ],
    async (req, res) => {
        let _id = req.params.id || req.query.id;
        let existingUser;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            })
        }

        try {
            const { name, contact, address, email, password } = req.body;
            existingUser = await User.findOne({ _id });

            if (!existingUser) {
                return res.status(422).json({
                    success: false,
                    message: "no user found"
                })
            }

            // Hash the password
            const hashedPassword = commonServices.encryptDataWithKey(
                process.env.AES_KEY,
                password
            );

            await User.updateOne(
                { _id },
                {
                    $set: {
                        name: name,
                        contact: contact,
                        address: address,
                        email: email,
                        password: hashedPassword
                    },
                });

            return res.status(201).json({
                success: true,
                message: "successfully update data"
            })

        } catch (err) {
            await commonServices.saveLog({
                moduleName: "user",
                error: err.stack,
            });
            return res.status(500).json({
                message: "Internal Error",
                success: false,
            });
        }
    });
//Delete
router.delete("/removeUser",
    [checkAuth],
    async (req, res) => {
        let _id = req.params.id || req.query.id;
        let existingUser;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            })
        }

        try {
            existingUser = await User.findOne({ _id });

            if (!existingUser) {
                return res.status(422).json({
                    success: false,
                    message: "no user found"
                })
            }

            await User.deleteOne({ _id });

            return res.status(201).json({
                success: true,
                message: "successfully delete user"
            })

        } catch (err) {
            await commonServices.saveLog({
                moduleName: "user",
                error: err.stack,
            });
            return res.status(500).json({
                message: "Internal Error",
                success: false,
            });
        }
    });

module.exports = router;