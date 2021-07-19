const express = require("express")
const app = express()
require("dotenv").config()
const stripe = require("stripe")("sk_test_51JEFvSSINgwrzeuQjTWR3npzmRp5eliPB2SKah35AKiE0eO7qjaFTjuDmaks3kfMOMfBubZbu9AEiJFiYdnMj30D00GqHlZhGZ")
const cors = require("cors")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Spatula company",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

app.listen(process.env.PORT || 4000, () => {
	console.log("Server is listening on port 4000")
})