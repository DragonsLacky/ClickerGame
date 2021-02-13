import { Schema, model  } from 'mongoose';

const UserSchema = new Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    avatarImage: {type: String, default: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"},
    password: {type: String, required: true}
},{
    timestamps: true
})

const User = model("users", UserSchema);

export default User;