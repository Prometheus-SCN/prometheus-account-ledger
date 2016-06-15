'use strict'
const IPLDService = require('ipfs-ipld')
const promisify = require('promisify-node')
const utility = require('./utility')
let _ipldService = new WeakMap
module.exports = class transactionService {
  constructor (blockService) {
    if (!blockService) {
      throw new Error("Invalid Block Service")
    }
    var ipldService = new IPLDService(blockService)
    _ipldService.set(this, promisify(ipldService))
  }

  add (transaction) {
    if (utility.isTransaction(transaction)){
      throw new Error("Invalid Transaction")
    }
    var ipldService = _ipldService.get(this)
    return ipldService.add(transaction)
  }

  get (multihash) {
    return ipldService.get(multihash)
  }
}
