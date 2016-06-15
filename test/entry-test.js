var expect = require('chai').expect
var Transaction = require('../src/transaction')
var Entry = require('../src/entry')

describe("test entry", () => {
  var contract = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBSmL"
  var creditor = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS23"
  var debitor = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS09"
  var amount = 1800
  var items = []
  var hidden= false
  var time= new Date("06/14/1997")
  it("test entry creation", ()=>{
    var trans= new Transaction(contract, creditor, debitor, amount, items, hidden, time)
    var entry= new Entry(trans)
    expect(entry).to.exist
    expect(entry.transaction).to.exist
    expect(entry.id).to.eql("QmTx63jZzNLE96A2762T7Fb9JPv85r99Av9FRisLJ87uxP")
    expect(entry.multihash()).to.eql("QmTx63jZzNLE96A2762T7Fb9JPv85r99Av9FRisLJ87uxP")
  })
  
})