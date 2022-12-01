import axios from "axios";
import { useState } from "react";
import './App.css';

function App() {
  const [keyward,setKeyward]=useState("");
  const [data,setdata]=useState([]);
  const [bookmark,setBookmark]=useState([]);
  const [showBookmarks,setShowBookmarks]=useState(false)
  const handleChange=(e)=>{
    let input=e.target.value.toLowerCase();    
    return  setKeyward(input);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(keyward===""){
    return  alert("please enter the key ward")
    }
    const url=`https://api.unsplash.com/search/photos?client_id=YhG15W4BiZpFM9hH_-Qqu2o20E6RfmYbinOsBx51J2o&&query=${keyward}`
    axios.get(url).then(function (response) {
      // handle success
      console.log(response.data.results);
      setdata(response.data.results);
      console.log(data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  
  const handleClick=(imageurl)=>{
   
    setBookmark([...bookmark,imageurl]);
    alert("added to book mark")
    // console.log(bookmark);
  }
  

  return (
    <>
    <div className="container" >
      <h1 style={{textAlign:"center"}}>React Photo Search</h1>
      <div style={{textAlign:"right",marginRight:"500px"}}>
      <button className="book-mark" onClick={()=>setShowBookmarks(!showBookmarks)} >Book Marks</button>
      </div>
     
      <div>
        <form onSubmit={handleSubmit} style={{textAlign:"center"}}>
          <input type="text" value={keyward} onChange={handleChange} placeholder="search photo with keywards"/>
          <button className="submit">Search</button>
        </form>
        <h5 style={{textAlign:"center"}}>click any image to add as bookmark</h5>
      </div>
      <div id="image-conatiner">
        {
          (data.map((item,i)=>{
           return <div className="image"  key={i} >
          <img src={item.urls.small} onClick={()=>handleClick(item.urls.small)}  alt="" />
           </div>
          }))
        }
      </div>
    </div>
    {
        (showBookmarks)?  <h1 style={{textAlign:"center"}}>Bookmark images</h1>:""
      }
    <div id="bookmark-image-conatiner">
     
    {
      (showBookmarks)? 
      <>
     
     {
      (bookmark.map((img,i)=>{
        return <div className="image"  key={i} >
        <img src={img}   alt="" />
         </div>
      }))}
       </>:""
    }
    </div>

    </>
  );
}

export default App;
