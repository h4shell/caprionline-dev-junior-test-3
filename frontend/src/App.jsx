import React, { useEffect, useState } from 'react';
import { Button, Rating, Spinner } from 'flowbite-react';
import { MovieFilter } from './components/MovieFilter';
import { MovieSorter } from './components/MovieSorter';





const App = props => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('year');
  const [filter, setFilter] = useState('all');
  const [genres, setGenres] = useState([]);


  const fetchMovies = () => {
    setLoading(true);

    return fetch('http://localhost:8000/movies')
      .then(response => response.json())
      .then(data => {
        setFilteredMovies(data.movies);
        setGenres(data.genres);
        setMovies(data.movies);
        setLoading(false);
      });
  }

  

  function handleSort(sorter, movies){
    const sorted = [...movies].sort((a, b) => {
      if(sorter === 'year') {
        if(a.year < b.year) return -1;
        if(a.year > b.year) return 1;
        return 0
      }
      if(sorter === 'rating') {
        if(a.rating < b.rating) return 1;
        if(a.rating > b.rating) return -1;
        return 0
      }
      if(sorter === 'title') {
        if(a.title < b.title) return -1;
        if(a.title > b.title) return 1;
        return 0
      }
    })

    return sorted
  }

  function handleMovies() {

    const filtered = filter !== 'all' 
    ? movies.filter(item => item.genre.includes(filter))
    : movies;

    const sorted = handleSort(sortBy, filtered);
    setFilteredMovies([...sorted]);


  }

  useEffect(() => {
    
    handleMovies();

  }, [sortBy, filter, movies]);

  useEffect(() => {
    fetchMovies();
  }, []);




  return (
    <Layout>
      <Heading />
      <MovieWrapper loading={loading}>
      <div className="flex justify-between mb-4">
        <MovieFilter filter={filter} setFilter={setFilter} genres={genres} />
        <MovieSorter sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      <MovieList >
        {filteredMovies.map((item, key) => (
          <MovieItem key={key} {...item} />
        ))}
      </MovieList>
      </MovieWrapper>
    </Layout>
  );
};

const Layout = props => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        {props.children}
      </div>
    </section>
  );
};

const Heading = props => {
  return (
    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
      <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        Movie Collection
      </h1>

      <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
        Explore the whole collection of movies
      </p>
    </div>
  );
};

const MovieList = props => {
  return (
    <div className="grid gap-4 md:gap-y-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3">
      {props.children}
    </div>
  );
};

const MovieWrapper = props => {
  if (props.loading) {
    return (
      <div className="text-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="">
      {props.children}
    </div>
  );
};

const MovieItem = props => {
  return (
    <div className="flex flex-col w-full h-full rounded-lg shadow-md lg:max-w-sm">
      <div className="grow">
        <img
          className="object-cover w-full h-60 md:h-80"
          src={props.imageUrl}
          alt={props.title}
          loading="lazy"
        />
      </div>

      <div className="grow flex flex-col h-full p-3">
        <div className="grow mb-3 last:mb-0">
          {props.year || props.rating
            ? <div className="flex justify-between align-middle text-gray-900 text-xs font-medium mb-2">
                <span>{props.year}</span>

                {props.rating
                  ? <Rating>
                      <Rating.Star />

                      <span className="ml-0.5">
                        {props.rating}
                      </span>
                    </Rating>
                  : null
                }
              </div>
            : null
          }

          <h3 className="text-gray-900 text-lg leading-tight font-semibold mb-1">
            {props.title}
          </h3>

          <p className="text-gray-600 text-sm leading-normal mb-4 last:mb-0">
            {props.plot.substr(0, 80)}...
          </p>
        </div>

        {props.wikipediaUrl
          ? <Button
              color="light"
              size="xs"
              className="w-full"
              onClick={() => window.open(props.wikipediaUrl, '_blank')}
            >
              More
            </Button>
          : null
        }
      </div>
    </div>
  );
};

export default App;
