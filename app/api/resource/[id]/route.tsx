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

export async function PATCH(request: Request, context: { params: any }) {
  await dbConnect();
  const newResource = await request.json();

  const resource = await Resource.findByIdAndUpdate(
    context.params?.id,
    {
      $set: { ...newResource },
    },
    { new: true }
  );
  return new Response(JSON.stringify(resource));
}
