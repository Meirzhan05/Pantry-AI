'use client';

import { Box, Container, FormControl, Stack, Tabs, Typography, Tab} from "@mui/material";
import {Button, TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import { collection, addDoc, query, onSnapshot, deleteDoc, doc, where } from "firebase/firestore";
import { PantryContext } from "../context/PantryContext";
import { UserAuth } from "../context/AuthContext";
import { db } from "../server/server";
import CustomWebcam from "./camera";
import { addItem } from "../actions";
export default function Pantry() {
  const [newItem, setNewItem] = useState({name: '', quantity: ''});
  const [searchTerm, setSearchTerm] = useState('');
  const { items, saveItems } = useContext(PantryContext);
  const filteredItems = items.filter(item => 
    item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const { user } = UserAuth();
  const [value, setValue] = useState(1);

  const add = (e) => {
    e.preventDefault();
    addItem(user, newItem);
    setNewItem({name: '', quantity: ''});
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
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
  <Box
      display="flex"
      justifyContent="center"
      flexDirection={"column"}
      alignItems="center">
    <Typography variant="h4" sx={{color: "#0D2135", fontWeight: '600', mb: 2}}>Pantry Management</Typography>
    <FormControl sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      m: 4,
      
    }}>
      <TextField
        onChange={(e) => setSearchTerm(e.target.value)}
        id="search"
        variant="outlined"
        placeholder="Search Pantry"
        sx={{
          width: 1000,
        }}
      />
    </FormControl>
    <Box>
      <Tabs 
      value={value}
      onChange={handleChange}>
          <Tab label="Add Using Form" value={1}/>
          <Tab label="Add Using Camera" value={2}/>
      </Tabs>
    </Box>

    {
        value == 2 && <CustomWebcam/>
    }

    {value == 1 && <FormControl sx={{
                margin: 2,
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
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

                  margin: 2
                }}  
              />

              <Button 
                variant="contained"
                onClick={add}
                sx={{
                  margin: 2,
                  width: 100,
                  height: 50,
                }}
              >
                Add
              </Button>
    </FormControl>}
    <Container 
    sx={{
        border: "1px solid #0D2135",
        borderRadius: "20px",
        minWidth: "80vw",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 4
    }}>
      <Stack spacing={2} 
        direction="column" 
        margin={4}
        sx={{ 
          overflowY: 'scroll',
          alignItems: "center",
          width: "100%",
          color: "black"
          }}>
        {(!filteredItems || filteredItems.length === 0) ?
        <Typography 
          >
            No Items
        </Typography> : filteredItems.map((item, index) => (
          item.quantity > 0 &&
          <Box
            key={index}
            sx={{
              padding: 2,
              borderRadius: 3,
              border: "1px solid #0D2135",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}>
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