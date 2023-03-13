
import { createContext } from 'react';

type ContextProps = {
    path:string,
    milk: number;
    mp3:string,
    setPath:(value: string) => void;
    setMilk: (value: number) => void;
    setMp3:(value: string) => void;
 };
 
 export const MyContext = createContext<ContextProps>({
    path:'',
    milk: 0,
    mp3:'',
    setPath: () => {},
    setMilk: () => {},
    setMp3:() => {},
 });