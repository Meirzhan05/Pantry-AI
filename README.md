## PantryAI

## Demo
You can view a live demo of the project at [https://your-demo-link.com](https://your-demo-link.com).

## Tech/framework used
<b>Built with</b>
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Firebase](https://react.dev/)
- [Material-UI](https://mui.com/)
- [OpenAI API](https://openai.com/)
- [Groq API](https://groq.com/)

## Features
1. Image Recognition: One of the standout features of Pantry-AI is its ability to recognize items from an image. 

2. Recipe Suggestions: A user cn generate a recipe suggestion based on the available ingredients in the pantry. 

## Code Example

One of the most exciting features of the Pantry-AI project is the ability to recognize items from an image:

```javascript
// This function gets a completion from the OpenAI API
const getCompletion = async () => {
    // Send a request to the OpenAI API
    const response = await client.chat.completions.create({
        // Specify the model to use
        model: "gpt-4o-mini",
        // Specify the response format
        response_format: {
            "type": "json_object"
        },
        // Specify the messages to send to the model
        messages: [
            {
                "role": "user",
                // The content of the message includes both text and an image
                "content": [
                    {
                        // The text part of the message
                        "type": "text", 
                        "text": visionPrompt
                    },
                    {
                        // The image part of the message
                        "type": "image_url",
                        "image_url": {
                            "url": imgSrc,
                        },
                    },
                ]                    
            }
        ]
    });

    // Parse the first choice from the response
    const item = JSON.parse(response.choices[0].message.content);

    // Add the item to the user's pantry
    addItem(user, item);
}
```

In the Pantry-AI project, I implemented a function to generate a cooking prompt based on the ingredients available in the user's pantry:

```javascript
function recipePrompt(pantry) {
    // Map each item in the pantry to a string representation
    const ingredients = pantry.map(item => `${item.name} (${item.quantity})`).join(", ");

    // Construct the prompt string
    const prompt = "You are a professional cook, who is able to cook anything. You have a pantry with the following ingredients: " + ingredients + 
    " You should provide a recipe of a dish that can be cooked with these ingredients. For the style add 2 space between each section."

    // Return the prompt
    return prompt;
}
```

## Installation

Follow these steps to get a development environment running:

1. Clone the repository to your local machine using `git clone https://github.com/Meirzhan05/Pantry-AI`.

2. Install the project dependencies with `npm install`.

3. Create a `.env.local` file in the root directory of the project. This file should contain the following environment variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=<your-firebase-api-key>
NEXT_PUBLIC_AUTH_DOMAIN=<your-auth-domain>
NEXT_PUBLIC_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_STORAGE_BUCKET=<your-storage-bucket>
NEXT_PUBLIC_MESSAGING_SENDER_ID=<your-messaging-sender-id>
NEXT_PUBLIC_APP_ID=<your-app-id>
NEXT_PUBLIC_MEASUREMENT_ID=<your-measurement-id>
```

## How to use?
1. Clone the repository to your local machine using `git clone https://github.com/Meirzhan05/Pantry-AI`.

2. Install the project dependencies with `npm install`.

3. Create a `.env.local` file in the root directory of the project and fill it with your Firebase configuration details.

4. Start the application by running `npm start` in your terminal.

5. Once the application is running, navigate to the pantry page. Here you can add items to your pantry by entering the item's name and quantity.

6. Use the camera feature to take a picture of your pantry items. The application will create a JSON structure of the items in the photo.

7. Once your pantry is populated, navigate to the `Recipe` section and click the `DO THE MAGIC` button. This will generate a recipe suggestion based on your available ingredients.
