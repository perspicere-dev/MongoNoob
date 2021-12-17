const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Department.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getRandom = async (req, res) => {

  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getOneById = async (req, res) => {

  try {
    const dep = await Department.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  } 
}

exports.post = async (req, res) => {

  try {
  
    const { name } = req.body;
    const newDepartment = new Department({ name: name });
    await newDepartment.save();
    res.json({ message: 'OK' });
  
  } catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.putById = async (req, res) => {
  const { name } = req.body;
  
  try {
    const dep = await Department.findById(req.params.id);
    if(dep) {
      await Department.findByIdAndUpdate({ _id: req.params.id }, {name: name}, (err, updated) => {
        console.log('updated', updated)
      });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.deleteById = async (req, res) => {

  try {
    const dep = await Department.findById(req.params.id);
    if(dep) {
      await Department.findByIdAndDelete({ _id: req.params.id }, (err, deleted) => {
        console.log('deleted', deleted)
      });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

  