import readDatabase from '../utils';

export default class StudentsController {
  static getAllStudents(request, response) {
    const databasePath = process.argv[2];

    readDatabase(databasePath)
      .then((groups) => {
        const fields = Object.keys(groups).sort((a, b) => (
          a.localeCompare(b, undefined, { sensitivity: 'base' })
        ));
        const lines = ['This is the list of our students'];

        fields.forEach((field) => {
          lines.push(`Number of students in ${field}: ${groups[field].length}. List: ${groups[field].join(', ')}`);
        });

        response.status(200).send(lines.join('\n'));
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    const databasePath = process.argv[2];

    readDatabase(databasePath)
      .then((groups) => {
        response.status(200).send(`List: ${groups[major].join(', ')}`);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }
}
