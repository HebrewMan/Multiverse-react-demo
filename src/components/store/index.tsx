
import { createContext } from 'react';

type ContextProps = {
  milk: number;
   setMilk: (value: number) => void;
 };
 
 export const MyContext = createContext<ContextProps>({
  milk: 0,
  setMilk: () => {},
 });