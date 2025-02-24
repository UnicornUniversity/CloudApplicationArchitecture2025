const http = require("http");
const url = require("url");
const dml = require("./dataManagementLayer");

const server = http.createServer(async (req, res) => {
    console.log(req.url);
    console.log(req.method);

    if (req.url === "/health" && req.method === "GET") {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<body><b>I am OK!</b></body>");
        res.write("</html>");
        return res.end();
    } else if (req.url.startsWith("/employees") && req.method === "GET") {
        const employees = await dml.readEmployees();

        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<body>");
        res.write("<ul>");

        for (const employee of employees) {
            res.write("<li>");
            const fullName = employee.name + " " + employee.surname;
            if (employee.id_manager == null) {
                res.write("<b>" + fullName + "</b>");
            } else {
                res.write(fullName);
            }
            res.write("</li>");
        }

        res.write("</ul>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }
});

server.listen(3002);