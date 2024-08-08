import { CategoryModel } from "../models/category.js";

export const getCategories = async (req, res, next) => {
    try {
        // return res.json(req.query);
         // Get query parameters(params)
         const {
            limit = 10, 
            skip = 0, 
            filter = "()", 
            fields = "()",
            sort = "()",
        } = req.query;
        //  console.log(filter);

        // Get all categories from database
        const allCategories = await CategoryModel
        .find(JSON.parse(filter))
        .select(JSON.parse(fields))
        .sort(JSON.parse(sort))
        .limit(limit)
        .skip(skip);

        // Return response
        res.status(201).json(allCategories);
        
    } catch (error) {
        next(error);
        
    }
}
export const postCategory = async (req, res, next) => {
    try {
        // Add category to database
        const newCategory = await CategoryModel.create({
            ...req.body,
            image: req.file.filename
        });
        // Return response
        res.status(201).json(newCategory);
    } catch (error) {
        next(error)
        
    }
}