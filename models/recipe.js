import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const recipeSchema = new Schema ({
    name: {type: String, unique: true, required: true},
    categoryId: {type: Types.ObjectId, ref: 'Category', required: true},
    description: {type: String, required: true},
    ingredients: [{type: String}],
    image: {type: String, required: true},
    favourite: { type: Boolean, default: false}
}, {
    timestamps: true 
});

export const RecipeModel = model('Recipe', recipeSchema);

recipeSchema.plugin(toJSON) 