import { addPhone } from "../actions";
import connectToDatabase from "@/lib/mongodb/mongoose";
import Brand from "@/lib/models/Brand";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Phone from "@/lib/models/Phone";
import PhoneForm from "@/components/admin/PhoneForm";

export default async function AddPhonePage() {
  await connectToDatabase();
  
  // Fetch Brands for dropdown
  let brands: { id: string, name: string }[] = [];
  try {
    const rawBrands = await Brand.find().sort({ order: 1, name: 1 }).lean();
    brands = rawBrands.map((b: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => ({
      id: b._id.toString(),
      name: b.name
    }));
  } catch (error) {
    console.error(error);
  }

  return (
    <PhoneForm 
      brands={brands}
      action={addPhone}
      title="Add New Phone"
      description="Create a new smartphone listing with fully structured professional specifications."
    />
  );
}
