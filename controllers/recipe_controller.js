import { RecipeModel } from "../models/recipe.js";

export const getRecipes = async (req, res, next) => {
    try {
        // Get query parameters(params)
        const {limit, skip, search} = req.query;

        // Get all recipes from database
        const allRecipes = await RecipeModel
        .find({name: search})
        .limit(limit)
        .skip(skip);
        
        // Return all recipes as response
        res.json(allRecipes);
    } catch (error) {
        next(error)
    }
}

// Post Recipes
export const postRecipes = async (req, res, next) => {
    try {
        // Add recipe to database
        const newRecipe = await RecipeModel.create({
            ...req.body,
            image: req.file.filename
        });
        // Return response
        res.json("Recipe Added")
    } catch (error) {
        next(error);
    }
}

// Patch Recipe
export const patchRecipe = async (req, res, next) => {
    try {
        // Update recipe by id
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(req.params.id, req.body);
        // Return response
        res.json(updatedRecipe, {new: true});
    } catch (error) {
        next(error);

    }

}



// Delete Recipe
export const deleteRecipe = async (req, res, next) => {
    try {
        // delete recipe by id
        const deletedRecipe = await RecipeModel.findByIdAndDelete(req.params.id);
        // return response
        res.json(`Recipe with Id ${req.params.id} Deleted`);
    } catch (error) {
        next(error);
    }


}

// Get Recipe
export const getRecipe = (req, res) => {
    res.json(`Get recipe with ID ${req.params.id}`);
}


// // PATCH /recipes/:id
// export const patchRecipe = async (req, res, next) => {
//     try {
//         const { id } = req.params;

//         // Find the recipe by ID
//         const recipe = await RecipeModel.findById(id);

//         // Update the 'favourites' field to true
//         recipe.favourite = true;

//         // Save the updated recipe
//         await recipe.save();

//         // Return response
//         res.json({ message: "Recipe favourites updated to true", recipe });
//     } catch (error) {
//         next(error);
//     }
// }
