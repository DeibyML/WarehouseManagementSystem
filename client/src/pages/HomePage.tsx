import { useContext } from 'react';
import { MyContext } from '../context/postContext';

export const HomePage = () => {
  const myContext = useContext(MyContext as any);

  console.log(myContext);
  
  
  return (
    <div>HomePage</div>
  )
}
