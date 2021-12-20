const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

it('should throw an error if no "firstName", "lastName" and "department"  arg', () => {
  const dep = new Employee({}); // create new Department, but don't set `name` attr value
  
  dep.validate(err => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
  });  
  after(() => {
      mongoose.models = {}
    });
  });

it('should throw an error if "firstName", "lastName" and "department" is not a string', () => {
  const cases = [{}, []]; 
  for(let firstName of cases) {
    const emp = new Employee({ firstName });

    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
    });
  } 
  for(let lastName of cases) {
      const emp = new Employee({ lastName });
  
      emp.validate(err => {
        expect(err.errors.lastName).to.exist;
      });
  } 
  for(let department of cases) {
      const emp = new Employee({ department });
  
      emp.validate(err => {
        expect(err.errors.department).to.exist;
      });
  }
  
}); 

it('should not throw an error if "firstName", "lastName" and "department" is okay', () => {
          
  const emp = new Employee( {  firstName: 'John', lastName: 'Doe',  department: 'Resources',} );

  emp.validate(err => {
   expect(err).to.not.exist;
    });
});


