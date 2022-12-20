const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  MONGO_URI:`mongodb+srv://test:${encodeURIComponent(`${process.env.PASSWORD}`)}@cluster0.iy2o1qb.mongodb.net/?retryWrites=true&w=majority`,
  JWT_SECRET:process.env.JWT_SECRET
}