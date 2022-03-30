const mongoose = require('mongoose');

// importing schemas to create model
const importedfaqSchema = require('../schemas/faqschema');
const importedpageSchema = require('../schemas/pageschema');
const importedcountrySchema = require('../schemas/countryschema');
const importedImageSchema = require('../schemas/imageschema');
const importedcurrencySchema = require('../schemas/currencySchema')
const importedlanguageSchema = require('../schemas/languageSchema');
const importednewsletterSchema = require('../schemas/newsletterSchema');
const importedpaymentSchema = require('../schemas/paymentSchema');
const importedconfigSchema = require('../schemas/configschema');
const importedconfigOptionSchema = require('../schemas/configOptionSchema');

// Creating schema
const FaqSchema = mongoose.Schema(importedfaqSchema, { timestamps: true, versionKey: false });
const PageSchema = mongoose.Schema(importedpageSchema, { timestamps: true, versionKey: false });
const CountrySchema = mongoose.Schema(importedcountrySchema, { timestamps: true, versionKey: false });
const ImageSchema = mongoose.Schema(importedImageSchema,{timestamps: true, versionKey: false });
const CurrencySchema = mongoose.Schema(importedcurrencySchema,{timestamps: true, versionKey: false });
const LanguageSchema = mongoose.Schema(importedlanguageSchema,{timestamps: true, versionKey: false });
const NewsletterSchema = mongoose.Schema(importednewsletterSchema,{timestamps: true, versionKey: false });
const PaymentSchema = mongoose.Schema(importedpaymentSchema,{timestamps: true, versionKey: false });
const configSchema = mongoose.Schema(importedconfigSchema,{timestamps: true, versionKey: false });
const configOptionSchema = mongoose.Schema(importedconfigOptionSchema,{timestamps:true,versionKey:false});

// Creating models
const FaqModel = mongoose.model('faqs', FaqSchema);
const PageModel = mongoose.model('pages', PageSchema);
const CountryModel = mongoose.model('countries', CountrySchema);
const ImageModel = mongoose.model('image',ImageSchema);
const CurrencyModel = mongoose.model('currency',CurrencySchema);
const LanguageModel = mongoose.model('languages', LanguageSchema);
const NewsletterModel= mongoose.model('newsletter',NewsletterSchema)
const PaymentModel= mongoose.model('payments',PaymentSchema)
const ConfigModel= mongoose.model('config',configSchema)
const ConfigOptionModel=mongoose.model('configoptions',configOptionSchema)

module.exports = {
  faqs: FaqModel,
  pages: PageModel,
  countries: CountryModel,
  image :ImageModel,
  currency:CurrencyModel,
  languages: LanguageModel,
  newsletter:NewsletterModel,
  payments:PaymentModel,
  config:ConfigModel,
  configOption:ConfigOptionModel

}
