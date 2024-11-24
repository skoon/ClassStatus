/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nc4bnu2yej53yrl")

  collection.name = "StudentLogEntries"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nc4bnu2yej53yrl")

  collection.name = "StudenLogEntries"

  return dao.saveCollection(collection)
})
