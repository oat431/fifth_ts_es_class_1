import db from '../config/db.js';

async function getAllAvgRateFromEachMovie() {
    const sql = await db`
        select
	        tm.id as movie_id,
	        tm.title as movie_title,
	        case 
		        when round(avg(tc.rate)) is null then 0
		        else round(avg(tc.rate))
	        end as movie_rating
        from
	        tb_movie tm
        left join tb_comment tc on
	        tm.id = tc.movie_id
        group by
	        tm.id,
	        tm.title
        `;
    return sql.map((movie) => {
        return {
            movie_id: movie.movie_id,
            movie_title: movie.movie_title,
            movie_rating: movie.movie_rating
        };
    });
}

export {
    getAllAvgRateFromEachMovie
};