const fs = require('fs');

function buildReport(data) {
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

  console.log(`Number of students: ${students.length}`);
  Object.keys(groups).forEach((field) => {
    console.log(`Number of students in ${field}: ${groups[field].length}. List: ${groups[field].join(', ')}`);
  });
}

function countStudents(path) {
  return fs.promises.readFile(path, 'utf8')
    .then((data) => {
      buildReport(data);
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;
