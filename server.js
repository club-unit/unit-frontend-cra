// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require("http");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { parse } = require("url");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const next = require("next");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const https = require("https");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const dev = true;
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync("./clubunit.kr-key.pem"),
  cert: fs.readFileSync("./clubunit.kr.pem"),
};

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(80, (err) => {
      if (err) throw err;
      console.log(`> Ready on port 80`);
    });

  https
    .createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(443, (err) => {
      if (err) throw err;
      console.log(`> HTTPS: Ready on port 443`);
    });
});
