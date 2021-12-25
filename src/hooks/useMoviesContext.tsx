import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api'

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface FilmsProviderProps{
  children: ReactNode;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface FilmsContextData {
  movies: MovieProps[],
  genres: GenreResponseProps[],
  selectedGenreId: number, 
  selectedGenre: GenreResponseProps, 
  handleClickButton:(id: number) => void;
}

const MoviesContext = createContext<FilmsContextData>({} as FilmsContextData)

export function FilmsProvider({ children }: FilmsProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
  
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }
  
  return (
    <MoviesContext.Provider value= {{ movies, genres, selectedGenreId, selectedGenre, handleClickButton}}>
      {children}
    </MoviesContext.Provider>
  )
}

export function useFilms() {
  const context = useContext(MoviesContext);

  return context
}




