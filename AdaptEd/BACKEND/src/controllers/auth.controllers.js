import User from "../models/User.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
}

export const registerUser = async (req, res) => {
    const { name, email, password, classLevel, subjects } = req.body;

    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already Exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            classLevel,
            subjects
        });

        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                classLevel: user.classLevel,
                subjects: user.subjects,
            },
            token: generateToken(user._id),
        })
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

export const home = (req, res) => {
    res.json({
        message: "Milestone Reached. You have made it here, keep pushing"
    })
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    classLevel: user.classLevel,
                    subjects: user.subjects,
                },
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: "Invalid email or password "})
        }
    } catch(error) {
        res.status(500).json({ message: error.message})
    }
}
export const logoutUser = (req, res) => {}
export const onboardUser = async (req, res) => {
    const { subjects, classLevel } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { subjects, classLevel },
            { new: true }
        ).select("-password")
    
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const checkAuth = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        res.status(200).json({
            user: {
                _id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                classLevel: req.user.classLevel,
                subjects: req.user.subjects,
            }
        });
    } catch (error) {
        console.error("Error during auth check:", error.message);
        res.status(500).json({ message: "Server error during authentication check.", error: error.message })
    }
}