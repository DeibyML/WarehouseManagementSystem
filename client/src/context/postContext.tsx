import { useState, useContext, createContext } from 'react'
import { GlobalContext } from '../models/globalContext';

const AppContext = createContext({});

export const MyContext = () => {
  const myCont = useContext(AppContext);
  return myCont;
};

const PostContainer = ({ children }:any) => {
    console.log(children);
    
    const [globalContext, setGlobalContext ]= useState([]);
    
    return <AppContext.Provider value={{
        globalContext,
        setGlobalContext
    }}>
        { children }
    </AppContext.Provider>
    
}

export default PostContainer;