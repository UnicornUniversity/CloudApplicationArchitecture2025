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
    }  else if (req.url.startsWith("/goods") && req.method === "GET") {
        const categories = await dml.readCategories();
        const goods = await dml.readGoods();

        const parsedURL = url.parse(req.url, true);
        let ddCategories = parsedURL.query.ddCategories;
        if (ddCategories == null) ddCategories = "0";
        console.log("ddCategories =" + ddCategories);

        const goodsPerCategory = [];
        for (const g of goods) {
            if (g.category.toString() === ddCategories) {
                goodsPerCategory.push(g.name);
            }
        }

        res.write("<html>");
        res.write("<body>");
        res.write("<form>");
        res.write("<div>");
        res.write("<select name='ddCategories'>");
        for (const category of categories) {
            res.write("<option value='" + category.value + "' " + (category.value.toString() === ddCategories ? "selected" : "") + " >" + category.name + "</option>");
        }
        res.write("</select>");
        res.write("</div>");

        res.write("<div>");
        res.write("<ul>");
        for (const g of goodsPerCategory) {
            res.write("<li>");
            res.write(g);
            res.write("</li>");
        }
        res.write("</ul>");
        res.write("</div>");

        res.write("<div><button>Submit</button></div>");

        res.write("</form>");
        res.write("</body>");
        res.write("</html>");
    }
    return res.end();
});

server.listen(3002);