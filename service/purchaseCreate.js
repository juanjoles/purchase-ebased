const config = require('ebased/util/config');
const dynamo = require('ebased/service/storage/dynamo');

const TABLE_NAME = config.get('purchase')

const purchaseCreate = async (purchase) => dynamo.putItem({TableName:TABLE_NAME, Item:purchase})

module.exports({purchaseCreate})