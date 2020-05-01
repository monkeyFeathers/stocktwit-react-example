const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 8080;
const pino = require("express-pino-logger")();
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

const proxy = createProxyMiddleware({
  target: "https://api.stocktwits.com",
  changeOrigin: true,
  pathRewrite: { "^/stocktwits": "" },
});

app.use(cors());
app.use("/stocktwits", proxy);

app.use(express.static(path.join(__dirname, "..")));
app.use(express.static(path.join(__dirname, "..", "build")));
app.get("/ping", function (req, res) {
  return res.send("pong");
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`)
);
