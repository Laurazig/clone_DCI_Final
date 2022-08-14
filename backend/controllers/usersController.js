import User from "../models/user.js";
import createError from "http-errors";

// ==============================================
// GET the logged in Meals's data - display  *change employee to user*
// ==============================================

export const getMealsData = async (req, res, next) => {
    const employeeId = req.params.id;

    let foundEmployee;
    try {
        foundEmployee = await User.findById(employeeId);
    } catch {
        return next(createError(500, "Could not query database. Please try again!"));
    }

    // If a user was found with the same id as the :id parameter...
    if (foundEmployee) {
        // Populate the data in model called Meal
        await foundEmployee.populate("meals", {_id: 1, mealName: 1, category: 1, amount: 1})

        const employeeData = {
        
            meals: foundEmployee.meals
        }
        res.json(employeeData);
    
    } else {
        next(createError(404, "Employee could not be created. Please try again"))
    }
}

// =======================================================
// ? POST a new meal to the meals page  is this for company database or userMeal selection???*for employees which we will not have to create****
// =======================================================

export const updatedMeals = async (req, res, next) => {
    const employeeId = req.params.id; // employee id
    const mealId = req.body.id; // new meal id from the frontend

    // is the employee found?
    let foundEmployee;
    try{
        foundEmployee = await User.findById(employeeId)
    }catch{
        return next(createError(500, "Employee could not be created. Please try again!"))
    };

    // are the meals found?
    const foundMeal = foundEmployee.meals.find( existingId => existingId === mealId);

    if(!foundMeal) {
        let updatedMeal;
        try{
            updatedMeal = await User.findByIdAndUpdate(
                employeeId,
                {$push: {meals: mealId}},
                {new: true, runValidators: true}
            )
        }catch{
            return next(createError[500]("Could not be posted. Please try again!"));
        }

        // Populate all the meals and the new meal added
        await updatedMeal.populate("meals", {_id: 1, mealName: 1, category: 1, amount: 1})

        res.status(201).json({meals: updatedMeal.meals})

    } else {
        next(new createError[409]("The meal already exists in your collection!"));
    }

}

// =======================================================
// DELETE all meals from the page *?is this emloyee to delete all in database?*
// ==========================================================
export const deleteAllMeals = async (req, res, next) => {
    const employeeId = req.params.id;

    let foundEmployee;
    try{
        foundEmployee = await User.findByIdAndUpdate(employeeId, {meals: []}, {new: true, runValidators: true})
    }catch{
        return next(createError(500, "Meals could not be deleted. Please try again!"))
    }

     // Populate after you delete albums. However, it is irrelevant.
     await foundEmployee.populate("meals");

    res.json(foundEmployee.meals)
}
// =============================================================
// DELETE a single meal from the page  /***is Sameer using this? */
// =============================================================
export const deleteSingleMeal = async (req, res, next) => {
    const employeeId = req.params.id;
    const mealId = req.params.mealId;

    let foundEmployee;
    try{
        foundEmployee = await User.findByIdAndUpdate(
            employeeId,
            {$pull: {meals: mealId}},
            {new: true, runValidators: true}
        )
    }catch{
        return next(createError(500, "The meal could not be deleted. Please try again!"))
    }

    // Populate after you delete a single album
    await foundEmployee.populate("meals");

    res.json({meals: foundEmployee.meals})
}


//=============================================================
// DELETE a customer or employee account //*change to user and can delete their own?* 
// =============================================================

export const deleteAccount = async (req, res, next) => {
    const userId = req.params.id;

    let foundUser;
    try{
        foundUser = await User.findByIdAndRemove(userId)
    }catch{
        return next(createError(500, "Account could not be deleted. Please try again!"))
    }

    res.json({ message: `The account belong to ${foundUser.firstName} has been successfully deleted. Come back soon!` });
}

//=============================================================
// PATCH an order  **change customer to user*
// =============================================================

export const updatedOrder = async (req, res, next) => {
    const customerId = req.params.id;
    const orderId = req.params.id;

    // Is the customer found?
    let foundCustomer;
    try{
        foundCustomer = await User.findById(customerId);
    }catch{
        return next(createError(500, "Customer could not be queried. Please try again!"));
    }


    // Is the order ordered by the customer already exist?
    const foundOrder = foundCustomer.orders.find(existingId => existingId == orderId); //! The orderId will be a composite id, which is userId + orderID

    // If the customer is found, then post the order of the customer
    if(!foundOrder) {
        let updatedOrder;
        try{
            updatedOrder = await User.findByIdAndUpdate(
                customerId,
                {$push: {orders: orderId}},
                {new: true, runValidators: true}
            )
        }catch{
            return next(createError(500, "Order could not be queried. Please try again!"))
        }

        // Populate the ordered meals
        await updatedOrder.populate("orders", {id: 1, mealName: 1, category: 1, amount: 1});

        res.status(201).json({orders: updatedOrder.orders});

    } else {
        next(createError(409, "The customer order could not be submitted. Please try again!"))
    }
}