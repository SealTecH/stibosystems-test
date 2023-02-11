const defaultTarget = 'http://localhost:3000';

module.exports = [{
   context: ['/users', '/countries', '/payments'],
   target: defaultTarget,
   secure: false
}
];
