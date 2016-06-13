var expect = require('chai').expect
var Transaction = require('./src/transaction')
var contract = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBSmL"
var creditor = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS23"
var debitor = "QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS09"
var amount = 1800
var items = []
var hidden= false

var trans= new Transaction(contract, creditor, debitor, amount, items, hidden)
console.log(trans.multihash())