import mongoose from 'mongoose';
const { Schema } = mongoose;
const favoritesSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    resource: { type: Schema.Types.ObjectId, ref: 'Resource' },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Favorites =
  mongoose.models.Favorites || mongoose.model('Favorites', favoritesSchema);
export default Favorites;
