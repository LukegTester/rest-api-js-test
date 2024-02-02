const { expect } = require("chai")
const request = require("supertest")("https://planet-deadpan-tortoise.glitch.me/api/")

exports.mochaHooks = {
    async beforeAll() {
      const response = await request.get('/restoreDB').set('User-Agent','Chrome')
      expect(response.statusCode).to.be.equal(201,
      `Assert failed on response ${JSON.stringify(response.body)}`)
      //console.log(`This will run before all tests : ${JSON.stringify(response.body)}`)
    }
    // async beforeEach() {
    //   const response = await request.get('/restoreDB').set('User-Agent','Chrome')
    //   expect(response.statusCode).to.be.equal(201, `Assert failed on response ${JSON.stringify(response.body)}`)
    //   //console.log(`This will run before each test : ${JSON.stringify(response.body)}`)
    // }
  };
