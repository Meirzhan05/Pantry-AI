'use client'

import React, { useContext, useEffect, useState } from 'react';
import Groq from "groq-sdk";
import { PantryContext } from '../context/PantryContext';
import recipePrompt from './prompt';
import { marked } from 'marked';
import { Box, Typography } from '@mui/material';

function Chat() {
    const [chatResponse, setChatResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Add this line

    const { items, saveItems } = useContext(PantryContext);

    useEffect(() => {

      const fetchData = async () => {
        setIsLoading(true); // Set isLoading to true when the request starts
        const prompt = recipePrompt(items)
        const response = await getChatCompletion(prompt);
        setChatResponse(response)
        setIsLoading(false); // Set isLoading to false when the request is finished
      }
      if (items.length > 0) {
        fetchData()
      }

    }, [items])

    const htmlResponse = chatResponse ? marked(chatResponse) : '';
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Add this
          alignItems: 'center', // And this
          backgroundColor: '#F3F3F3',
          color: 'black',
          margin: 2,
          padding: 5,
          fontSize: 20,
          height: '100vh',
        }}
      >
        {isLoading ? <Typography>...Loading...</Typography> : <div dangerouslySetInnerHTML={{ __html: htmlResponse }} />}

      </Box>
    );
}

async function getChatCompletion(prompt) {
  const groq = new Groq({apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY, dangerouslyAllowBrowser: true});

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
    model: "llama-3.1-70b-versatile",
  });
  return response.choices[0].message.content;
}

export default Chat;