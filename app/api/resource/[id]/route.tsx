import dbConnect from '@/utils/dbConnect';
import Resource from '@/models/Resource';
// interface Response {
//   id: number;
// }

export async function GET(request: Request, context: { params: any }) {
  await dbConnect();
  const resource = await Resource.findById(context.params?.id);
  return new Response(JSON.stringify(resource));
}
