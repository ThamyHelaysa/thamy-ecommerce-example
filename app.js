var app = require("connect")()
var serveStatic = require("serve-static")
var cors = require("cors");

app.use(cors())
// Serve up mock-api folder
app.use("/api", serveStatic("mock-api", {
  "index": false,
  "setHeaders": setJsonHeaders
}))

// Set header to force download
function setJsonHeaders (res, path) {
  res.setHeader("Content-type", "application/json")
}

const pathsFromMock = [
  {
    endpoint: "/",
    file: "index"
  },
  {
    endpoint: "/camisetas",
    file: "camisetas"
  },
  {
    endpoint: "/calcas",
    file: "calcas"
  },
  {
    endpoint: "/calcados",
    file: "calcados"
  }

]

pathsFromMock.forEach((el)=>{
  return app.use(el.endpoint, serveStatic("public", {"index": [`${el.file}.html`, `${el.file}.htm`]}))
})


// Serve up public folder
// app.use("/", serveStatic("public", {"index": ["index.html", "index.htm"]}))

// app.use("/camisetas", serveStatic("public", {"index": ["camisetas.html", "camisetas.htm"]}))
// app.use("/calcas", serveStatic("public", {"index": ["calcas.html", "calcas.htm"]}))
// app.use("/calcados", serveStatic("public", {"index": ["calcados.html", "calcados.htm"]}))

// ToDO: change to express
// app.use("/*", function (req, res, next) {
//   serveStatic("public", {"index": ["not-found.html", "not-found.htm"]})
//   next();
// });

app.listen(8888, function() {
  console.log("Acesse: http://localhost:8888")
});
