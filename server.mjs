import express from "express";
import * as path from "path";
import history from "connect-history-api-fallback";

const __dirname = path.resolve();

const app = express();

app.use(history());

app.use(express.static(path.join(__dirname, 'dist')));

const PORT = 4100;

app.listen(PORT, () => {
  console.log(`Server startup complete (PORT: ${PORT})`);
});
