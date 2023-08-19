import User from "../models/User";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { Request, Response } from "express";

const signup = async (req: Request, res: Response) => {
    const { username, password, key } = req.body;

    if (!username || !password || !key) {
        return res.status(400).json({
            message: "Please enter all fields"
        });
    }

    if (key !== process.env.SIGNUP_KEY) {
        return res.status(400).json({
            message: "Invalid key"
        });
    }

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword
        });

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "24h"
            }
        );

        user.password = "";
        user.token = token;

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
};

const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Please enter all fields"
        });
    }

    try {
        const user = await User.findOne({ username });

        if (user && (await bcryptjs.compare(password, user.password))) {
            const token = jwt.sign(
                {
                    id: user._id,
                    username: user.username
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: "24h"
                }
            );

            user.token = token;
            user.password = "";

            res.status(200).cookie('token', token, {
                sameSite: 'strict',
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }).json(user)
            
        } else {
            res.status(401).json({
                message: "Invalid username or password"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export { signup, login };
