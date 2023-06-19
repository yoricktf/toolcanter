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
    published: Boolean,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Resource =
  mongoose.models.Resource || mongoose.model('Resource', resourceSchema);
export default Resource;
