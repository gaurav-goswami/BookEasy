const app = require("./app");
const connectDB = require("./utils/connectDB");
const errorMiddleware = require("./middlewares/errorMiddleware");



const PORT = process.env.PORT;

connectDB();


app.use(errorMiddleware);

app.listen(PORT , () => {
    console.log(`Server is running at PORT ${PORT}`)
})