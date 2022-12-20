const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  MONGO_URI:`mongodb+srv://test:${encodeURIComponent("Test#4321!")}@cluster0.iy2o1qb.mongodb.net/?retryWrites=true&w=majority`,
  JWT_SECRET:`thisisthetoken`
}