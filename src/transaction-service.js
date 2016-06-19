'use strict'
const utility = require('./utility')
const Transaction = require('./transaction')
let _ipldService = new WeakMap()
module.exports =
  class transactionService {
    constructor (ipldService) {
      if (!ipldService) {
        throw new Error('Invalid Block Service')
      }
      _ipldService.set(this, ipldService)
    }

    add (transaction) {
      if (!utility.isTransaction(transaction)) {
        throw new Error('Invalid Transaction')
      }
      let ipldService = _ipldService.get(this)
      let prom = new Promise((resolve, reject) => {
        ipldService.add(transaction.marshal(), (err) => {
          if (err) {
            reject(err)
          } else {
            resolve(transaction.multihash())
          }
        })
      })
      return prom
    }

    get (multihash) {
      let ipldService = _ipldService.get(this)
      let prom = new Promise((resolve, reject) => {
        ipldService.get(multihash, (err, transaction) => {
          if (err) {
            reject(err)
          } else {
            resolve(new Transaction(transaction))
          }
        })
      })
      return prom
    }
}
