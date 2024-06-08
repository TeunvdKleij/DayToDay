import { useEffect } from 'react';
import Mousetrap from 'mousetrap';

const useMousetrap = (key: string, callback: () => void) => {
  useEffect(() => {
    Mousetrap.bind(key, callback);
    
    return () => {
      Mousetrap.unbind(key);
    };
  }, [key, callback]);
};

export default useMousetrap;