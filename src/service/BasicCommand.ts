import { gen_uuid } from "../util/gen_uuid.js";
import { MovieRequest } from "../payload/response/MovieRequest.js";
import db from '../config/db.js';
import { MovieDto } from "../payload/request/MovieDto.js";
import { MovieDetailDto } from "../payload/request/MovieDetailDto.js";
async function createMovie(movie: MovieRequest): Promise<MovieDto> {
    const sql = await db`
        insert into tb_movie(
	        id,
	        title,
	        release_date,
	        created_at,
	        updated_at
        )values(
            ${gen_uuid()},
            ${movie.title},
            ${movie.release_date},
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP
        )`;
    return sql.map((movie) => {
        return {
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date
        };
    })[0];
}

async function getAllMovie(): Promise<MovieDto[]> {
    const sql = await db`SELECT id,title,release_date FROM tb_movie`;
    return sql.map((movie) => {
        return {
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date
        };
    });
}

async function getMovieById(id: string): Promise<MovieDetailDto> {
    const movieDto = await db`SELECT id,title,release_date FROM tb_movie where id = ${id}`;
    const commentsDto = await db`SELECT id,content,rate FROM tb_comment where movie_id = ${id}`;
    return {
        movie: movieDto.map((movie) => {
            return {
                id: movie.id,
                title: movie.title,
                release_date: movie.release_date
            };
        })[0],
        comments: commentsDto.map((comment) => {
            return {
                id: comment.id,
                content: comment.content,
                rate: comment.rate
            };
        })
    };
}

async function updateMovieById(id: string, movie: MovieRequest): Promise<MovieDto> {
    const sql = await db`
        update tb_movie set
            title = ${movie.title},
            release_date = ${movie.release_date},
            updated_at = CURRENT_TIMESTAMP
        where id = ${id}`;
    return sql.map((movie) => {
        return {
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date
        };
    })[0];
}

async function deleteMovieById(id: string): Promise<MovieDto> {
    const sql = await db`delete from tb_movie where id = ${id}`;
    return sql.map((movie) => {
        return {
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date
        };
    })[0];
}

export { createMovie, getAllMovie, getMovieById, updateMovieById, deleteMovieById };