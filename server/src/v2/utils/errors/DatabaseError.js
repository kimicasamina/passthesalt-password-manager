// export class DatabaseError extends Error {
//   statusCode = 500;
//   constructor() {
//     super('Database crashed, try again later.');
//     Object.setPrototypeOf(this.DatabaseError.prototype);
//   }

//   serialize() {
//     return { message: 'Database crashed, try again later.' };
//   }
// }

export class DatabaseError extends Error {
  constructor() {
    super('Database crashed, try again later.');
    this.statusCode = 500;

    // Set the prototype explicitly to ensure instanceof works
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serialize() {
    return { message: 'Database crashed, try again later.' };
  }
}
