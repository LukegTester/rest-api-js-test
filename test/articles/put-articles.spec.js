const { request, expect, faker } = require("../../config")
const { articleIdToPut, articleIds } = require("../../test-data/input-data")

describe("PUT /articles", function(){
    it("should update valid article ", async function(){
        // arrange:
        
        const title = faker.lorem.words(3)
        const body = faker.lorem.paragraphs(4)
        const payload = {
            "user_id": 1,
            title,
            body,
            "date": "2024-01-17",
            "image": ".\\data\\images\\256\\christian-cueni-Us3TUHxMl3U-unsplash.jpg"
          }

          const articleId = articleIds.toPut
          const expectedStatus = 200

          // act:
          const response = await request.put(`/articles/${articleId}`).send(payload).set('User-agent','Chrome')

          // assert: 

          expect (response.statusCode).to.be.equal(expectedStatus, `Assert failed on response ${JSON.stringify(response.body)}`)

          const responseWithArticle = await request.get(`/articles/${articleId}`).set('User-Agent', 'Chrome')
        
        payload.id = articleId
        expect(responseWithArticle.body).to.be.eql(payload,
             `Created article with payload ${JSON.stringify(payload)} does not match to response ${JSON.stringify(response.body)}`)


        })
    })