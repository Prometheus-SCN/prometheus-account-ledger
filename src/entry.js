'use strict'
const utility = require('./utility')
const ipld = require('ipld')
let _last = new WeakMap()
let _cache = new WeakMap()
let _entryService = new WeakMap()
module.exports = class entry {
  constructor (transaction, time, last, id, entryService) {
    if (arguments.length == 2) {
      if (utility.isTransaction(transaction)) {
        this.transaction = transaction
      } else {
        transaction = arguments[ 0 ][ 'transaction' ] || null
        time = arguments[ 0 ][ 'time' ] || null
        last = arguments[ 0 ][ 'last' ] || null
        id = arguments[ 0 ][ 'id' ] || null
        entryService = arguments[ 1 ] || null
      }
    } else if (arguments.length == 1) {
      transaction = arguments[ 0 ][ 'transaction' ] || null
      time = arguments[ 0 ][ 'time' ] || null
      last = arguments[ 0 ][ 'last' ] || null
      id = arguments[ 0 ][ 'id' ] || null
      entryService = arguments[ 0 ][ 'entryService' ] || null
    }

    if (entryService) {
      _entryService.set(this, entryService)
    }

    if (!this.transaction) {
      if (utility.isTransaction(transaction)) {
        this.transaction = transaction
      } else {
        if (utility.isIPLDLink(transaction)) {
          if (entryService) {
            let ts = entryService.getTransactionService()
            ts.get(transaction[ '/' ])
              .then(((transaction)=> {
                this.transaction = transaction
              }).bind(this))
              .catch((err)=> {
                throw err
              })
          } else {
            throw new Error('Entry Service Required for IPLD Links')
          }
        } else {
          throw new Error('Invalid Transaction')
        }
      }
    }
    if (time && time instanceof Date) {
      this.time = time
    } else {
      throw new Error('Invalid Time')
    }
    if (last) {
      let isEntry = utility.isEntry(last)
      let isString = typeof last === 'string'
      let isIPLDLink = utility.isIPLDLink(last)
      if (isIPLDLink) {
        _last.set(this, last)
        this.id = id
      } else {
        if (isEntry || isString) {
          _last.set(this, last)
          this.id = isEntry ? (last.id + 1) : (id || 1)
        } else {
          throw new Error('Invalid Last Entry')
        }
        if (last.time > this.time) {
          throw new Error('Invalid Entry Transaction Time')
        }
      }
    } else {
      this.id = id || 1
    }

  }

  last () {
    let last = _last.get(this)
    let prom = new Promise((resolve, reject)=> {
      if (utility.isIPLDLink(last)) {
        let entryService = _entryService.get(this)
        if (entryService) {
          entryService.get(last[ '/' ])
            .then(((entry)=> {
                _last.set(this, entry)
                resolve(entry)
              })
              .bind(this)
            )
            .catch((err)=> {
              reject(err)
            })
        } else {
          reject(new Error('No Entry Service Defined'))
        }
      } else {
        resolve(last)
      }

    })
    return prom

  }

  marshal () {
    let last = false
    if (_last.has(this)) {
      last = _last.get(this)
    }
    var entry = {
      id: this.id,
      transaction: this.transaction ? (utility.isIPLDLink(this.transaction) ? this.transaction : { '/': this.transaction.multihash() }) : '',
      last: last ? (utility.isIPLDLink(last) ? last : { '/': last.multihash() }) : '',
      time: this.time
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