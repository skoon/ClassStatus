/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nc4bnu2yej53yrl")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oagfzv2b",
    "name": "checkouttime",
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
