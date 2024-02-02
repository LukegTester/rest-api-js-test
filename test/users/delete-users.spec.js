
const { request, expect, faker } = require("../../config")
const { userIds } = require("../../test-data/input-data")

describe("DELETE /users", function(){

   it("should delete valid existing user", async function(){
    // arrange:
    // const firstname = faker.person.firstName()
    //     const lastname = faker.person.lastName()
    //     const email = faker.internet.email({firstname, lastname, provider : 'test.com'})
    //     const password = faker.internet.password()
    //     const payload = {
    //         email,
    //         firstname,
    //         lastname,
    //         password,
    //         "avatar": ".\\data\\users\\face_1591133060.68834.jpg"
    //       }
       
    //     const responseAfterUserCreation = await request.post("/users").send(payload).set('User-Agent', 'Chrome')
    //     expect(responseAfterUserCreation.statusCode).to.be.equal(201,
    //         `Assert failed on response after creation ${JSON.stringify(responseAfterUserCreation.body)}`)

    //     const userId = responseAfterUserCreation.body.id
    const userId = userIds.toDelete
    // act:
    const response = await request.delete(`/users/${userId}`).set('User-Agent', 'Chrome')

    // assert:
    expect(response.statusCode).to.be.equal(200,
        `Assert failed on response ${JSON.stringify(response.body)}`)
    const responseAfterDelete = await request.get(`/users/${userId}`).set('User-Agent', 'Chrome')
    expect(responseAfterDelete.statusCode).to.be.equal(404,
        `Assert failed on response after delete ${JSON.stringify(response.body)}`)

   })
})