import monk from 'monk';

const db = monk('localhost/bipper');

export default db;
