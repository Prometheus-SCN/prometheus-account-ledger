'use strict'
const utility = require('./utility')
const Entry = require('./entry')
const TransactionService = require('./transaction-service')
let _ipldService = new WeakMap()
module.exports =
  class entryService {
    constructor (ipldService) {
      if (!ipldService) {
        throw new Error('Invalid IPLD Service')
      }
      _ipldService.set(this, ipldService)
    }

    add (entry) {
      if (!utility.isEntry(entry)) {
        throw new Error('Invalid Entry')
      }
      let ipldService = _ipldService.get(this)
      let prom = new Promise((resolve, reject) => {
        ipldService.add(entry.marshal(), (err) => {
          if (err) {
            reject(err)
          } else {
            resolve(entry.multihash())
          }
        })
      })
      return prom
    }

    get (multihash) {
      let ipldService = _ipldService.get(this)
      let self = this
      let prom = new Promise((resolve, reject) => {
        ipldService.get(multihash, (err, entry) => {
          if (err) {
            reject(err)
          } else {
            resolve(new Entry(entry, self))
          }
        })
      })
      return prom
    }

    getTransactionService () {
      let ipldService = _ipldService.get(this)
      return new TransactionService(ipldService)
    }
}
