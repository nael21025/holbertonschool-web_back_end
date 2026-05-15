const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });

process.stdout.write('Welcome to Holberton School, what is your name?\n');

rl.on('line', (line) => {
  process.stdout.write(`Your name is: ${line}\n`);
});

rl.on('close', () => {
  process.stdout.write('This important software is now closing\n');
});
