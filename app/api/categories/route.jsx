import dbConnect from '@/utils/dbConnect';
import Resource from '@/models/Resource';

export async function GET(req) {
  await dbConnect();
  const uniqueCategories = await Resource.distinct('categories');
  return new Response(JSON.stringify(uniqueCategories));
}
