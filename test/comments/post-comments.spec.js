const { request, expect, faker } = require("../../config")

describe("/POST comments", function(){
    it("Should not create comment with invalid authorization", async function(){
        // arrange: 
        const payload = {    
                "article_id": 1,
                "user_id": 1,
                "body": "string",
                "date": "2024-01-29",
                "id": 21
        }

        const headers = {
            "authorization": "Basic Test123",
            "User-Agent": "Chrome"
        }

        const getCommentsBefore = await request.get('/comments').set('User-Agent','Chrome')
     

        // act:
        const response = await request.post('/comments').set(headers).send(payload)

        // asert:
        expect(response.statusCode).to.be.equal(403, `Assert failed on response ${JSON.stringify(response.body)}`)

        const getCommentsAfter = await request.get('/comments').set('User-agent','Chrome')
        expect(getCommentsBefore.body.length).to.be.equal(getCommentsAfter.body.length,`Body length before ${getCommentsAfter.body.length} is not equal to ${getCommentsBefore.body.length}`)
    })
    it("Should crate comment with valid authorization", async function(){
        // arrange: 
        const userId = 1
        const payload = {    
                "article_id": 1,
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

        const getCommentsBefore = await request.get('/comments').set('User-Agent','Chrome')
     

        // act:
        const response = await request.post('/comments').set(headers).send(payload)

        // asert:
        expect(response.statusCode).to.be.equal(201,
             `Assert failed on response ${JSON.stringify(response.body)}`)

        const getCommentsAfter = await request.get(`/comments`).set('User-agent','Chrome')
        const getCreatedComment = await request.get(`/comments/${response.body.id}`).set('User-agent','Chrome')
        payload.id = response.body.id

        expect(getCommentsAfter.body.length).to.be.greaterThan(getCommentsBefore.body.length,
            `Body length before ${getCommentsAfter.body.length} is not equal to ${getCommentsBefore.body.length}`)
        expect(getCreatedComment.body).to.be.eql(response.body,
            `Body before ${JSON.stringify(getCreatedComment.body)} is not equal to ${JSON.stringify(response.body)}`)
    })
})