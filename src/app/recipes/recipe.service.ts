import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>(); 

    private recipes: Recipe[] = [
        new Recipe('Chicken Biryani', 'A super-tasty chicken biryani - just awesome!', 'https://www.africanbites.com/wp-content/uploads/2018/04/IMG_0165.jpg', [
            new Ingredient('Basmati Rice', 1),
            new Ingredient('Chicken', 2),
            new Ingredient('Ginger-Garlic Paste', 2),
            new Ingredient('Shahi Biryani powder', 1),
            new Ingredient('Whole garam masala', 4)
            
        ]),
        new Recipe('Big Fat Burger', 'What else you need to say?', 'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/spicybeefburger_71357_16x9.jpg', [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ])
      ];

      constructor(private slService: ShoppingListService) {}

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
      }
}