"use strict";

const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("./mongoose")
const Card = require("./schemaCard")
const Column = require("./schemaColumn")
const columnsPath = "./data/columnsNew.json";
const cardsPath = "./data/cardsNew.json";
const defaultColumns = require(columnsPath);
const defaultCards = require(cardsPath);
const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

Column.find(function (err, column) {
  console.log("Список Columns: " + column)
  if (!column.length) {
    postColumns()
      .then(() => Column.find(function (err, column) {
        console.log("2")
        postCards()
      }))
  }
})

let ids = {}
function postColumns() {
  for (let i = 0; i < defaultColumns.length; i++) {
    let column = new Column(defaultColumns[i])
    console.log(column)
    ids[column.title] = column.id
    column.save(function (err, result) {
    })
  }
  return Promise.resolve()
}
function postCards() {
  console.log(ids)
  for (var key in ids) {
    console.log("Объект: " + key + " : " + ids[key])
  }
  for (let i = 0; i < defaultCards.length; i++) {
    let card = new Card(defaultCards[i])
    for (var key in ids) {
      if (card.columnId === key) {
        card.columnId = ids[key]
        break
      }
    }
    card.save(function (err, result) {
    })
  }
}

app.get("/api/column", function (req, res) {
  Column.find(function (err, column) {
    console.log("get columns");
    console.log(column);
    res.type("application/json").send(JSON.stringify(column, null, 2));
  })

});

app.get("/api/card", function (req, res) {
  Card.find(function (err, cards) {
    console.log("get cards");
    console.log(cards);
    res.type("application/json").send(JSON.stringify(cards, null, 2));
  })

});

app.delete("/api/card/:id", function (req, res) {
  const { id } = req.params;

  console.log("delete card", id);
  Card.deleteOne({ _id: id }, (card, err) => {
    console.log("Карточка удалена")
    res.send();
  })
});

app.post("/api/card", function (req, res) {
  const card = req.body;
  console.log("post card", card);
  let newCard = new Card({
    title: card.title,
    columnId: card.columnId
  })
  console.log(newCard)
  newCard.save(function (err, result) {
    console.log("Карточка создана")

    res.send()
  })
});

app.patch("/api/card/:id", function (req, res) {
  const { id } = req.params;
  const patch = req.body.data;

  console.log("patch card", id, patch);
  if (req.body.flag === "title") {
    Card.findById(id, (err, card) => {
      card.title = patch
      card.save(function (err, result) {
        console.log("Карточка обновлена")
        res.send()
      })
    })
  }
  else if (req.body.flag === "columnId") {
    Card.findById(id, (err, card) => {
      card.columnId = patch
      card.save(function (err, result) {
        console.log("Карточка обновлена")
        res.send()
      })
    })
  }
});

app.listen(8888, function () {
  console.log("Visit http://localhost:8888");
});
