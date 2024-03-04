import mongoose from 'mongoose';
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    email: String,
    name: String,
    userName: String,
    githubId: String,
    image: String,
    admin: Boolean,
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
