const Subscriber = require('../models/Subscriber');
const sendEmail = require('../helper/emailService');

class SubscriptionController {
    async subsView(req, res) {
        const subscribers=await Subscriber.find() 
        try {
          res.render("subscribers.ejs", {
            title: req.cookies.adminName,
            role:req.cookies.adminRole,
            image:req.cookies.adminImg,
            subscribers
          });
          console.log("img", req.cookies.adminImg);
          // console.log("name", title)
          
        } catch (error) {
          console.log(error);
        }
      }
    async subscribe(req, res) {
        const { email } = req.body;
        const existing = await Subscriber.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Already Subscribed' });

        await Subscriber.create({ email });
        await sendEmail(email, 'Subscription Confirmed',`<h2>Dear, ${email}</h2>, <h3>Thank you for subscribing WelnessBloom!</h3>`);

        res.status(201).json({ message: 'Subscribed Successfully' });
    }
}

module.exports = new SubscriptionController();