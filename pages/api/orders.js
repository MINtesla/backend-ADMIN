import {mongooseConnect} from "@/lib/mongoose";
import {Order} from "@/models/Order";

export default async function handler(req,res) {

  const {method} = req;
  await mongooseConnect();
  //await isAdminRequest(req,res);
  res.json(await Order.find().sort({createdAt:-1}));

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Order.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}