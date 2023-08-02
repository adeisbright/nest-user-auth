export default () => ({
    serverPort: Number(process.env.SERVER_PORT) ,
    jwt: {
        secret: process.env.JWT_SECRET,
        expires : "1880s"
    }, 
    database: {
        dbType: process.env.DB_TYPE as string , 
        port: Number(process.env.DB_PORT), 
        databaseName: process.env.DB_NAME, 
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD, 
        host : process.env.DB_HOST
    }
})