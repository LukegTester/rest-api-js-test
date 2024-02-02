const { expect } = require("chai")

describe("Addition tests", function(){
    it("should add two positive numbers", function(){
      // arrange :
      const valueA = 8
      const valueB = 4
      const expectedResult = 12

      // act :
      const actualResult = addNumbers(valueA, valueB)

      // assert :
      expect(actualResult).to.be.equal(expectedResult, `During adding numbers ${valueA} + ${valueB}`)
    })
    it("should add two numbers - one positive and one negative", function(){
        // arrange :
        const valueA = -9
        const valueB = 4
        const expectedResult = -5
  
        // act :
        const actualResult = addNumbers(valueA, valueB)
  
        // assert :
        expect(actualResult).to.be.equal(expectedResult)
      })
    it("script 2", function(){
        console.log("Hello from script 2!")  
      })
      
})

function addNumbers(a, b){
    return a + b
}