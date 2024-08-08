import bcrypt from "bcrypt";
import { UserModel } from "../models/user.js";

export const register = async (req, res, next) => {
    try {
        // Hash user password
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        // Create a new user
        const user = await UserModel.create({
            ...req.body,
            password: hashedPassword
        });
        // Generate a session
        req.session.user = {id: user.id}
        // Return response
        res.status(201).json('User registered successfully')

    } catch (error) {
        next(error);

    }
}

export const login = async (req, res, next) => {
    try {
        const { email, username, phone, password } = req.body;
        // Find a user using their unique identifier
        const user = await UserModel.findOne({
            $or: [
                {email: email},
                {username: username},
                {phone: phone}

            ]
            
        });
    
        if (!user) {
            res.status(401).json('No user found');
        } else {
            // Verify their password
            const correctPassword = bcrypt.compareSync(password, user.password);
            if (!correctPassword) {
                res.status(401).json('Invalid Credentials');
            } else {
                // Generate a session
                req.session.user = {id: user.id}
                // Return response
                res.status(200).json('Login Successful')
            }
    
        }
    } catch (error) {
        next(error);
    }
}


export const logout = async (req, res, next) => { 
   try {
     // Destroy user session
     await req.session.destroy();
     // Return response
 res.status(200).json('Logout Successful')
   } catch (error) {
    next(error);
   }
}

export const profile = async (req, res, next) => { 
    // Find a user by id
    try {
        const user = await UserModel
        .findById(req.session.user.id)
        .select({password: false});
        // Return response
        res.status(200).json(user)
    } catch (error) {
        next(error);
    }
}