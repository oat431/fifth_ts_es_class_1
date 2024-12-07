import {
    getAllMovie, getMovieById
} from './service/BasicCommand.js';
import {
    getAllAvgRateFromEachMovie
} from './service/AdvanceCommand.js';

console.log(await getAllMovie());
console.log(await getMovieById('e7ff4cd4-f60a-4923-9c81-20ad55eaf154'));

console.log(await getAllAvgRateFromEachMovie());
