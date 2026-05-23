import { connectDb } from "./src/db/db";
import app from "./src/app.js";

const PORT = process.env.PORT || 8000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo DB connection failed", err);
  });
