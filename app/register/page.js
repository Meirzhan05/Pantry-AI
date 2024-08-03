'use client'
import React from 'react';
import { Box, Button } from '@mui/material';
import { UserAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function Register() {
  const { user, googleSignIn } = UserAuth();
  const router = useRouter();


  useEffect(() => {
    if (user) {
      console.log(user);
      router.push('/');
    }
  }, [user, router]);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      style={{ minHeight: '100vh' }}
    >
      <Button
        variant="contained"
        onClick={handleGoogleSignIn}
      >
        Sign in with Google
      </Button>
    </Box>
  );
}