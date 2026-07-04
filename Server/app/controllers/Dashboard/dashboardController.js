const { render } = require("ejs");

class Dashboard_Controller {
  async dashboard(req, res) {
    try {
      res.render("dashboard.ejs", {
        title: req.cookies.adminName,
        role:req.cookies.adminRole,
        image:req.cookies.adminImg
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Dashboard_Controller();
