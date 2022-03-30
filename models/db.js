var DB = require("./schemaconnection");

function GetDocument(model, query, projection, extension, callback) {
  var query = DB[model].find(query, projection, extension.options);
  if (extension.populate) {
    query.populate(extension.populate);
  }
  if (extension.sort) {
    query.sort(extension.sort);
  }
  query.exec(function(err, docs) {
    if (extension.count) {
      query.count(function(err, docs) {
        callback(err, docs);
      });
    } else {
      callback(err, docs);
    }
  });
}

function GetOneDocument(model, query, projection, extension, callback) {
  var query = DB[model].findOne(query, projection, extension.options);
  if (extension.populate) {
    query.populate(extension.populate);
  }
  query.exec(function(err, docs) {
    callback(err, docs);
  });
}

function GetRecentDocumet(model, sort, limit,extension,callback) {
  var query = DB[model].find().sort({$natural:sort.sort}).limit(limit.limit);
  if (extension.populate) {
    query.populate(extension.populate);
  }
  query.exec(function(err, docs) {
    callback(err, docs);
  });
}

function GetAggregation(model, query,extension, callback) {
  DB[model].aggregate(query).exec(function(err, docs) {
    if (extension.populate) {
      DB[model].populate(docs, {path: extension.populate}, function(err, populatedTransactions) {
      callback(err, populatedTransactions);
      });
    } else {
      callback(err, docs);
    }
  });
}


function InsertDocument(model, docs, callback) {
  var doc_obj = new DB[model](docs);
  doc_obj.save(function(err, numAffected) {
    callback(err, numAffected);
  });
}

function DeleteDocument(model, criteria, callback) {
  DB[model].remove(criteria, function(err, docs) {
    callback(err, docs);
  });
}

function UpdateDocument(model, criteria, doc, options, callback) {
  DB[model].update(criteria, doc, options, function(err, docs) {
    callback(err, docs);
  });
}

function UpdateManyDocument(model, criteria, doc, options, callback) {
  DB[model].updateMany(criteria, doc, options, function(err, docs) {
    callback(err, docs);
  });
}

function FindUpdateDocument(model, criteria, doc, options, callback) {
  DB[model].findOneAndUpdate(criteria, doc, options, function(err, docs) {
    callback(err, docs);
  });
}

function GetCount(model, conditions, callback) {
  DB[model].count(conditions, function(err, count) {
    callback(err, count);
  });
}

function PopulateDocument(model, docs, options, callback) {
  DB[model].populate(docs, options, function(err, docs) {
    callback(err, docs);
  });
}

module.exports = {
  GetDocument           : GetDocument,
  GetOneDocument        : GetOneDocument,
  InsertDocument        : InsertDocument,
  DeleteDocument        : DeleteDocument,
  UpdateDocument        : UpdateDocument,
  FindUpdateDocument    : FindUpdateDocument,
  GetAggregation        : GetAggregation,
  PopulateDocument      : PopulateDocument,
  GetCount              : GetCount,
  UpdateManyDocument    : UpdateManyDocument,
  GetRecentDocumet      : GetRecentDocumet
};
