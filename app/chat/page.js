
'use client'
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import Chat from './chat';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { UserAuth } from '../context/AuthContext';
function ChatHome() {
  const [showButton, setShowButton] = useState(true);
  const router = useRouter();
  const { user } = UserAuth();

  if (!user) {
    useEffect(() => {
      router.push('/register');
    }, []);
  }
  return (
    <Box>
      {showButton && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // Optional: Set to the full viewport height
          }}>
          <Button 
            variant="contained"
            onClick={() => setShowButton(false)}
            sx={{
              margin: 2,
              width: 150,
              height: 50,
              bgcolor: "#FFA500",
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: "#FF8C00"
              },
            }}
          >
            Do the magic
          </Button>
        </Box>

      )}
      {!showButton && <Chat />}
    </Box>
  );
}

export default ChatHome;