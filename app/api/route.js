import dbConnect from '../../utils/dbConnect';
import Resource from '../../models/resource';

export async function GET(req) {
  return new Response(JSON.stringify({ name: '--hello world' }));
}
export async function POST(req) {
  await dbConnect();
  const postObject = await req.json();
  const response = await Resource.create(postObject);
  return new Response(JSON.stringify(postObject));
}
