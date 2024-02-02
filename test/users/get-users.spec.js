const { userIds } = require("../../test-data/input-data")
const { request, expect} = require("../../config")



describe("GET /users", function(){
    it("should return status code 200 and more then 5 users", async function(){
        //arrange: 
        const expectedStatusCode = 200
        const expectedNumberOfUsers = 5

        //act:
        const response = await request.get("/users").set('User-Agent', 'Chrome')

        //assert:
        expect(response.statusCode).to.be.equal(expectedStatusCode, `Error status code - we expected ${expectedStatusCode}`)
        //console.log(response.body, response.body.length)

        expect(response.body.length).to.be.greaterThanOrEqual(expectedNumberOfUsers, `Expected to have more users then ${expectedNumberOfUsers}`)
    })
    it("should return user with given ID", async function(){
        //arrange: 
        const expectedStatusCode = 200
        const expectedUserId = userIds.toGet

        //act:
        const response = await request.get(`/users/${expectedUserId}`).set('User-Agent','Chrome')

        //assert:
        //console.log(response.body)
        expect(response.statusCode).to.be.equal(expectedStatusCode, `Error status code - we expected ${expectedStatusCode}`)
        expect(response.body.id).to.be.equal(expectedUserId, `For id ${expectedUserId} we received ${JSON.stringify(response.body)}`)
    })
    it("should return user with given ID using parameters in url", async function(){
        //arrange: 
        const expectedStatusCode = 200
        const expectedUserId = userIds.toGet
        const expectedNumberOfElements = 1

        //act:
        const response = await request.get(`/users?id=${expectedUserId}`).set('User-Agent','Chrome')

        //assert:
        //console.log(response.body)
        expect(response.statusCode).to.be.equal(expectedStatusCode, `Error status code - we expected ${expectedStatusCode}`)
        expect(response.body[0].id).to.be.equal(expectedUserId, `For id ${expectedUserId} we receive ${JSON.stringify(response.body)}`)
        expect(response.body.length).to.be.equal(expectedNumberOfElements, `For id ${expectedUserId} we receive ${response.body.length} elements instead of ${expectedNumberOfElements} ${JSON.stringify(response.body)}`)
    })
})