const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);

    if (req.url === "/health" && req.method === "GET") {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<body><b>I am OK!</b></body>");
        res.write("</html>");
        return res.end();
    } else if (req.url.startsWith("/hello") && req.method === "POST") {
        const parsedUrl = url.parse(req.url, true);
        const name = parsedUrl.query.username;

        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<body><b>Hello, " + name + "!</b></body>");
        res.write("</html>");
        return res.end();
    }
});

server.listen(3001);

