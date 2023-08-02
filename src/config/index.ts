export default () => ({
    serverPort: Number(process.env.SERVER_PORT) ,
    jwt: {
        secret: process.env.JWT_SECRET,
        expires : "1880s" //process.env.JWT_EXPIRES
    }
})