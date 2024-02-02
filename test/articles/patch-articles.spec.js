const { request, expect, faker } = require("../../config")
const { articleIdToPatch, articleIds } = require("../../test-data/input-data")

describe("PATCH /articles", function(){
    it("should update valid article with valid title ", async function(){
        // arrange:
        
        const title = faker.lorem.words(3)
        const payload = {
            title
          }
          const articleId = articleIds.toPatch
          const expectedStatus = 200
          const responseWithBaseArticle = await request.get(`/articles/${articleId}`).set('User-Agent', 'Chrome')
          const expectedArticle = responseWithBaseArticle.body
          expectedArticle.title = title

          // act:
          const response = await request.patch(`/articles/${articleId}`).send(payload).set('User-agent','Chrome')
          //console.log(payload, response.body)

          // assert: 

          expect (response.statusCode).to.be.equal(expectedStatus, `Assert status code failed on response ${JSON.stringify(response.body)}`)
          const articleAfterPatch = await request.get(`/articles/${articleId}`).set('User-Agent', 'Chrome')
        
    
        expect(response.body).to.be.eql(expectedArticle,
             `Created article with payload ${JSON.stringify(expectedArticle)} does not match to response ${JSON.stringify(articleAfterPatch)}`)


        })
    })