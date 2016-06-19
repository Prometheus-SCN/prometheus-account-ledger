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
    var trans= new Transaction(contract, creditor, debitor, amount, items, hidden)
    var entry= new Entry(trans, time)
    expect(entry).to.exist
    expect(entry.transaction).to.exist
    expect(entry.id).to.eql(1)
    expect(entry.multihash()).to.eql("QmYr7N9yBRPEiBUHy6M4msM6s2xauxsC7uDAbnpo49ptau")
  })
  it("test linking entries",()=>{
    var trans= new Transaction(contract, creditor, debitor, amount, items, hidden)
    var entry= new Entry(trans, time)
    var trans2= new Transaction(contract, debitor, creditor, amount, items, hidden)
    var entry2= new Entry({transaction:trans2, time: time2, last: entry})
    var entry3= new Entry({transaction:trans2, time: time2})
  })
  
})