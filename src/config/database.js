module.exports = {
    host: 'localhost',
    port: '5433',
    username: 'postgres',
    password: 'docker',
    database: 'meetapp',
    dialect: 'postgres',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
}
