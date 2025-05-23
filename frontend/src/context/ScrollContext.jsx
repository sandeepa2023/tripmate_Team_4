import { createContext, useContext } from 'react';

const ScrollContext = createContext(null);

export function useScroll() {
  return useContext(ScrollContext);
}

export { ScrollContext }; 