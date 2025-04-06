import React, { useEffect, useState } from 'react'
import Serach from './components/serach'
import Spinner from './components/spinner';
import MovieCard from './components/MovieCard';


function App() {
const [searchTerm, setSearchterm]= useState();
const [isLoading, setisLoading] = useState(false);
const [movieList, setmovieList] = useState();
const [errorMessage, seterrorMessage] = useState();
const API_BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_API_KEY;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
};

const fetchData = async (query = '') => {
  setisLoading(true);
  seterrorMessage('');

  try {
    const endpoint = query ?`${API_BASE_URL}search/movie?query=${encodeURIComponent(query)}` : 
     `${API_BASE_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`

   const response = await fetch(endpoint, options);

   if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }

  const data = await response.json();
  if (data.results !=null) {
     setisLoading(false);
       
  }
  setmovieList(data.results)
  console.log(data);

  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
};
useEffect(() => {
  fetchData(searchTerm);
}, [searchTerm]);
  return (
    
    <main>
      <div className='pattern'/>
      <div className='wrapper'/>
      <header>
        <img src="./hero.png" alt="" />
      <h1>
        Find all the <span className='text-gradient'> Movies</span> you love
      </h1>
      <Serach searchTerm = {searchTerm} setSearchterm = {setSearchterm}/>
      </header>
    <section className='all-movies'>
      <h2>All Movies</h2>
      {
        isLoading? (
      null
        ): errorMessage ? (
          <p className='text-white'>{errorMessage}</p>
        ): (
          <ul>
           {Array.isArray(movieList) && movieList.map((movie) => (
      <MovieCard key={movie.id } movie={movie} />
    ))}
          </ul>
        )
      }
    </section>
   
    </main>
    )
}

export default App
