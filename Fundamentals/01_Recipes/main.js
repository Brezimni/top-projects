const recipes = [
    {
        'source': 'https://www.indianhealthyrecipes.com/egg-fry-make-egg-fry/',
        'img': 'boiled-egg-fry',
        'ingredients': ['2 Boiled eggs', '1 onion', '1 tomato', '1 green chilies', '1 tabelspoon oil', '1 garlic clove', '1 teaspoon garlic paste', '1/3 teaspoon salt', '1/4 teaspoon red chili powder', '1/2 teaspoon garam masala', '1/8 teaspoon pepper powder'],
        'process': ['Add oil to a pan and heat it. Add cumin, ginger and garlic, allow to sizzle.', 'Add onions, fry until they turn golden, add eggs, tomatoes, turmeric , salt and chili.', 'Fry everything together till the tomatoes turn soft and mushy, if needed sprinkle little water.', 'Add garam masala, chili powder and pepper. fry everything together until the mixture is nicely roasted for about 2 to 3 minutes.', 'Serve egg fry with rice, chapathi or even with bread or buns']
    },
     {
        'source': 'https://www.indianhealthyrecipes.com/simple-cheese-omelette-recipe/',
        'img': 'cheese-omelette',
        'ingredients': ['2 eggs', '1/4 cup onions & bell pepper', 'pinch of salt', 'coriander leaves', '1 1/4 teaspoon oil', 'cheese', '2 pinches red chilli powder', 'pinch of turmeric', '2 pinches of garam masala'],
        'process': ['Whisk eggs well in a bowl.', 'Heat a pan with oil, when it is just hot enough add the onions, other veggies & salt. Saute on a high flame for 1 minute.', 'Add garam masala, turmeric and red chili powder. Mix well. Spread the mixture.', 'Reduce the flame to medium and pour the eggs.', 'Allow to cook until the base is set. Flip it and cook.', 'Fry it to and fro on both the sides until fully cooked. Then add the grated cheese as desired.', 'Fold it half way and cook on a low heat until the cheese melts.', 'Serve cheese omelette warm.']
    },
     {
        'source': 'https://www.indianhealthyrecipes.com/egg-mayo-sandwich-recipe/',
        'img': 'egg-mayo-sandwich',
        'ingredients': ['4 slices Bread', '1 tablespoon butter', '3 Boiled eggs', '3 to 4 tablespoon mayonnaise', '¾ to 1 tablespoon mustard', '¼ teaspoon crushed black pepper', 'salt', '2 tablespoons onion', '1 teaspoon Lemon juice', '½ to ¾ teaspoon Red chill flakes', '1 garlic clove', '1 teaspoon dried herbs', '2 to 3 tablespoons parsley'],
        'process': ['Gently chop boiled eggs to small cubes and add them to a mixing bowl.', 'Add mayonnaise, red chilli flakes, dried herbs, parsley, black pepper, mustard, garlic and onion.', 'Mix well and taste it. If needed then add salt and vinegar or lemon juice.', 'Optionally butter the bread slices and toast them on a griddle or in a toaster.', 'Or you can also toast them in a preheated oven at 350 F or 180 C for 3 to 4 minutes. Adjust the grill time as desired. Over toasting will make it hard.', 'Cool them slightly, then spread the prepared egg salad on a bread slice.', 'Cover with another slice. Cut the sandwich with a serrated knife.', 'Serve egg mayo sandwich within 2 hours of preparing or chill in refrigerator.']
    }
];

let firstClick = true;
const recipeDisplay = document.querySelector('.recipe-image');
const fullRecipe = document.querySelector('.recipe');
const trigger = document.querySelector('.page-title');
const ingredients = document.querySelector('.ingredients');
const title = document.getElementById('dish-name');
const process = document.querySelector('.cooking-process');

const handleNewRecipe = function() {
    let recipeNumber = Math.floor(Math.random()* recipes.length)
    if(firstClick){
        firstClick = false;
        fullRecipe.classList.remove('hidden');
    }
    let ul = document.createElement('ul');
    for(let i = 0; i<recipes[recipeNumber].ingredients.length; i++){
        let li = document.createElement('li');
        li.textContent=recipes[recipeNumber].ingredients[i];
        ul.appendChild(li);
    }
    ingredients.innerHTML = [];
    ingredients.appendChild(ul);
    let ol = document.createElement('ol');
    for(let i = 0; i<recipes[recipeNumber].process.length; i++){
        let li = document.createElement('li');
        li.textContent=recipes[recipeNumber].process[i];
        ol.appendChild(li);
    }
    process.innerHTML = [];
    process.appendChild(ol);
    title.innerText= recipes[recipeNumber].img;
    recipeDisplay.src=`images/${recipes[recipeNumber].img}.jpg`;
}
trigger.addEventListener('click', () => handleNewRecipe());