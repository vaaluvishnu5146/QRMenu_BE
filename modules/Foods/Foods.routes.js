const FoodsModel = require("./Foods.model");


async function getAllFoods(request, response) {
    try {
        const result = await FoodsModel.find();
        
        if(result.length < 1) {
            return response.status(200).json({
                sucess: true,
                message: "No Foood found",
                data: []
            })
        } else {
            return response.status(200).json({
                success: true,
                message: "Foood fetched successfully",
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

async function getAFoodById(request, response) {
    try {
        const result = await FoodsModel.find();
        
        if(result.length < 1) {
            return response.status(200).json({
                sucess: true,
                message: "No Foood found",
                data: []
            })
        } else {
            return response.status(200).json({
                sucess: true,
                message: "Foood fetched successfully",
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

async function getAFoodByRestaurantId(request, response) {
    try {
        const { restaurantId } = request.params;

    if(!restaurantId) {
        return response.status(400).json({
            success: false,
            error: "Missing :restaurantId"
        })
    }

    const result = await FoodsModel.find({
        restaurant: restaurantId
    })

    if(!result) {
        return response.status(404).json({
            success: false,
            message: "No Foood Found",
        })
    } else {
        return response.status(200).json({
            success: true,
            message: "Food fetched successfully",
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

async function createFood(request, response) {
    try {
        const Restaurant = new FoodsModel(request.body);
        const result = await Restaurant.save();
        if(result._id) {
            return response.status(200).json({
                success: true,
                message: "Food created successfully"
            })
        } else {
            return response.status(500).json({
                success: true,
                message: "Food cannot be created"
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

async function updateFood(request, response) {
    try {
        const { foodId } = request.params;
        if(!foodId) {
            return response.status(400).json({
                success: false,
                error: "Missing :foodId"
            })
        }
        
        const result = await FoodsModel.updateOne({ _id: foodId }, request.body, { new: true });

        if(result) {
            return response.status(200).json({
                success: true,
                data: result,
                message: "Food updated successfully"
            })
        } else {
            return response.status(200).json({
                success: false,
                message: "Food cannot be updated"
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

function deleteFood(request, response) {
}

module.exports = {
    getAllFoods, getAFoodById, getAFoodByRestaurantId, createFood, updateFood, deleteFood
};