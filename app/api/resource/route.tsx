import dbConnect from '@/utils/dbConnect';
import Resource from '@/models/Resource';

export async function POST(request: Request) {
  await dbConnect();
  const resource = await request.json();
  const newProposedResource = await Resource.create(resource);
  console.log(newProposedResource);
  return new Response(JSON.stringify(newProposedResource));
}
