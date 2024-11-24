/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nc4bnu2yej53yrl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7o97v2l1",
    "name": "checkintime",
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
  collection.schema.removeField("7o97v2l1")

  return dao.saveCollection(collection)
})
