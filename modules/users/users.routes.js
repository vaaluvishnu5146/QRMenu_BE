const Users  = require("./users.model");
const { createHashFromPassword, isPasswordMatching, createJWTToken } = require('./users.utils');
const usersModel = require('./users.model');
let users = [];

// GET ALL USERS
async function getAllUsers(request, response) {
    try {
        const results = await Users.find();
        return response
            .status(200)
            .json({message: "Users fetched successfully", data: results})
    } catch(error) {
        return response
        .status(500)
        .json({message: "Internal server error", error: error.message})
    }
}

// GET A USER
function getAUser(request, response) {
    const { userId } = request.params;
    if(!userId) {
        return response.status(400).json({
            message: "Bad request"
        })
    } else {
        const matchingUser = users.find((user) => user.id === userId)
        if(matchingUser) {
            return response
            .status(200)
            .json({message: "User fetched successfully", data: matchingUser})
        } else {
            return response
            .status(201)
            .json({message: "No user found"})
        }
    }
}

// CREATE A USER
async function createAUser(request, response) {
    try {
        const newUser = new Users(request.body);
        const result = await newUser.save();
        return response
            .status(200)
            .json({message: "Users created successfully", result: result})
    } catch(error) {
        return response
        .status(500)
        .json({message: "Internal server error", error: error.message})
    }
}

// CREATE ACCOUNT
async function createAccount(request, response) {
    try {
        const newUser = new Users(request.body); // First layer of validation done

        if(!request.body.password) {
            return response
                .status(400)
                .json({message: "Password is missing", error: "Bad request"})
        }

        newUser.password = await createHashFromPassword(newUser.password)
        const result = await newUser.save();
        return response
            .status(200)
            .json({success: true, message: "Users created successfully", result: result})
    } catch(error) {
        return response
        .status(500)
        .json({success: false, message: "Internal server error", error: error.message})
    }
}

// SIGNIN USER
async function signinUser(request, response) {
    try {
        const { email, password } = request.body;
        // First layer of defence
        if(!email || !password) {
            return response
            .status(400)
            .json({success: false, message: "Invalid credentials", error: "Bad credentials"})
        }
        
        const matchingUser = await Users.findOne({ email: email });

        if(!matchingUser) {
            return response
            .status(404)
            .json({success: false, message: "No user found", error: "Error finding user"})
        }

        const isMatching = await isPasswordMatching(password, matchingUser.password)

        if(!isMatching) {
            return response
            .status(401)
            .json({success: false, message: "Bad credentials", error: "Password isn't matching"})
        }

        const token = await createJWTToken({ _id: matchingUser._id, email: matchingUser.email, role: matchingUser.role })

        response.header("Authorization", token);
        
        return response.status(200).json({
            success: true,
            message: "Login successful",
            _tk: token
        });

    
    } catch(error) {
        return response
        .status(500)
        .json({success: false, message: "Internal server error", error: error.message})
    }
}

// UPDATE A USER
async function updateAUser(request, response) {
    try {
        const { userId } = request.params;
        if(!userId) {
            return response.status(400).json({
                success: false,
                error: "Missing :userId"
            })
        }
        
        const result = await usersModel.updateOne({ _id: userId }, request.body, { new: true });

        if(result) {
            return response.status(200).json({
                success: true,
                message: "User updated successfully"
            })
        } else {
            return response.status(200).json({
                success: false,
                message: "User cannot be updated"
            })
        }

    } catch (error) {
        return response.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}

// DELETE A USER
function deleteAUser(request, response) {
    const { userId } = request.params;
    if(!userId) {
        return response.status(400).json({
            message: "Bad request"
        })
    } else {
        const filteredUsers = users.filter((user) => user.id !== userId);
        users = filteredUsers;
        return response
            .status(201)
            .json({message: "Users deleted successfully!"})
    }
}

// ASSIGN RESTAURANT TO USER
async function assignRestaurantToUser(request, response) {
    try {
        const { userId } = request.params;
        if(!userId || !request.body.restaurantId) {
            return response.status(400).json({
                success: false,
                error: !userId ? "Missing :userId" : "Missing :restaurantId"
            })
        }
        
        const result = await usersModel.updateOne({ _id: userId }, { restaurant: request.body.restaurantId }, { new: true });

        if(result) {
            return response.status(200).json({
                success: true,
                data: result,
                message: "User updated successfully"
            })
        } else {
            return response.status(200).json({
                success: false,
                message: "User cannot be updated"
            })
        }

    } catch (error) {
        return response.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}

module.exports = {
    getAllUsers,
    getAUser,
    createAUser,
    updateAUser,
    deleteAUser,
    createAccount,
    signinUser,
    assignRestaurantToUser
};