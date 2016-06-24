#Prometheus Account Ledger
This is the account ledger primitives for Prometheus: The Social Currency Network

##Install Instructions
```
npm i prometheus-account-ledger --save
```
## Usage
### Types
* Transaction
* Entry
* Utility
* Transaction Service
* Entry Service

#### Transaction
**Transaction (contract, creditor, debitor, amount, items, hidden)**

Returns a transaction object. Constructor will accept a single json object representative of its properties

``` javascript
const Transaction = require("prometheus-account-ledger").Transaction

var contract = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBSmL' //hash of contract
var creditor = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS23' //hash creditor account
var debitor = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS09' //hash of debitor account
var amount = 1800 //amount
var items = [] //line items totalling to the amount
var hidden = false // private line items

var trans = new Transaction(contract, creditor, debitor, amount, items, hidden)
```
**marshal()**

Returns an IPLD representation of a transaction object
``` javascript
var ipldTrans = trans.marshal() //buffer
```

**multihash()**

Returns the multihash of an IPLD representation of a transaction object
``` javascript
var hash= trans.multihash() // base 58 encoded string
```

#### Entry
**Entry (transaction, time, last, id, entryService)**

Returns an Entry Object. Constructor accepts transaction objects and IPLD links to transaction objects. Constructor accepts json object representation of properties. Time and transaction are required parameters. Last must be another entry object or an IPLD link to an entry object with an older time stamp. It emits a **'transaction loaded'** event when trasaction is set to a transaction object.
``` javascript
const Transaction = require("prometheus-account-ledger").Transaction
const Entry = require("prometheus-account-ledger").Entry

var contract = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBSmL' //hash of contract
var creditor = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS23' //hash creditor account
var debitor = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS09' //hash of debitor account
var amount = 1800 //amount
var items = [] //line items totalling to the amount
var hidden = false // private line items
var time = new Date() //time of transaction

var trans = new Transaction(contract, creditor, debitor, amount, items, hidden)
var entry = new Entry(trans, time)
```
**marshal()**

Returns an IPLD representation of a transaction object
``` javascript
var ipldEntry = entry.marshal() //buffer
```

**multihash()**

Returns the multihash of an IPLD representation of an entry object

``` javascript
var hash = entry.multihash() // base 58 encoded string
```

**last()**

Returns a promise that resolves to the prior entry object if present. If no entry service is present and last is an IPLD link an error will be thrown. It emits an **'entry loaded'** event when last is set to an entry object.

``` javascript
entry.last((ntry)=> console.log(ntry.multihash())).catch((err)=> console.log(err))
```
#### Transaction Service
**TransactionService (ipldService)**

Returns a Transaction Service. Constructor accepts transaction objects and IPLD links to transaction objects. Constructor accepts json object representation of properties. Time and transaction are required parameters. Last must be another entry object or an IPLD link to an entry object with an older time stamp. It emits a **'transaction loaded'** event when trasaction is set to a transaction object.
``` javascript
const Transaction = require("prometheus-account-ledger").Transaction
const TransactionService= require("prometheus-account-ledger").TransactionService

var contract = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBSmL' //hash of contract
var creditor = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS23' //hash creditor account
var debitor = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS09' //hash of debitor account
var amount = 1800 //amount
var items = [] //line items totalling to the amount
var hidden = false // private line items

var trans = new Transaction(contract, creditor, debitor, amount, items, hidden)
var repo = new IPFSRepo('./test/.repo', { stores: fsb })
var bs = new BlockService(repo)
var is = new IPLDService(bs)

var ts = new TransactionService(is)
```
**get (multihash)**

Returns a promise that resolves to a transaction object retrieved from storage by its multihash
``` javascript
ts.get('QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS23').then((trans)=> console.log(trans.multihash())).catch((err)=> console.log(err))
```

**add (transaction)**

Returns a promise that resolves to the multihash of the successfully stored transaction object

``` javascript
ts.add(trans).then((hash)=> console.log('Added Transaction: ' + hash)).catch((err)=> console.log(err))
```

#### Entry Service
**EntryService (ipldService))**

Returns a Transaction Service. Constructor accepts transaction objects and IPLD links to transaction objects. Constructor accepts json object representation of properties. Time and transaction are required parameters. Last must be another entry object or an IPLD link to an entry object with an older time stamp. It emits a **'transaction loaded'** event when trasaction is set to a transaction object.
``` javascript
const Transaction = require("prometheus-account-ledger").Transaction
const Entry = require("prometheus-account-ledger").Entry
const EntryService = require("prometheus-account-ledger").EntryService

var contract = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBSmL' //hash of contract
var creditor = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS23' //hash creditor account
var debitor = 'QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS09' //hash of debitor account
var amount = 1800 //amount
var items = [] //line items totalling to the amount
var hidden = false // private line items
var time = new Date() //time of transaction

var trans = new Transaction(contract, creditor, debitor, amount, items, hidden)
var repo = new IPFSRepo('./test/.repo', { stores: fsb })
var bs = new BlockService(repo)
var is = new IPLDService(bs)

var es = new EntryService(is)
```
**get (multihash)**

Returns a promise that resolves to a transaction object retrieved from storage by its multihash
``` javascript
ts.get('QmQtX5JVbRa25LmQ1LHFChkXWW5GaWrp7JpymN4oPuBS23').then((trans)=> console.log(trans.multihash())).catch((err)=> console.log(err))
```

**add (transaction)**

Returns a promise that resolves to the multihash of the successfully stored transaction object

``` javascript
ts.add(trans).then((hash)=> console.log('Added Transaction: ' + hash)).catch((err)=> console.log(err))
```


