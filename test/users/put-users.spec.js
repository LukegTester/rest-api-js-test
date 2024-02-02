const { request, expect, faker } = require("../../config")
const { userIds } = require("../../test-data/input-data")

describe("PUT /users", function(){
    it("should update valid user", async function(){
        // arrange:
        const firstname = faker.person.firstName()
        const lastname = faker.person.lastName()
        const email = faker.internet.email({firstname, lastname, provider : 'test.com'})
        const password = faker.internet.password()
        const payload = {
            email,
            firstname,
            lastname,
            password,
            "avatar": ".\\data\\users\\face_1591133060.68834.jpg"
          }

        const userId = userIds.toPut

        // act:
        const response = await request.put(`/users/${userId}`).send(payload).set('User-agent','Chrome')

        // assert: 
        expect(response.statusCode).to.be.equal(200, `Assert failed on response ${JSON.stringify(response.body)}`)

        const responseWithUser = await request.get(`/users/${userId}`).set('User-Agent', 'Chrome')
        
        payload.id = userId
        expect(responseWithUser.body).to.be.eql(payload,
             `Updated user with payload ${JSON.stringify(payload)} does not match to response ${JSON.stringify(response.body)}`)
    })
})