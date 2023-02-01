const {InputValidation} = require('ebased/schema/inputValidation');

class PurchaseInput extends InputValidation {
    constructor(payload, meta) {
        super({
            source: meta.status,
            payload: payload,
            source: "PURCHASE",
            specversion:"v1.0.0",
            schema:{
                strict:true,
                dni:{type:Number, required:true},
                products:{type:Object, required:true}
            },
        });
    }
}

module.exports = {PurchaseInput}