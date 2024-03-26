import mongoose from 'mongoose';

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
        default: 100
    },
    mission: {
        type:String,
        required: true
    },
    rocket: {
        type:String,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    target: {
        ref: 'Planet',
        type: mongoose.ObjectId,
        required: true
    },
    customer: [],
    upcoming: {
        type: Boolean,
        required: true
    },
    success: {
        type: Boolean,
        required: true,
        default: true
    },
})

export const LaunchModel = mongoose.model('Launch', launchesSchema)