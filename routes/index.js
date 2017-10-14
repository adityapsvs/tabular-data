var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var typeMappings  =
{
  "String": String,
  "Number": Number,
  "Boolean": Boolean,
  "ObjectId": mongoose.Schema.ObjectId
}

function makeSchema(jsonSchema) {
  var outputSchemaDef = {}
  for(fieldName in jsonSchema.data) {
    var fieldType = jsonSchema.data[fieldName];
    if(typeMappings[fieldType]) {
      outputSchemaDef[fieldName] = typeMappings[fieldType];
    } else {
      console.error("invalid type specified:", fieldType);
    }
  }
  return new mongoose.Schema(outputSchemaDef);
}

router.get('/', (req, res, next) => {
  res.send('Woila!');
})

router.post('/create_table', (req, res, next) => {
  var jsonSchema = {};
  //Add fieldArray and dataTypeArray into jsonSchema
  let newModel = mongoose.model(req.body.tableName, makeSchema(jsonSchema));
});

module.exports = router;
