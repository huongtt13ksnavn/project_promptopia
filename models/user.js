import {Schema, models, model} from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exist! '],
        required: [true, 'Email is required! ']
    },
    username: {
        type: String,
        required: [true, 'Email is required! '],
        match: [/^[a-zA-Z0-9]+$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String
    }
})

const User = models.User || model('User', UserSchema)

export default User