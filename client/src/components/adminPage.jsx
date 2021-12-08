import {Button, Fab, FormControl, Grid,  IconButton,  InputLabel,  ListItemText,  MenuItem,  Select,  TextField, ToggleButton, ToggleButtonGroup} from "@mui/material"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CheckContext } from "../context/loginContext";
import axios from "axios"

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function Admin(){

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [data,setData] = useState([])

    const navigate = useNavigate();
    const {val} = useContext(CheckContext);

    function GetIt(){
        setLoading(true)
        axios.get("http://localhost:2345/student")
        .then((res)=>{
            setLoading(false)
            setData(res.data)
        })
        .catch((err)=>{
            setLoading(false)
            setError(true)
        })
    }

    useEffect(()=>{
        if(!val){
          navigate("/login")
          return 
        }
        GetIt()
      },[])

      //handling input datas
    const [inp , setInp] = useState("");
    const [inp2 , setInp2] = useState("");
    
    const handleInp = (e)=>{
        const {name,value} = e.target;
        setInp({...inp,[name]:value})
    }
    const handleSubmit = ()=>{
        if(!inp.name || !inp.city || !inp.age || !inp.education || !inp.gender || !inp.contact){
            return alert("Please Enter all the fields")
        }
        setLoading(true)
        axios.post("http://localhost:2345/student",inp)
        .then((res)=>{
            setLoading(false);
            GetIt()
        })
        .catch((err)=>{
            setLoading(false)
            setError(true)
        })
        setInp({...inp,name:"",city:"",age:"",education:"",gender:"",contact:""})
    }

    const handleDelete = (id)=>{
        setLoading(true);
        axios.delete("http://localhost:2345/student/"+id)
        .then((res)=>{
            setLoading(false);
            GetIt()
        })
        .catch((err)=>{
            setLoading(false)
            setError(true)
        })
    }

    const handleName = ()=>{
        setLoading(true);
        axios.get("http://localhost:2345/student/name")
        .then((res)=>{
            setLoading(false);
            setData(res.data);
        })
        .catch((err)=>{
            setLoading(false)
            setError(true)
        })
    }

    const handleAge = ()=>{
        setLoading(true);
        axios.get("http://localhost:2345/student/age")
        .then((res)=>{
            setLoading(false);
            setData(res.data);
        })
        .catch((err)=>{
            setLoading(false)
            setError(true)
        })
    }

    const handleInp2 = (e)=>{
        const {name,value} = e.target;
        setInp2({...inp2,[name]:value})
    }
    const handleSubmit2 = ()=>{
        if(!inp2.title || !inp2.category || !inp2.deadline || !inp2.tag ){
            return alert("Please Enter all the fields")
        }
        
        axios.post("http://localhost:2345/contest",inp2)
        .then((res)=>{

        })
        .catch((err)=>{
            setError(true)
        })
        setInp2({...inp2,title:"",deadline:"",tag:""});
        
    }

    
    // const data = ['one','two','three','four','five']
    return loading ? "...loading" : error ? "....error" : <div>
    <h1>Admin Page</h1>
    <div style={{border:"1px solid black",margin:"1% 1% 1% 1%",borderRadius:"5px",backgroundColor:"#defabe"}}>
        <h3>Add a Student</h3>
        <TextField onChange={handleInp} value={inp.name} name= "name" label="Enter Name" variant="outlined" />
        <TextField onChange={handleInp} value={inp.city} name= "city" label="Enter City"  variant="outlined" />
        <TextField onChange={handleInp} value={inp.age} name= "age" type="number" label="Enter Age" variant="outlined" />
        <TextField onChange={handleInp} value={inp.education} name= "education" label="Enter Education" variant="outlined" />
        <TextField onChange={handleInp} value={inp.gender} name= "gender" label="Enter Gender" variant="outlined" />
        <TextField onChange={handleInp} value={inp.contact} name= "contact" type="number" label="Enter Contact Number" variant="outlined" />
        <br/>
        <Button onClick={handleSubmit} style={{margin:"2%"}} variant="contained">Submit</Button>
    </div>
    <div style={{border:"1px solid black",margin:"1% 1% 1% 1%",borderRadius:"5px",backgroundColor:"#ffd6d6"}}>
        <h3>Add a Contest</h3>
        <TextField  onChange={handleInp2} value={inp2.title} name= "title" label="Enter title" variant="outlined" />
        <FormControl sx={{ minWidth: 160 }}>
            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
            <Select onChange={handleInp2} name="category"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // onChange={handleChange}
                >
                <MenuItem value={"DSA"}>DSA</MenuItem>
                <MenuItem value={"Coding"}>Coding</MenuItem>
            </Select>
        </FormControl>
        <TextField onChange={handleInp2} value={inp2.deadline} name= "deadline" label="Enter Deadline" variant="outlined" />
        <TextField onChange={handleInp2} value={inp2.tag} name= "tag" label="Enter Tag"  variant="outlined" />
        <br/>
        <Button onClick={handleSubmit2} style={{margin:"2%"}} variant="contained">Submit</Button>
    </div>
    <h2>Students</h2>
    <ListItemText primary="Sort By :   " />
    <Fab onClick={handleName} style={{width:"5%"}} variant="extended">
        Name
    </Fab>
    <Fab onClick={handleAge} style={{width:"5%"}} variant="extended">
          Age  
    </Fab>
    {data[0] ? <Grid style={{margin:"2% 0% 2% 11%",paddingRight:"20%"}} container spacing={2} columns={{ xs: 3, sm: 3, md:9 }}>
        {data.map((el, index) => (
            <Grid key={el._id} style={{border: "1px solid #e0dada",margin:"1%",backgroundColor:'#bdbdbd',borderRadius:"5px"}} item xs={2} sm={4} md={2} key={index}>
                <Item style={{display:"grid",gridTemplateColumns:"76% 20%"}}>
                    <div style={{textAlign:"left"}}>
                        <span style={{fontWeight:"600"}}>Name : _ </span><span>{el.name} </span>
                        <br/>
                        <span style={{fontWeight:"600"}}>Age : _ </span><span> {el.age}</span>
                        <br/>
                        <span style={{fontWeight:"600"}}>Gender : _ </span><span> {el.gender}</span>
                        <br/>
                        <span style={{fontWeight:"600"}}>City : _ </span><span> {el.city}</span>
                        <br/>
                        <span style={{fontWeight:"600"}}>Education : _ </span><span>{el.education}</span>
                        <br/>
                        <span style={{fontWeight:"600"}}>Contact : _ </span><span> {el.contact}</span>
                    </div>
                    <Button onClick={()=>handleDelete(el._id)} style={{margin:"90% 0%"}} color='warning' variant="contained">Delete</Button>
                </Item>
            </Grid>
        )) }
    </Grid> : <h1>No Students Added</h1>}
</div>
}

export {Admin}