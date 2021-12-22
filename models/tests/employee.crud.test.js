const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');


describe('Employee', () => {
  before(async () => {
      try {
        await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
      } catch(err) {
        console.error(err);
      }
  });

  describe('Reading data', () => {
    before(async () => {
        const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: '123' });
        await testEmpOne.save();
    
        const testEmpTwo = new Employee({ firstName: 'Ann', lastName: 'Sun', department: '456' });
        await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
        const employees = await Employee.find();
        const expectedLength = 2;
        expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by key names with "findOne" method', async () => {
        const employee = await Employee.findOne({ firstName: 'John' });
        const expectedName = 'John';
        const expectedLastName= 'Doe';
        const expDep= '123';
        expect(employee.firstName).to.be.equal(expectedName);
        expect(employee.lastName).to.be.equal(expectedLastName);
        expect(employee.department).to.be.equal(expDep);
    });
    after(async () => {
        await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
        const emp = new Employee({ firstName: 'John', lastName: 'Doe', department: '123' });
        await emp.save();
        expect(emp.isNew).to.be.false;
      });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {

    beforeEach(async () => {
        const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: '123' });
        await testEmpOne.save();
    
        const testEmpTwo = new Employee({ firstName: 'Ann', lastName: 'Sun', department: '456' });
        await testEmpTwo.save();
    });

    afterEach(async () => {
        await Employee.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
        await Employee.updateOne({  firstName: 'John' }, { $set: { firstName: 'John=' }});
        const updatedEmp = await Employee.findOne({ firstName: 'John=' });
        expect(updatedEmp).to.not.be.null;
    });
  
    it('should properly update one document with "save" method', async () => {
        const employee = await Employee.findOne({ firstName: 'John' });
        employee.firstName = '=John=';
        await employee.save();
      
        const updatedEmployee = await Employee.findOne({ firstName: '=John=' });
        expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
        await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
        const emplooyees = await Employee.find({ firstName: 'Updated!' });
        expect(emplooyees.length).to.be.equal(2);
    });

  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: '123' });
      await testEmpOne.save();
  
      const testEmpTwo = new Employee({ firstName: 'Ann', lastName: 'Sun', department: '456' });
      await testEmpTwo.save();
  });

  afterEach(async () => {
      await Employee.deleteMany();
  });

    it('should properly remove one document with "deleteOne" method', async () => {
        await Employee.deleteOne({ firstName: 'John' });
        const removeEmployee = await Employee.findOne({ firstName: 'John' });
        expect(removeEmployee).to.be.null;
    });
  
    it('should properly remove one document with "remove" method', async () => {
        const emp = await Employee.findOne({ firstName: 'John' });
        await emp.remove();
        const removeEmp = await Employee.findOne({ firstName: 'John' });
        expect(removeEmp).to.be.null;
    });
        
    it('should properly remove multiple documents with "deleteMany" method', async () => {
        await Employee.deleteMany({});
        const emp = await Employee.find();
        expect(emp.length).to.be.equal(0);
    });
  });

  after(() => {
    mongoose.models = {};
  });

});

