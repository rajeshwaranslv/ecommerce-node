function Capitalize(text){
  const capitalizedText   = text.charAt(0).toUpperCase() + text.slice(1)
  return capitalizedText
}

function UpperCase(text){
  const alteredText   = text.toUpperCase()
  return alteredText
}

function CreateSlug(text){
  var slug = text;
  slug = slug.replace(/[^\w\-]+/g, "-");
  slug = slug.toLowerCase();
  return slug
}

module.exports = {
  Capitalize : Capitalize,
  UpperCase  : UpperCase,
  CreateSlug : CreateSlug
};
