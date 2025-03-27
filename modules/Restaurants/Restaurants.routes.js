const RestaurantModel = require("./Restaurant.model");


async function getAllRestaurants(request, response) {
    try {
        const result = await RestaurantModel.find();
        
        if(result.length < 1) {
            return response.status(200).json({
                sucess: true,
                message: "No Restaurants found",
                data: []
            })
        } else {
            return response.status(200).json({
                success: true,
                message: "Restaurants fetched successfully",
                data: result
            })
        }

    } catch (error) {
        return response.status(500).json({
            sucess: false,
            error: error.message,
            message: "Something went wrong"
        })
    }
}

async function getARestaurantById(request, response) {
    try {
        const { restaurantId } = request.params;

    if(!restaurantId) {
        return response.status(400).json({
            success: false,
            error: "Missing :restaurantId"
        })
    }

    const result = await RestaurantModel.findOne({
        _id: restaurantId
    })

    if(!result) {
        return response.status(404).json({
            success: false,
            message: "No Restaurant Found",
        })
    } else {
        return response.status(200).json({
            success: true,
            message: "Restaurant fetched successfully",
            data: result
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

async function getFoodsByRestaurantId(request, response) {
    try {
        const { restaurantId } = request.params;

    if(!restaurantId) {
        return response.status(400).json({
            success: false,
            error: "Missing :restaurantId"
        })
    }

    const result = await RestaurantModel.findOne({
        _id: restaurantId
    })

    if(!result) {
        return response.status(404).json({
            success: false,
            message: "No Restaurant Found",
        })
    } else {
        return response.status(200).json({
            success: true,
            message: "Restaurant fetched successfully",
            data: result
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

async function createRestaurant(request, response) {
    try {
        const Restaurant = new RestaurantModel(request.body);
        const result = await Restaurant.save();
        if(result._id) {
            return response.status(200).json({
                success: true,
                message: "Restaurant created successfully"
            })
        } else {
            return response.status(500).json({
                success: true,
                message: "Restaurant cannot be created"
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

async function updateRestaurant(request, response) {
    try {
        const { restaurantId } = request.params;
        if(!restaurantId) {
            return response.status(400).json({
                success: false,
                error: "Missing :restaurantId"
            })
        }
        
        const result = await RestaurantModel.updateOne({ _id: restaurantId }, request.body, { new: true });

        if(result) {
            return response.status(200).json({
                success: true,
                message: "Restaurant updated successfully"
            })
        } else {
            return response.status(200).json({
                success: false,
                message: "Restaurant cannot be updated"
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

function deleteRestaurant(request, response) {
}

module.exports = {
    getAllRestaurants,
    getARestaurantById, 
    getFoodsByRestaurantId,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};