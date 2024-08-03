'use client';

import { Box, Container, FormControl, Stack, Typography } from "@mui/material";
import {Button, TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import { collection, addDoc, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "./server/server";
import { PantryContext } from "./context/PantryContext";
import { UserAuth } from "./context/AuthContext";
import { where } from "firebase/firestore";
export default function Pantry() {
  const [newItem, setNewItem] = useState({name: '', quantity: ''});
  const [searchTerm, setSearchTerm] = useState('');
  const { items, saveItems } = useContext(PantryContext);
  const filteredItems = items.filter(item => 
    item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const { user } = UserAuth();

  //Add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (!user) {
      return
    }
    if (newItem.name !== '' && (newItem.quantity !== '' || newItem.quantity > 0)) {
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        quantity: newItem.quantity,
        userId: user.uid, 
      });
      setNewItem({name: '', quantity: ''});
    }
  }

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'items'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let itemsArr = [];
        querySnapshot.forEach((doc) => {
          itemsArr.push({...doc.data(), id: doc.id});
        });
        saveItems(itemsArr);
      });
      return () => unsubscribe();
    }
  }, [user]);
  //Delete item from db
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
    saveItems(items.filter(item => item.id !== id))
    // setItems(items.filter(item => item.id !== id));
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
  <Box
      display="flex"
      justifyContent="center"
      flexDirection={"column"}
      alignItems="center"
      height="80vh"
  >
    <Typography variant="h4" sx={{color: "#0D2135", fontWeight: '600', mb: 2}}>Pantry Management</Typography>
    

    <FormControl sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      margin: 2,
    }}>
      <TextField
        onChange={(e) => setSearchTerm(e.target.value)}
        id="search"
        variant="outlined"
        placeholder="Search Pantry"
        sx={{
          margin: 2,
          width: 600,
        }}
      />
    </FormControl>


    <Container 
    sx={{
        width: 680,
        bgcolor: "#0D2135",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
         alignItems: "center"}}>
      <FormControl sx={{
          margin: 2,
          display: "flex",
          flexDirection: "row",
        }}>
        <TextField
          value={newItem.name || ''}
          required={true}
          onChange={(e) => setNewItem({...newItem, name: e.target.value})}
          id="outlined-basic"
          variant="outlined"
          placeholder="Enter Item"
          sx={{
            margin: 2,
            width: 250,
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                border: 'none',
            },
            bgcolor: '#fff',
          }}        
        />
        <TextField
          value={newItem.quantity || ''}
          required
          onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
          placeholder="Quantity"
          type="number"
          inputProps={
            { min: 0 }
            
          }
          sx={{
            width: 150,
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                border: 'none',
            },
            bgcolor: '#fff',
            margin: 2
          }}  
        />

        <Button 
          variant="contained"
          onClick={addItem}
          sx={{
            margin: 2,
            width: 100,
            height: 50,
            bgcolor: "#FFA500",

            '&:hover': {
              bgcolor: "#FF8C00"
            },
          }}
        >
          Add
        </Button>
      </FormControl>

      <Stack spacing={2} direction="column" mb={2} sx={{ overflowY: 'auto', maxHeight: '500px' }}>
        {filteredItems.length > 0 && filteredItems.map((item, index) => (
          item.quantity > 0 &&
          <Box
            key={index}
            sx={{
              bgcolor: "#031625",
              padding: 2,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: 570,
            }}
          >
            <Typography>{capitalizeFirstLetter(item.name)}</Typography>
            <Typography>Quantity: {item.quantity}</Typography>
            <Button 
              onClick={() => deleteItem(item.id)}
              variant="contained" 
              sx={
                {bgcolor: "red"}
              }>
                Remove
            </Button>
          </Box>
        ))}
      </Stack>
    </Container>
  </Box>
  );
}