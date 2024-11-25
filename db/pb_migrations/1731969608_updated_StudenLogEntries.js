/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nc4bnu2yej53yrl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "edbbgbqq",
    "name": "checkInTime",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oagfzv2b",
    "name": "checkOutTime",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nc4bnu2yej53yrl")

  // remove
  collection.schema.removeField("edbbgbqq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oagfzv2b",
    "name": "chekouttime",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
