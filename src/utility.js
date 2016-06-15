'use strict'
var utility = {}
utility.isTransaction = (transaction) => {
  if (!transaction) {
    return false
  }
  if (!transaction.contract || typeof transaction.contract !== 'string') {
    return false
  }
  if (!transaction.creditor || typeof transaction.creditor !== 'string') {
    return false
  }
  if (!transaction.debitor || typeof transaction.debitor !== 'string') {
    return false
  }
  if (!transaction.amount || isNaN(transaction.amount)) {
    return false
  }
  if (!transaction.items || !Array.isArray(transaction.items)) {
    return false
  }
  if (typeof transaction.hidden === 'undefined') {
    return false
  }
  if (!transaction.time || !(transaction.time instanceof Date && !isNaN(transaction.time.valueOf()))) {
    return false
  }
  if (!(typeof transaction.marshal === 'function')) {
    return false
  }
  if (!(typeof transaction.multihash === 'function')) {
    return false
  }
  return true
}

utility.isEntry = (entry) => {
  if (!utility.isTransaction(entry.transaction)) {
    return false
  }
  if(!entry.id || isNaN(entry.id)){
    return false
  }
  if (!(typeof entry.last === 'function')) {
    return false
  }
  return true
}

utility.unmarshalTransaction= (transaction) =>{

}
utility.unmarshalEntry= (entry) =>{

}

module.exports = utility