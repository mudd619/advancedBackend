import { Button, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { useNavigate } from "react-router";
import { CheckContext } from "../context/loginContext";


function Login(){

    const [inp,setInp] = useState("");
    const {val,setVal} = useContext(CheckContext);
    const navigate = useNavigate()

    const handleInput = (e)=>{
        const {name,value} = e.target;
        setInp({...inp,[name]:value});
    }

    const handleSubmit = ()=>{
        try{
            
            if(!inp.email){
                return alert("Please Enter a email")
            }
            const email = inp.email.trim().split("").reverse().join("");
            
            var sum = ""
            for(var i=0 ; i<16 ; i++){
                sum = sum + email[i]
            }
            
            sum = sum.split("").reverse().join("");
            
            if(sum === ".masaischool.com"){
                navigate("/admin")
                setVal()
                return 
            }
           
            return alert("Invalid User (Email)")
        }
        catch(err){
            console.log(err.mesage)
        }
    }

    return <div style={{border:"1px solid #ada7a7",width:"40%",margin:"4% 3% 5% 30%",paddingBottom:"2%",borderRadius:"5px",backgroundColor:"#dbcece"}}>
        <h1>Login</h1>
        <TextField onChange={handleInput} name="email" style={{marginTop:"3%",width:"50%"}} id="outlined-basic" label="Enter Email" variant="outlined" /><br/>
        <TextField onChange={handleInput} style={{margin:"3%",width:"50%"}} name="password" id="outlined-basic" type="password" label="Enter Password" variant="outlined" /><br/>
        <Button onClick={handleSubmit} variant="contained" color="success">Submit</Button>
    </div>
}

export {Login}