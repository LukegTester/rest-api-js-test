const { expect } = require("chai")
const { faker } = require("@faker-js/faker")

var argv = require('yargs/yargs')(process.argv).argv
console.log(argv.addr)

appAdress = argv.addr ?? "https://planet-deadpan-tortoise.glitch.me"
const request = require("supertest")(appAdress + "/api/")
const requestV2 = require("supertest")(appAdress + "/api/v2/")

module.exports = {
    expect,
    request,
    faker,
    requestV2
}