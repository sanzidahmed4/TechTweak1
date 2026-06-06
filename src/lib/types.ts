import { Types } from "mongoose";
import { IPhone as ModelIPhone } from "./models/Phone";
import { IBrand as ModelIBrand } from "./models/Brand";
import { IPost as ModelIPost } from "./models/Post";

// Lean versions of models to safely type the output of .lean() queries
// This prevents 'any' abuse while keeping TypeScript happy without the massive Document methods.

export type IPhone = Omit<ModelIPhone, keyof import("mongoose").Document> & { 
    _id: string | Types.ObjectId;
    brand_id?: IBrand | Types.ObjectId | unknown; // Sometimes populated
};

export type IBrand = Omit<ModelIBrand, keyof import("mongoose").Document> & { 
    _id: string | Types.ObjectId;
};

export type IPost = Omit<ModelIPost, keyof import("mongoose").Document> & { 
    _id: string | Types.ObjectId;
};
