var expect = require('chai').expect
var Entry=  require('./src/entry')
const ipld = require('ipld')
var Transaction = require('./src/transaction')
var contract = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBSmL"
var creditor = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS23"
var debitor = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS09"
var amount = 1800
var items = []
var hidden= false
var time = new Date("06/14/1997")

var trans= new Transaction(contract, creditor, debitor, amount, items, hidden, time)
var entry= new Entry(trans)
console.log(trans.multihash())
console.log(entry.multihash())
console.log(ipld.unmarshal(entry.marshal()))