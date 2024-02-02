const { request, expect, faker } = require("../../config")
const { articleIdToDelete, articleIds } = require("../../test-data/input-data")

describe("DELETE /articles", function(){
    it("should delete new created valid article", async function(){
        // arrange:
        // const title = faker.lorem.words(3)
        // const body = faker.lorem.paragraphs(4)
        // const payload = {
        //     "user_id": 8,
        //     title,
        //     body,
        //     "date": "2024-01-17",
        //     "image": ".\\data\\images\\256\\christian-cueni-Us3TUHxMl3U-unsplash.jpg"
        //   }


        // const responseAfterArticleCreation = await request.post("/articles").send(payload).set('User-Agent', 'Chrome')
        // expect(responseAfterArticleCreation.statusCode).to.be.equal(201,
        //     `Assert failed on response after create ${JSON.stringify(responseAfterArticleCreation.body)}`)
        // const articleId = responseAfterArticleCreation.body.id

        // act: 
        const response = await request.delete(`/articles/${articleIds.toDelete}`).set('User-Agent', 'Chrome')

        // assert:
        expect(response.statusCode).to.be.equal(200,
            `Assert failed on response after delete ${JSON.stringify(response.body)}`)
        
        const responseAfterDelete = await request.get(`/articles/${articleIdToDelete}`).set('User-Agent', 'Chrome')
        expect(responseAfterDelete.statusCode).to.be.equal(404,
            `Assert failed on response GET after delete ${JSON.stringify(responseAfterDelete.body)}`)
       
    })
})