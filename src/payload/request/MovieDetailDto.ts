import { MovieDto } from "./MovieDto.js";
import { CommentDto } from "./CommentDto.js";

export interface MovieDetailDto {
    movie: MovieDto;
    comments: CommentDto[];
}