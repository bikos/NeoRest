import app from "./app";

app.listen(process.env.PORT, () =>
  console.log(`NeoRest app listening on port ${process.env.PORT}!`),
);
