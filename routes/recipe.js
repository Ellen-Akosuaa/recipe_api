import { Router } from "express";
import { deleteRecipe, getRecipe, getRecipes, patchRecipe, postRecipes } from "../controllers/recipe_controller.js";
import { remoteUpload } from "../middlewares/uploads.js";
import { checkUserSession } from "../middlewares/auth.js";



// Create Router
const recipeRouter = Router();


//Define routes 

recipeRouter.get('/recipes', getRecipes);

recipeRouter.post('/recipes', checkUserSession, remoteUpload.single('image'), postRecipes);

recipeRouter.patch('/recipes/:id', checkUserSession, patchRecipe);

recipeRouter.delete('/recipes/:id', checkUserSession, deleteRecipe);

recipeRouter.get('/recipes/:id', getRecipe);

// Export router
export default recipeRouter;