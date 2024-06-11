// The "pseudocode" for the built-in Error class defined by JavaScript itself
// class Error {
//   constructor(message) {
//     this.message = message;
//     this.name = "Error"; // (different names for different built-in error classes)
//     this.stack = <call stack>; // non-standard, but most environments support it
//   }
// }
class CustomError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
    this.name = this.constructor.name
  }
}

class DatabaseError extends CustomError {
  constructor(message, status) {
    super(message, status)
  }
}

class NoDataFoundError extends CustomError {
  constructor(message, status) {
    super(message, status)
  }
}

module.exports = {
  CustomError,
  DatabaseError,
  NoDataFoundError
}