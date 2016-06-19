const expect = require('chai').expect
const Transaction = require('../src/transaction')
const TransactionService = require('../src/transaction-service')
const BlockService = require('ipfs-block-service')
const IPLDService = require('ipfs-ipld').IPLDService
const IPFSRepo = require('ipfs-repo')
const fsb = require('fs-blob-store')

describe('test transaction service', () => {
  var contract = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBSmL'
  var creditor = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS23'
  var debitor = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS09'
  var amount = 1800
  var items = []
  var hidden = false
  var trans = new Transaction(contract, creditor, debitor, amount, items, hidden)
  var repo = new IPFSRepo('./.repo', { stores: fsb })
  var bs = new BlockService(repo)
  var is = new IPLDService(bs)
  it('transaction-service add', () => {
    var ts = new TransactionService(is)
    ts.add(trans).then((transaction)=> {
      expect(transaction.multihash()).to.eql('QmdkdjUBSkAnLCUtAVruKcuypTXgxoNY9jG62AHWVMLz2y')
    }, (err)=> {
      expect(err).to.not.exist
    })
  })
  it('transaction-service get', () => {
    var ts = new TransactionService(bs)
    ts.get(trans.multihash()).then((transaction)=> {
      expect(transaction.multihash()).to.eql('QmdkdjUBSkAnLCUtAVruKcuypTXgxoNY9jG62AHWVMLz2y')
    }, (err)=> {
      expect(err).to.not.exist
    })
  })

})
