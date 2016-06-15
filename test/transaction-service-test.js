const expect = require('chai').expect
const Transaction = require('../src/transaction')
const TransactionService = require('../src/transaction-service')
const BlockService = require('ipfs-block-service')
const IPFSRepo = require('ipfs-repo')
const fsb = require('fs-blob-store')


describe("test transaction service", () => {
  var contract = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBSmL"
  var creditor = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS23"
  var debitor = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS09"
  var amount = 1800
  var items = []
  var hidden= false
  var time= new Date()
  var trans= new Transaction(contract, creditor, debitor, amount, items, hidden, time)
  var repo = new IPFSRepo('./.repo', {stores: fsb})
  var bs =  new BlockService(repo)
  it("transaction-service creation", () => {
    var ts= new TransactionService(bs)
    ts.add(trans).then((hash)=>{
      
    },(err)=>{
      expect(trans).to.not.exist
    })


    expect(trans).to.exist
    expect(trans.contract).to.eql(contract)
    expect(trans.creditor).to.eql(creditor)
    expect(trans.debitor).to.eql(debitor)
    expect(trans.amount).to.eql(amount)
    expect(trans.items).to.eql(items)
    expect(trans.hidden).to.eql(hidden)
    expect(trans.multihash()).to.eql('QmaYMM4zExZFsgaFAX2stMNAStGpPMhherECoZEuvMf7Xg')
  })



})
