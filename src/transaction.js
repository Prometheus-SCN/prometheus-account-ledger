'use strict'
var ipld= require('ipld')

let _cache = new WeakMap()
module.exports= class transaction {
  constructor (contract, creditor, debitor, amount, items, hidden) {
    if (contract) {
      if (typeof contract === 'object') { // set properties with JSON Object
        if (contract.contract){
          this.contract = contract.contract
        } else{
          throw new Error("Invalid Contract ID")
        }
        if (contract.creditor){
          this.creditor = contract.creditor
        } else{
          throw new Error("Invalid Creditor")
        }
        if (contract.debitor){
          this.debitor = contract.debitor
        } else{
          throw new Error("Invalid Debitor")
        }
        if (contract.amount && !isNaN(contract.amount)){
          this.amount = contract.amount
        } else{
          throw new Error("Invalid Creditor")
        }
        this.items = contract.items || []
        this.hidden= contract.hidden
      } else{  //Set properties directly
        if (contract){
          this.contract = contract
        } else{
          throw new Error("Invalid Contract Hash")
        }
        if (creditor){
          this.creditor = creditor
        } else{
          throw new Error("Invalid Creditor Hash")
        }
        if (debitor){
          this.debitor = debitor
        } else{
          throw new Error("Invalid Debitor Hash")
        }
        if (amount && !isNaN(amount)){
          this.amount = amount
        } else{
          throw new Error("Invalid Amount")
        }
        this.items = contract.items || []
        this.hidden= contract.hidden || false

      }
    }
  }
  marshal(){
   var tran = {
     contract: this.contract,
     creditor: this.creditor,
     amount: this.amount,
     items: this.items,
     hidden: this.hidden
   }
   let marsh = ipld.marshal(tran)
    _cache.set(this, ipld.multihash(marsh))
   return marsh
  }
  multihash(){
    let mh =_cache.get(this)
    if(!mh){
      this.marshal()
      mh= _cache.get(this)
    }
    return mh
  }
}