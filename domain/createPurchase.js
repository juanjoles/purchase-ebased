import { v4 as uuidv4 } from 'uuid';
const {PurchaseInput} = require('../schema/input/PurchaseInput');
const {getClient} = require('../service/getClientByDni');
const {purchaseCreate} = require('../service/purchaseCreate');


module.exports = async (commandPayload, commandMeta) => {
    new PurchaseInput(commandPayload,commandMeta);
    const {dni, products} = commandPayload;

    const client = await getClient(dni)
    
    if (!client.status) throw new error('Client is not active.');
    
    const idPurchase = uuidv4();
    
    let purchaseAmount = 0;
    products.forEach(p => {
        p.finalPrice = p.price * (client.card === 'Gold' ? 0.12 : 0.08 );
        purchaseAmount += p.finalPrice;
    });
    
    const points = Math.floor(purchaseAmount / 200);

    const purchase = {
        id: idPurchase,
        dni: dni,
        products: products,
        totalPrice: purchaseAmount,
        points: points
    };
    await purchaseCreate(purchase);
    return {status: 200, body: purchase};
};
