const BaseUrl = '/api/v1/';
module.exports = function(app) {
  app.use(BaseUrl+"faqs", require("../controllers/admin/faq"));
  app.use(BaseUrl+"pages", require("../controllers/admin/pages"));
  app.use(BaseUrl+"countries", require("../controllers/admin/country"));
  app.use(BaseUrl+"category", require("../controllers/admin/category"));
  app.use(BaseUrl+"currency", require("../controllers/admin/currency"));
  app.use(BaseUrl+"languages", require("../controllers/admin/language"));
  app.use(BaseUrl+"newsletters", require("../controllers/admin/newsletter"));
  app.use(BaseUrl+"payments", require("../controllers/admin/payment"));
  app.use(BaseUrl+"config", require("../controllers/admin/config"));
  app.use(BaseUrl+"configOption", require("../controllers/admin/configOption"));
}
