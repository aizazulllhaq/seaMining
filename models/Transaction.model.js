const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
    },
    from: {
        type: Number,
        required: true,
    },
    to: {
        type: Number,
        required: true,
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

exports.Transaction = model("Transaction", transactionSchema);
