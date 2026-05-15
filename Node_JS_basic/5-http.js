const http = require('http');
const fs = require('fs');

function getStudentsReport(path) {
  return fs.promises.readFile(path, 'utf8')
    .then((data) => {
      const lines = data
        .split('\n')
        .filter((line) => line.trim() !== '');

      const students = lines.slice(1);
      const groups = {};

      students.forEach((studentLine) => {
        const [firstname, , , field] = studentLine.split(',');

        if (!groups[field]) {
          groups[field] = [];
        }

        groups[field].push(firstname);
      });

      const report = [`Number of students: ${students.length}`];

      Object.keys(groups).forEach((field) => {
        report.push(`Number of students in ${field}: ${groups[field].length}. List: ${groups[field].join(', ')}`);
      });

      return report.join('\n');
    })
    .catch(() => Promise.reject(new Error('Cannot load the database')));
}

const databasePath = process.argv[2];

const app = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');

  if (request.url === '/') {
    response.end('Hello Holberton School!');
    return;
  }

  if (request.url === '/students') {
    getStudentsReport(databasePath)
      .then((report) => {
        response.end(`This is the list of our students\n${report}`);
      })
      .catch((error) => {
        response.end(`This is the list of our students\n${error.message}`);
      });
    return;
  }

  response.end('Hello Holberton School!');
});

app.listen(1245);

module.exports = app;