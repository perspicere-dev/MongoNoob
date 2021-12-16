const mongoose = require('mongoose');

const employeesSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    department: { type: String, required: true },
  });

  module.exports = mongoose.model('Employee', employeesSchema); //Mongoose zakłada, że model tyczy się tej kolekcji, której nazwa jest równa nazwie modelu, ale pisanej z małych liter i zakończonej literą "s". Zatem jeśli nasz model nazywa się Department, to Mongoose powiąże go z kolekcją danych departments. Jeśli taka kolekcja jeszcze by nie istniała, to zostałaby automatycznie utworzona.