const OrderModel = require("./Orders.model");

async function getAllOrders(request, response) {
    try {
        const result = await OrderModel.find().populate([{path: 'user', select: 'name email -_id'}, {path: "restaurant", select: "name -_id"}]).exec();
        
        if(result.length < 1) {
            return response.status(200).json({
                sucess: true,
                message: "No Orders found",
                data: []
            })
        } else {
            return response.status(200).json({
                sucess: true,
                message: "Orders fetched successfully",
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

async function getAllOrdersByRestaurantId(request, response) {
    try {
        const result = await OrderModel.find();
        
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

async function getAllOrdersByUserId(request, response) {
    try {
        const result = await OrderModel.find();
        
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

async function getAOrderById(request, response) {
    try {
        const result = await OrderModel.find();
        
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

async function createOrder(request, response) {
    try {
        const Restaurant = new OrderModel(request.body);
        const result = await Restaurant.save();
        if(result._id) {
            return response.status(200).json({
                success: true,
                message: "Order created successfully"
            })
        } else {
            return response.status(500).json({
                success: true,
                message: "Order cannot be created"
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

async function updateOrder(request, response) {
    try {
        const { foodId } = request.params;
        if(!foodId) {
            return response.status(400).json({
                success: false,
                error: "Missing :foodId"
            })
        }
        
        const result = await OrderModel.updateOne({ _id: foodId }, request.body, { new: true });

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

function deleteOrder(request, response) {
}

module.exports = {
    getAllOrders, getAllOrdersByRestaurantId, getAllOrdersByUserId, getAOrderById, createOrder, updateOrder, deleteOrder
};