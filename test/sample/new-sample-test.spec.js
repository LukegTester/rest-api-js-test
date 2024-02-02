const { expect } = require("chai")

function multiplyNumbers(a, b){
    return a * b
}

describe ("Multiply test", function(){
    it("Should multiply positive numbers", function(){
        //arange:
        const valueA = 2
        const valueB = 4
        const expectedResult = 8

        //act:
        const actualResult = multiplyNumbers(valueA, valueB)

        //asert:
        expect(actualResult).to.be.equal(expectedResult, `During multiply numbers ${valueA} * ${valueB}`)
    }
    )
})