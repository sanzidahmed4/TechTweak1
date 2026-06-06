import { editPhone } from "../../actions";
import connectToDatabase from "@/lib/mongodb/mongoose";
import Brand from "@/lib/models/Brand";
import Phone from "@/lib/models/Phone";
import PhoneForm from "@/components/admin/PhoneForm";
import { notFound } from "next/navigation";

export default async function EditPhonePage(props: { params: Promise<{ id: string }>, searchParams: Promise<{ returnUrl?: string }> }) {
  const { id } = await props.params;
  const { returnUrl } = await props.searchParams;
  await connectToDatabase();
  
  // Fetch Phone to edit
  let phone = null;
  try {
    const rawPhone = await Phone.findById(id).lean();
    if (rawPhone) {
      const formattedPhone = {
        ...rawPhone,
        _id: rawPhone._id.toString(),
        brand_id: rawPhone.brand_id?.toString()
      };
      phone = JSON.parse(JSON.stringify(formattedPhone));
    }
  } catch (err) {
    console.error(err);
  }

  if (!phone) {
    notFound();
  }

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

  const updatePhoneWithId = editPhone.bind(null, phone._id);

  return (
    <PhoneForm 
      initialData={phone}
      brands={brands}
      action={updatePhoneWithId}
      title="Edit Phone Specs"
      description={`Update specifications, highlights, media, pros & cons, FAQs and SEO attributes for ${phone.name}.`}
      returnUrl={returnUrl}
    />
  );
}
