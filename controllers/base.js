exports.home = function homeAction (request, response, next) {
  response.send({
    'id': 84756132357,
    'name': 'User Name',
    'grettings': 'Helo World!!'
  })
}
