import postgres from "postgres";

const db = postgres({
    host: "localhost",
    port: 5432,
    database: "db_5th_ts_ex_workshop",
    username: "postgres",
    password: "postgres",
});

export default db;