const chai = require("chai");

const users = require('../routes/api/users')

describe("Main", () => {
  let arr = [1, 2, 3];
  before(() => {});

  after(() => {
    console.log("after");
  });

  beforeEach(() => {
    console.log("before");
    console.log(arr);
  });

  afterEach(() => {});

  it("/\\ 'before' & \\/'after' ", () => {
      console.log(users)
    arr.push(4);
    chai.expect(arr).to.have.lengthOf(4);
  });
});
