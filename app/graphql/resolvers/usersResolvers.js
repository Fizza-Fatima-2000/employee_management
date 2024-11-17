const allUserEmployee = require('./users/alluser(employee)');
const createEmployee = require('./users/create');
const specificemployee = require('./users/getSpecficEmployee');
const login = require('./users/login');
const allpaginatedemployee = require('./users/paginatedEmployees');
const updateEmployee = require('./users/update');

module.exports = 
  [createEmployee , updateEmployee , specificemployee , allUserEmployee , allpaginatedemployee, login]
