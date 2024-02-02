const { request, expect, faker } = require("../../config")

describe("POST /users", function(){
  // beforeEach(function(){
  //   console.log('Executed beforeEach in POST /users')
  // })

  // beforeAll(function(){
  //   console.log('Executed beforeAll in POST users')
  // })

  // afterAll(function(){
  //   console.log('Executed afterAll in POST users')
  // })

  // afterEach(function(){
  //   console.log('Executed afterEach in POST users')
  // })

    it("should create valid and unique user", async function(){
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

        // act:
        const response = await request.post("/users").send(payload).set('User-Agent', 'Chrome')

        //assync: 
        expect(response.statusCode).to.be.equal(201, `Assert failed on response ${JSON.stringify(response.body)}`)
        const responseWithUser = await request.get(`/users/${response.body.id}`).set('User-Agent', 'Chrome')
        
        payload.id = response.body.id
        expect(responseWithUser.body).to.be.eql(payload,
             `Created user with payload ${JSON.stringify(payload)} does not match to response ${JSON.stringify(response.body)}`)
    })

    describe("invalid, empty fields", function (){

      const emptyFields = ["email", "firstname", "lastname", "avatar"]

      emptyFields.forEach(field =>{
        it(`Should not create user with empty ${field}`, async function(){
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
            const getUsersBefore = await request.get("/users").set('User-Agent', 'Chrome')

            payload[field] = ""
            //console.log(field, payload)

    
          // act:
          const response = await request.post("/users").send(payload).set('User-Agent', 'Chrome')
    
          // assert:
          expect(response.statusCode).to.be.equal(422, `Assert failed on response ${JSON.stringify(response.body)}`)
          const getUsersAfter = await request.get("/users").set('User-Agent', 'Chrome')
          expect(getUsersAfter.body.length).to.be.equal(getUsersBefore.body.length, `Numbers of users after request does not match before request`)
    
        })
      })
    })
  
})

// eql = deep.equal
