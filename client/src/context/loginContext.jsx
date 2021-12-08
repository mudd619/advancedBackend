import { createContext, useContext, useState } from "react";


const CheckContext = createContext("")

function Check({children}){

    const [val,setVal] = useState(false)

    const handleVal = ()=>{
        setVal(true)
    }
    return <CheckContext.Provider value={{val:val,setVal :handleVal}}>{children}</CheckContext.Provider>
}

export {Check,CheckContext}