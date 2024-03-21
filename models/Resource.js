import mongoose from 'mongoose';
const { Schema } = mongoose;
const resourceSchema = new Schema(
  {
    title: String,
    description: String,
    url: String,
    image: String,
    categories: Array,
    contributorsGithubID: String,
    contributorsPhoto: String,
    contributorsName: String,
    published: Boolean,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Resource =
  mongoose.models.Resource || mongoose.model('Resource', resourceSchema);
export default Resource;
