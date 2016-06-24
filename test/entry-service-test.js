const expect = require('chai').expect
const Transaction = require('../src/transaction')
const Entry = require('../src/entry')
const EntryService = require('../src/entry-service')
const BlockService = require('ipfs-block-service')
const IPLDService = require('ipfs-ipld').IPLDService
const IPFSRepo = require('ipfs-repo')
const fsb = require('fs-blob-store')

describe('test entry service', () => {
  var repo = new IPFSRepo('./test/.repo', { stores: fsb })
  var bs = new BlockService(repo)
  var is = new IPLDService(bs)
  var es = new EntryService(is)
  var contract = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBSmL'
  var creditor = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS23'
  var debitor = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS09'
  var amount = 1800
  var items = []
  var hidden = false
  var time = new Date('06/14/1997')
  var trans = new Transaction(contract, creditor, debitor, amount, items, hidden)
  var entry = new Entry(trans, time)

  it('test get', () => {
    es.get(entry.multihash())
      .then((ntry) => {
        expect(ntry.multihash()).to.eql(entry.multihash())
      })
      .catch((err) => {
        expect(err).to.not.exist
      })
  })

  it('test add', () => {
    es.add(entry)
      .then((hash) => {
        expect(hash).to.eql(entry.multihash())
      })
      .catch((err) => {
        expect(err).to.not.exist
      })
  })

})
