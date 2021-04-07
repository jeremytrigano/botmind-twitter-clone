import dotenv from 'dotenv';
import monk from 'monk';

dotenv.config();

// const db = monk(localhost/beeper);
const db = monk(
  'mongodb+srv://' +
    process.env.DB_USER +
    ':' +
    process.env.DB_PASS +
    '@' +
    process.env.DB_HOST +
    '/' +
    process.env.DB_NAME +
    '?retryWrites=true&w=majority'
);

export default db;
