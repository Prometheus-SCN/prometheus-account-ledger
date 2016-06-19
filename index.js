var expect = require('chai').expect
var Entry=  require('./src/entry')
const TransactionService = require('./src/transaction-service')
const BlockService = require('ipfs-block-service')
const IPFSRepo = require('ipfs-repo')
const fsb = require('fs-blob-store')
const ipld = require('ipld')
const utility =require('./src/utility')
const EntryService = require('./src/entry-service')
const IPLDService = require('ipfs-ipld').IPLDService
var Transaction = require('./src/transaction')
var contract = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBSmL"
var creditor = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS23"
var debitor = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS09"
var amount = 1800
var items = []
var hidden= false
var time = new Date("06/14/1997")
var time2 = new Date("06/14/2008")

var trans= new Transaction(contract, creditor, debitor, amount, items, hidden)
var entry= new Entry(trans, time)
var trans2= new Transaction(contract, debitor, creditor, amount, items, hidden)
var entry2= new Entry({transaction:trans2, time: time2, last: entry})

var repo = new IPFSRepo('./.repo', {stores: fsb})
var bs =  new BlockService(repo)
var is= new IPLDService(bs)
var ts= new TransactionService(is)
var es = new EntryService(is)

/*
es.add(entry).then((hash)=> {
  console.log("Added: " + hash)
  es.add(entry2).then((hash)=>{
    console.log("Added: " + hash)
  }).catch((err)=> console.log(err))
}).catch((err)=> console.log(err))

console.log("Entry2: ")
console.log(entry2)
es.get(entry2.multihash()).then((entry)=>{
 setTimeout(()=>{
   console.log(entry)
 }, 3000)


  entry.last().then((entry)=>{
    console.log("Last: " + entry.multihash())
  }).catch((err)=> console.log(err))

}).catch((err)=> console.log(err))
*/

//console.log(trans.multihash())
console.log(entry.multihash())
/*
console.log(ipld.unmarshal(entry.marshal()))
ts.add(trans).then((hash)=> console.log(hash)).catch((err)=> console.log(err))
ts.add(trans2).then((hash)=> console.log(hash)).catch((err)=> console.log(err))
ts.get(trans.multihash()).then((transaction)=> console.log(transaction.multihash())).catch((err)=> console.log(err))
  */