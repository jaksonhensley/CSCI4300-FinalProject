const { Schema, model } = require("mongoose");

const PwdResetTokenSchema = new Schema({
    token: String,
    userId: Schema.Types.ObjectId
});

const PwdResetToken = model("PwdResetToken", PwdResetTokenSchema);
module.exports = PwdResetToken;