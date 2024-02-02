const { request, expect, faker } = require("../../config")
const { articleIdToGet, articleIds } = require("../../test-data/input-data")



describe("GET /articles", function(){
    it("should return status code 200 and more then 5 articles", async function(){
        //arrange: 
        const expectedStatusCode = 200
        const expectedNumberOfArticles = 5

        //act:
        const response = await request.get("/articles").set('User-Agent', 'Chrome')

        //assert:
       
        //console.log(response.body, response.body.length)

        expect(response.body.length).to.be.greaterThanOrEqual(expectedNumberOfArticles, `Expected to have more users then ${expectedNumberOfArticles}`)
    })
    it("should return article with given ID", async function(){
        //arrange:
        const expectedStatusCode = 200
        const expectedArticleId = articleIds.toGet
        const expectedTitle = 'The beauty of the sunset was obscured by the industrial cranes'

        //act:
        const response = await request.get(`/articles/${expectedArticleId}`).set('User-Agent','Chrome')

        //assert:
        expect(response.statusCode).to.be.equal(expectedStatusCode, `Error status code - we expected ${expectedStatusCode}`)
        expect(response.body.id).to.be.equal(expectedArticleId, `We expected article ID ${expectedArticleId} to be equal to ${JSON.stringify(response.body.id)}`)
        expect(response.body.title).to.be.equal(expectedTitle, `We expect that ${expectedTitle} will be equal to ${JSON.stringify(response.body)}`)
        //console.log(response.body)
    })
    it("should return article with given ID in URL param", async function(){
        //arrange:
        const expectedStatusCode = 200
        const expectedArticleId = articleIds.toGet
        //const expectedTitle = 'The beauty of the sunset was obscured by the industrial cranes'

        //act:
        const response = await request.get(`/articles?id=${expectedArticleId}`).set('User-Agent','Chrome')

        //assert:
        expect(response.body.length).to.be.equal(1, `Error status code - we expected body length at least 1`)
        expect(response.statusCode).to.be.equal(expectedStatusCode, `Error status code - we expected ${expectedStatusCode}`)
        expect(response.body[0].id).to.be.equal(expectedArticleId, `We expected article ID ${expectedArticleId} to be equal to ${JSON.stringify(response.body.id)}`)
        //expect(response.body[0].title).to.be.equal(expectedTitle, `We expect that ${expectedTitle} will be equal to ${JSON.stringify(response.body)}`)
        //console.log(response.body)
    })
})
