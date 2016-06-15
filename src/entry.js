'use strict'
const utility = require('./utility')
const ipld = require('ipld')
let _last = new WeakMap()
let _cache = new WeakMap()
module.exports = class entry {
  constructor (transaction, last, id) {
    if (utility.isTransaction(transaction)) {
      this.transaction = transaction
    } else {
      throw new Error("Invalid Transaction")
    }
    if (last) {
      let isEntry = utility.isEntry(last)
      let isString = typeof last === 'string'
      if (isEntry || isString) {
        _last.set(this, last)
        this.id = isEntry ? last.id++ : id || 1
      } else {
        throw new Error("Invalid Last Entry")
      }
      if (last.transaction.time > transaction.time) {
        throw new Error("Invalid Entry Transaction Time")
      }
    }
    else {
      this.id = id || 1;
    }
  }

  last () {
    let last = _last.get(this)
    if (typeof last === 'string') {

    } else {
      return _last.get(this)
    }
  }

  marshal () {
    let last = false
    if (_last.has(this)) {
      last = _last.get(this)
    }
    var entry = {
      id: this.id,
      transaction: { "/": "/ipfs/" + this.transaction.multihash() },
      last: last ? { "/": "/ipfs/" + last.multihash() } : ""
    }
    let marsh = ipld.marshal(entry)
    _cache.set(this, ipld.multihash(marsh))
    return marsh
  }

  multihash () {
    if (_cache.has(this)) {
      return _cache.get(this)
    } else {
      this.marshal()
      return _cache.get(this)
    }
  }
}