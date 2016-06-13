var expect = require('chai').expect
var Transaction = require('../src/transaction')


describe('test transaction', () => {
  var contract = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBSmL"
  var creditor = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS23"
  var debitor = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS09"
  var amount = 1800
  var items = []
  var hidden= false

  it('transaction creation', () => {
    var trans= new Transaction(contract, creditor, debitor, amount, items, hidden)
    expect(trans).to.exist
    expect(trans.contract).to.eql(contract)
    expect(trans.creditor).to.eql(creditor)
    expect(trans.debitor).to.eql(debitor)
    expect(trans.amount).to.eql(amount)
    expect(trans.items).to.eql(items)
    expect(trans.hidden).to.eql(hidden)
    expect(trans.multihash()).to.eql('QmaYMM4zExZFsgaFAX2stMNAStGpPMhherECoZEuvMf7Xg')
  })

  it('transaction creation from json', () => {
    var trans= new Transaction({contract: contract, creditor: creditor, debitor: debitor, amount: amount, items: items, hidden: hidden})
    expect(trans).to.exist
    expect(trans.contract).to.eql(contract)
    expect(trans.creditor).to.eql(creditor)
    expect(trans.debitor).to.eql(debitor)
    expect(trans.amount).to.eql(amount)
    expect(trans.items).to.eql(items)
    expect(trans.hidden).to.eql(hidden)
  })

})