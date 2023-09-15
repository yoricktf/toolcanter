import dbConnect from '@/utils/dbConnect';
import Resource from '@/models/Resource';

export async function GET(req) {
  await dbConnect();
  const foundResources = await Resource.find();
  return new Response(JSON.stringify(foundResources));
}

export async function POST(req, res) {
  await dbConnect();
  const resource = await req.json();
  const newProposedResource = await Resource.create(resource);
  console.log(newProposedResource);
  return new Response(JSON.stringify(newProposedResource));
}
