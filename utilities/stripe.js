const dotenv = require('dotenv')
dotenv.config({ path: 'config.env' })
const stripe = require('stripe')(process.env.STRIPE_SECRET);

async function createCheckoutSession(products, req) {
    const lineItems = products.map(item => {
        return {
            price_data: {
                currency: 'egp',
                product_data: {
                    name: item.product.title,
                    description: item.product.description,
                },
                unit_amount: item.price * 100
            },
            quantity: 1
        }
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 50 * 100,
                        currency: 'egp',
                    },
                    display_name: 'Shipping fees',
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 3,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 5,
                        },
                    },
                },

            }
        ],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/orders`,
        cancel_url: `${req.protocol}://${req.get('host')}/cart`,
        customer_email: req.user.email,
        client_reference_id: req.params.cartID
    });

    return session
}

module.exports = {
    createCheckoutSession
};