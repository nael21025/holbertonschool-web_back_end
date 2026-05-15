import fs from 'fs';

export default function readDatabase(path) {
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

      return groups;
    });
}
