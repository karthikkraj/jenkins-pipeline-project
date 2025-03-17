const http = require('http');
const hostname = 'localhost';
const port = 9090;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hello from Node.js</title>
      </head>
      <body>
        <h3>Hello!</h3>
        <p>I am Karthik Raj, and my roll number is 2022BCD0041</p>
        <p>I have completed the DevOps pipeline assignment, which includes integrating Git, SonarQube, Docker, and deployment.</p>
      </body>
    </html>
  `);
});

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});
