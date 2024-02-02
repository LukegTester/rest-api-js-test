const { request, expect, faker } = require("../../config")
const { userIds } = require("../../test-data/input-data")


describe('PATCH /users', function(){
    it("should update valid user with valid email", async function(){
          // arrange:
          const email = faker.internet.email()
          const payload = {
              email
            }
          const userId = userIds.toPatch

          const responseWithBaseUser = await request.get(`/users/${userId}`).set('User-Agent', 'Chrome')
          const expectedUserData = responseWithBaseUser.body
          expectedUserData.email = email
        
  
          // act:
          const response = await request.patch(`/users/${userId}`).send(payload).set('User-agent','Chrome')
  
          // assert: 
          expect(response.statusCode).to.be.equal(200, `Assert failed on response ${JSON.stringify(response.body)}`)
          const userAfterPatch = await request.get(`/users/${userId}`).set('User-Agent', 'Chrome')
       
          expect(response.body).to.be.eql(expectedUserData,
               `Updated user with payload ${JSON.stringify(expectedUserData)} does not match to response ${JSON.stringify(userAfterPatch.body)}`)
    })
})