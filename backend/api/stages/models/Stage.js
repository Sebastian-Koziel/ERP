import mongoose from "mongoose";

const StageSchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
});

const Stage = mongoose.model("Stage", StageSchema);

module.exports = Stage;