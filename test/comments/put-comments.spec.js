const { request, expect, faker } = require("../../config")

describe("/PUT comments", function(){
    it("Should update valid existing comment with valid authorization", async function(){
        // arrange: 
        const getCommentsBefore = await request.get('/comments').set('User-Agent','Chrome')
        const articleId = getCommentsBefore.body[1].article_id
        const userId = getCommentsBefore.body[1].user_id
        const commentId = getCommentsBefore.body[1].id
        console.log("article ID: ", articleId)
        console.log("comment ID: ", commentId)
        
        const payload = {    
                "article_id": articleId,
                "user_id" : userId,
                "body": faker.lorem.paragraphs(3),
                "date": new Date().toISOString().split('T')[0]
        }

        const responseWithUser = await request.get(`/users/${userId}`).set('User-Agent','Chrome')
        const userEmail = responseWithUser.body.email
        const userPass = responseWithUser.body.password
        const userEmailAndPass = `${userEmail}:${userPass}`

        const userEmailAndPassBase64 = Buffer.from(userEmailAndPass, 'utf8').toString('base64')

        const headers = {
            "authorization": `Basic ${userEmailAndPassBase64}`,
            "User-Agent": "Chrome"
        }

        // act:
        const response = await request.put(`/comments/${commentId}`).set(headers).send(payload)

        // asert:
        expect(response.statusCode).to.be.equal(200,
             `Assert failed on response ${JSON.stringify(response.body)}`)

        const getCommentsAfter = await request.get(`/comments`).set('User-agent','Chrome')
        const getUpdatedComment = await request.get(`/comments/${response.body.id}`).set('User-agent','Chrome')
        payload.id = response.body.id

        expect(getCommentsAfter.body.length).to.be.equal(getCommentsBefore.body.length,
            `Body length before ${getCommentsAfter.body.length} is not equal to ${getCommentsBefore.body.length}`)
        expect(getUpdatedComment.body).to.be.eql(response.body,
            `Body before ${JSON.stringify(getUpdatedComment.body)} is not equal to ${JSON.stringify(response.body)}`)
    })
})