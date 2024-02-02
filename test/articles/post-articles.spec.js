const { request, expect, faker } = require("../../config")

describe("POST /articles", function(){
    it("should create new article", async function(){
        // arrange:
        
        const title = faker.lorem.words(3)
        const body = faker.lorem.paragraphs(4)
        const payload = {
            "user_id": 8,
            title,
            body,
            "date": "2024-01-17",
            "image": ".\\data\\images\\256\\christian-cueni-Us3TUHxMl3U-unsplash.jpg"
          }
          const expectedStatus = 201

        // act:
        const response = await request.post("/articles").send(payload).set('User-Agent', 'Chrome')

        //assert:
        expect(response.statusCode).to.be.equal(expectedStatus, )

        const responseWithArticle = await request.get(`/articles/${response.body.id}`).set('User-Agent', 'Chrome')
        
        payload.id = response.body.id
        expect(responseWithArticle.body).to.be.eql(payload,
             `Created article with payload ${JSON.stringify(payload)} does not match to response ${JSON.stringify(response.body)}`)
    })

    describe("invalid, empty fields", function(){
      const emptyFields = ["title", "body", "date", "user_id"]

      emptyFields.forEach(field => {
        it(`should not create new article with empty ${field}`, async function(){
          // arrange:
          const title = faker.lorem.words(3)
          const body = faker.lorem.paragraphs(4)
          const payload = {
              user_id: 8,
              title,
              body,
              date: "2024-01-17",
              image: ".\\data\\images\\256\\christian-cueni-Us3TUHxMl3U-unsplash.jpg"
            }
            const expectedStatus = 422
            const getArticlesBefore = await request.get("/articles").set('User-Agent', 'Chrome')

            payload[field] = ""
           
            //console.log(field,payload)
    
          // act:
          const response = await request.post("/articles").send(payload).set('User-Agent', 'Chrome')
    
          //assert:
          expect(response.statusCode).to.be.equal(expectedStatus, `Assert failed on response ${JSON.stringify(response.body)}`)
    
          const getArticlesAfter = await request.get(`/articles`).set('User-Agent', 'Chrome')
    
          expect(getArticlesAfter.body.length).to.be.equal(getArticlesBefore.body.length,
          `length of Articles after request does not match length of articles before request`) 
      })
      });
    })
})

// payload = {
//     title,
//     body
//   }
//   dzięki właściowiościom JS jest równy:
  
//   payload = {
//   title: title,
//   body: body
//   }
  
//   albo:
  
//   payload = {
//   “title”: title,
//   “body”: body