import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema( {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true, },
    street: { type: String, required: true, },
    houseNo: { type: String, required: true, },
    zipCode: { type: String, required: true, },
    city: { type: String, required: true, },
    // meals: [ { type: mongoose.Types.ObjectId, ref: "Meal" } ],
    orders: [ { type: mongoose.Types.ObjectId, ref: "Order" } ]
}, { timestamps: true } );

const User = mongoose.model( "User", userSchema );

export default User;

