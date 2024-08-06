'use client'
import { useEffect } from 'react';
import { UserAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation'
import Pantry from './components/pantry';
import { Box } from '@mui/material';
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