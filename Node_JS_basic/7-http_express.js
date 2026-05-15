const express = require('express');
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
const app = express();

app.get('/', (_request, response) => {
  response.status(200).type('text/plain').send('Hello Holberton School!');
});

app.get('/students', (_request, response) => {
  getStudentsReport(databasePath)
    .then((report) => {
      response.status(200).type('text/plain').send(`This is the list of our students\n${report}`);
    })
    .catch((error) => {
      response.status(200).type('text/plain').send(`This is the list of our students\n${error.message}`);
    });
});

app.listen(1245);

module.exports = app;