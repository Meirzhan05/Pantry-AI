'use client'

import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { UserAuth } from './context/AuthContext';

export default function NavBar() {
  const { user, logout } = UserAuth();
    const handleLogOut = async () => {
        await logout();
    }
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            gap={20}
            width={"100%"}
            // bgcolor="#0D2135"
            color="black"
            px={4}
            py={2}
        >
                <Link href={'/'}>
                    <Typography sx={{ cursor: 'pointer', '&:hover': { color: '#FF8C00', textDecoration: 'underline' } }}>
                        Pantry
                    </Typography>
                </Link>
                <Link href={'/chat'}>
                    <Typography sx={{ cursor: 'pointer', '&:hover': { color: '#FF8C00', textDecoration: 'underline' } }}>
                        Recipe
                    </Typography>
                </Link>
                <Link href={'/register'} onClick={handleLogOut}>
                    <Typography sx={{ cursor: 'pointer', '&:hover': { color: '#FF8C00', textDecoration: 'underline' } }}>
                        Logout
                    </Typography>
                </Link>
        </Box>

    );
}