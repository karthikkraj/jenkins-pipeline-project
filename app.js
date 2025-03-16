const http = require('http');

const hostname = 'localhost';  // or '0.0.0.0' if needed
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, my name is Karthik Raj and my roll number is 2022BCD0041\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
