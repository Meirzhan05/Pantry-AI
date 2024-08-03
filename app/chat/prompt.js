function recipePrompt(pantry) {
    const ingredients = pantry.map(item => `${item.name} (${item.quantity})`).join(", ");
    const prompt = "You are a professional cook, who is able to cook anything. You have a pantry with the following ingredients: " + ingredients + 
    " You should provide a recipe of a dish that can be cooked with these ingredients. For the style add 2 space between each section."
    console.log("Prompt: ", prompt)
    return prompt;
}

export default recipePrompt;