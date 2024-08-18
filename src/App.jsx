import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Auth from './components/Auth'
import {db,auth, storage} from './config/firbase'
import {getDocs, collection, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import {ref, uploadBytes} from 'firebase/storage'

function App() {
  const [movieList, setMovieList]=useState([]);
  const [newMovieTitle, setNewMovieTitle]=useState("");
  const [newRelease, setNewRelease]=useState(0);
  const [newOscar, setNewOscar]=useState(false);
  const [updatedTitle, setUpdatedtitle]=useState("");
  const [upload, setUpload]=useState(null);


  const MovieCollection=collection(db,"movies")
  useEffect(()=>{
  const getMovieList = async ()=>{
    try {
      const data =await getDocs(MovieCollection);
      const filteredData=data.docs.map((doc)=>({ ...doc.data(),id:doc.id}));
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
    
  }
  getMovieList();
})
const onSubmitMovie=async ()=>{
  try{
  await addDoc(MovieCollection, 
    {title: newMovieTitle,
      releaseDate:newRelease,
      isOscar:newOscar,
      userid: auth?.currentUser?.uid});
    }catch(err){
      console.error(err);
    }
}
const deleteMovie =async (id)=>{
  const movieDoc=doc(db,"movies",id);
  await deleteDoc(movieDoc);
} 
const updateMovie =async (id)=>{
  const movieDoc=doc(db,"movies",id);
  await updateDoc(movieDoc, {title: updatedTitle});
};
const uploadFile= async ()=>{
  if(!upload) return;
  const folder=ref(storage,`projectFiles/${upload.name}`);
  await uploadBytes(folder,upload);
};
  return (
    <>
    <Auth/>
    <input type="text" placeholder='movie title' onChange={(e)=> setNewMovieTitle(e.target.value)}/>
    <input type="number" placeholder='release date' onChange={(e)=>setNewRelease(Number(e.target.value))}/>
    <input type="checkbox" checked={newOscar} onChange={(e)=>setNewOscar(e.target.checked)}/>
    <label >Recieved An Oscar</label>
    <button onClick={()=>onSubmitMovie()}>submit the movie</button>
    {movieList.map((movie)=>( <div>
      <h2 style={{color:movie.isOscar? "green" : "red"}}>{movie.title}</h2>
      <h3>Date: {movie.releaseDate}</h3>
      <button onClick={()=>deleteMovie(movie.id)}>delete Movie</button>
      <input type="text" placeholder='change title' onChange={(e)=>setUpdatedtitle(e.target.value)}/>
      <button onClick={()=>updateMovie(movie.id)}>update title</button>
      
    </div>
     ))}
     <div>
        <input type="file" onChange={(e)=>setUpload(e.target.files[0])}/>
        <button onClick={()=>uploadFile()}>upload file</button>
      </div>
    </>
  )
}

export default App
