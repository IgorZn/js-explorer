import mongoose from 'mongoose';

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
        default: 100
    },
    mission: {
        type: String,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    target: {
        type: String,
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

launchesSchema.pre('updateOne', async function (next) {
    console.log('before next');
    console.log('after next');
});

export const LaunchModel = mongoose.model('Launch', launchesSchema)