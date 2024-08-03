'use client'
import { useEffect } from 'react';
import { UserAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation'
import { Box } from '@mui/material';
import Pantry from './pantry';
export default function Home() {
  const router = useRouter();
  const { user } = UserAuth();

  useEffect(() => {

    if (!user) {
      router.push('/register');
    }
  }, []);

  return (
    <Box>
      <Pantry />
    </Box>
  );
}