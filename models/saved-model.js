import mongoose from 'mongoose';

const savedNewsSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    title : String,
    description : String,
    content : String,
    url : String,
    category : String,
    source : String,
    audioUrl : String,
},{
    timestamps : true
});
export const SavedNews = mongoose.model('SavedNews', savedNewsSchema);