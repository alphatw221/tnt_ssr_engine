

export function useClickOutsideEvent(useEffect, ref, func, show){
    useEffect(() => {
        const handleClickOutside = (event)=> {
          if (ref.current && !ref.current.contains(event.target)) {
            func()
          }
        }
        if(show){
          document.addEventListener("click", handleClickOutside,true);
        }else{
          document.removeEventListener("click", handleClickOutside,true);
        }
        return () => {document.removeEventListener("click", handleClickOutside,true);};
      }, [ref, func, show]);
}

