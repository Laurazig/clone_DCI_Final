import mongoose from "mongoose";

const { Schema } = mongoose;

const mealSchema = new Schema({
    // id: {type: String, required: true},  
    mealName: {type: String, required: true}, 
    img: {type: String, required: true},
    description: {type: String, required: true},
    rating:  {type: Number, required: true}
}, {timestamps: true});

const Meal = mongoose.model("meals", mealSchema);

export default Meal;