<?php

namespace App\Controller;

use App\Repository\MovieRepository;
use App\Repository\GenreRepository;
use App\Repository\MovieGenreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class MoviesController extends AbstractController
{
    public function __construct(
        private MovieRepository $movieRepository,
        private GenreRepository $genreRepository,
        private MovieGenreRepository $movieGenreRepository,
        private SerializerInterface $serializer
    ) {
    }

    public function add_genres($movies, $movies_genre)
    {
        $genres = [];
        $this_movie = [];
        foreach ($movies as $movie) {
            $this_genre = [];
            foreach ($movies_genre as $movie_genre) {

                if (!in_array($movie_genre->getGenre()->getName(), $genres)) {
                    $genres[] = $movie_genre->getGenre()->getName();
                }


                if ($movie_genre->getMovieId() == $movie->getId()) {
                    $this_genre[] = $movie_genre->getGenre()->getName();
                }

            }

            $this_movie[] = [
                "id" => $movie->getId(),
                "title" => $movie->getTitle(),
                "imageUrl" => $movie->getImageUrl(),
                "plot" => $movie->getPlot(),
                "year" => $movie->getYear(),
                "releaseDate" => $movie->getReleaseDate(),
                "duration" => $movie->getDuration(),
                "rating" => $movie->getRating(),
                "wikipediaUrl" => $movie->getWikipediaUrl(),
                "genre" => $this_genre,
            ];

        }


        return ["movies" => $this_movie, "genres" => $genres];
    }

    #[Route('/movies', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $movies = $this->movieRepository->findAll();
        $genres = $this->movieGenreRepository->findall();
        $data = $this->add_genres($movies, $genres);
        $res = $this->serializer->serialize($data, "json", ["groups" => "default"]);
        return new JsonResponse($res, json: true);
    }

}
