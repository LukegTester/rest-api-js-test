const { expect, requestV2 } = require("../../config")


describe("/GET plugins", function(){
    it("Should GET plugins when user is valid JWT authorised", async function(){
        // arrange: 
        const email = "user@test.com"
        const password = "test123"
        const payload = {
            email,
            password
        }
        const responseLogin = await requestV2.post('/login').send(payload).set('User-Agent','Chrome')
        expect(responseLogin.statusCode).to.be.equal(200, `Assert failed on login  ${JSON.stringify(responseLogin.body)}`)
        const bearerToken = responseLogin.body.access_token

        const header = {
            "Authorization": `Bearer ${bearerToken}`,
            "User-Agent": "Chrome"
        }

        // act:
        const response = await requestV2.get('/plugins').set(header)

        // assert:
        expect(response.statusCode).to.be.equal(200, `Assert failed on GET plugins status code ${JSON.stringify(response.body)}`)
        expect(response.body.length).to.be.greaterThan(0, `Response body length of GET plugins is empty ${JSON.stringify(response.body)}`)
    })
    it("Should not GET plugins when user is invalid JWT authorised", async function(){
        // arrange: 
       
        const bearerToken = 123

        const header = {
            "Authorization": `Bearer ${bearerToken}`,
            "User-Agent": "Chrome"
        }

        // act:
        const response = await requestV2.get('/plugins').set(header)

        // assert:
        expect(response.statusCode).to.be.equal(401, `Assert failed on GET plugins status code ${JSON.stringify(response.body)}`)
    })
})