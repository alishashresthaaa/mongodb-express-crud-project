const mongoose = require("mongoose");

// No set structure for mongo document
// Database schema for a single document to define structure in the collection
// defines type, validation

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        // Validation with custom message
        required:[true, "Must provide a name"],
        trim:true,
        maxlength:[20, 'Name cannot be more than 20 characters']
    },
    completed:{
        type:Boolean,
        default:false
    }
})

// Model is representation for collection - Model is wrapper for schema - provides interface for document which help to create, update, delete the document
// Instance of model is called document
module.exports = mongoose.model('Task', TaskSchema)