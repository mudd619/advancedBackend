import { Button, Fab, ListItemText } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react"


function Home(){

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [data,setData] = useState([]);
    const [page,setPage] = useState(0)

    useEffect(()=>{
        GetIt()
    },[page])

    function GetIt(){
        setLoading(true);
        axios.get("http://localhost:2345/contest/"+page+"/"+5)
        .then((res)=>{
            setLoading(false);
            setData(res.data);
        })
        .catch((err)=>{
            setLoading(false);
            setError(true);
        })
    }

    const handleDsa = ()=>{
        setLoading(true);
        axios.get("http://localhost:2345/contest/"+page+"/"+5+"/dsa")
        .then((res)=>{
            setLoading(false);
            setData(res.data);
        })
        .catch((err)=>{
            setLoading(false);
            setError(true);
        })
    }

    const handleCoding = ()=>{
        setLoading(true);
        axios.get("http://localhost:2345/contest/"+page+"/"+5+"/coding")
        .then((res)=>{
            setLoading(false);
            setData(res.data);
        })
        .catch((err)=>{
            setLoading(false);
            setError(true);
        })
    }
    return loading ? "...loading" : error ? "...error" : <div>
    <h1>Home Page</h1>
    <div style={{border:"1px solid #ada7a7",width:"55%",margin:"2% 3% 5% 22%",paddingBottom:"2%",borderRadius:"5px",backgroundColor:"#b0f7f1"}}>
    <ListItemText primary="Sort By :   " />
    <Fab onClick={handleDsa} style={{width:"20%"}} variant="extended">
        DSA
    </Fab>
    <Fab onClick={handleCoding} style={{width:"20%"}} variant="extended">
          Coding  
    </Fab>
    <Fab onClick={()=>GetIt()} style={{width:"20%"}} variant="extended">
          All  
    </Fab>
    <div style={{marginTop:"3%"}}>
        {data[0] ? data.map((el)=>{
            return <div style={{display:"flex",margin:"2% 8%",backgroundColor:"#fcfdb7",padding:"2%",borderRadius:"5px",border:"1px solid #d3c9c9"}}>
               <span style={{fontWeight:"500"}}>Title : _ </span><span> {el.title}</span>
               <span style={{fontWeight:"500",marginLeft:"3%"}}>Category : _ </span><span>{el.category}</span>
               <span style={{fontWeight:"500",marginLeft:"3%"}}>Deadline : _ </span><span> {el.deadline}</span>
               <span style={{fontWeight:"500",marginLeft:"3%"}}>Tag : _ </span><span> {el.tag}</span>
            </div>
        }) : <h1>No Contests yet</h1>}
    </div>
    <Button onClick={()=>{if(page===0){return}setPage(page-1)}} style={{marginRight:"2%"}} variant="contained" color="success">Prev</Button>
    <Button onClick={()=>{if(data.length<5){return};setPage(page+1)}}  variant="contained" color="success">Next</Button>
    </div>
</div> 
}

export {Home}