// import { Database } from 'bun:sqlite';

// export interface Book {
//     id?: number;
//     name: string;
//     author: string;
// }

// export class BooksDatabase {
//     private db: Database;

//     constructor() {
//         this.db = new Database('books.db');
//         // Initialize the database
//         this.init()
//             .then(() => console.log('Database initialized'))
//             .catch(console.error);
//     }

//     // Get all books
//     async getBooks() {
//         return this.db.query('SELECT * FROM books').all();
//     }

//     // Add a book
//     async addBook(book: Book) {
//         // q: Get id type safely
//         return this.db.query(`INSERT INTO books (name, author) VALUES (?, ?) RETURNING id`).get(book.name, book.author) as Book;
//     }

//     // Update a book
//     async updateBook(id: number, book: Book) {
//         return this.db.run(`UPDATE books SET name = '${book.name}', author = '${book.author}' WHERE id = ${id}`)
//     }

//     // Delete a book
//     async deleteBook(id: number) {
//         return this.db.run(`DELETE FROM books WHERE id = ${id}`)
//     }

//     async getBook(id: number) {
//       return this.db.query(`SELECT * FROM books WHERE id=${id}`).get() as Book;
//     }

//     // Initialize the database
//     async init() {
//         return this.db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, author TEXT)');
//     }
// }

// import { Database } from 'your-database-library'; // Import your database library

// class BaseDatabase {
//     private static sharedDb: Database | null = null;

//     protected db: Database;

//     constructor() {
//         if (!BaseDatabase.sharedDb) {
//             BaseDatabase.sharedDb = new Database(process.NODE_ENV.DB_URL);
//             // Initialize the database if it hasn't been initialized yet
//             this.init()
//                 .then(() => console.log('Database initialized'))
//                 .catch(console.error);
//         }
//         this.db = BaseDatabase.sharedDb;
//     }

//     // Initialize the database (can be overridden by child classes)
//     protected async init() {
//         // Default implementation, can be overridden by child classes
//     }
// }

// class UsersTable extends BaseDatabase {
//     constructor() {
//         super();
//     }

//     // Add methods specific to the UsersTable class here
// }

// class ProductsTable extends BaseDatabase {
//     constructor() {
//         super();
//     }

//     // Add methods specific to the ProductsTable class here
// }

// // Other table classes can also extend BaseDatabase in the same way

// const usersTable = new UsersTable();
// const productsTable = new ProductsTable();
// import { BooksDatabase } from './db';
// class Unauthorized extends Error {
//   constructor(){
//     super('Unauthorized');
//   }
// }

// const app = new Elysia().use(swagger()).addError({
//   '401': Unauthorized
// }).onError(({ code, error}) => {

//   let status;

//   switch (true) {
//     case code === 'VALIDATION':
//       status = 400;
//       break;
//     case code === 'NOT_FOUND':
//       status = 404;
//       break;
//     case code === '401':
//       status = 401;
//       break;
//     default:
//       status = 500;
//   }

//   return new Response(error.toString(), {status: status})
// }).use(cookie()).use(jwt({
//   name: 'jwt',
//   secret: 'supersecret'
// })).decorate('db', new BooksDatabase());

// app.get('/books', ({db}) => db.getBooks());
// app.post('/books', ({db, body}) => db.addBook(body), {
//   body: t.Object({
//     name: t.String(),
//     author: t.String()
//   })
// });

// app.put('/books', ({db, body }) => db.updateBook(body.id, { name: body.name, author: body.author}), {
//   body: t.Object({
//     id: t.Number(),
//     name: t.String(),
//     author: t.String()
//   })
// });
// app.get('/books/:id', async ({db, params, jwt, cookie: {auth} }) => {

//   const profile =  await jwt.verify(auth);

//   if (!profile) throw new Unauthorized();

//   return db.getBook(parseInt(params.id))
// });
// app.delete('/books/:id', ({db, params }) => db.deleteBook(parseInt(params.id)));

// import { drizzle } from 'drizzle-orm/libsql';
// import { createClient } from '@libsql/client';

// const client = createClient({
//   url: 'DATABASE_URL',
//   authToken: 'DATABASE_AUTH_TOKEN',
// });

// const db = drizzle(client);

// const result = await db.select().from(users).all();
