import { createContext } from "react";
import { useState } from "react";
export const PantryContext = createContext(null);

export const PantryProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const saveItems = (items) => {
        setItems(items);
    }

    return (
        <PantryContext.Provider value={{items, saveItems}}>
            {children}
        </PantryContext.Provider>
    )
}