exports.missingParams = function (res, params) {
  if (!Array.isArray(params)) return res.status(400).send();
  return res.status(400).send('Bad Request. Missing or poorly formatted params: ' + params.join(', '));
};

exports.recordNotFound = function (res, message) {
  res.status(404).send(message);
};

exports.unauthorizedReq = function (res) {
  res.status(401).send('You do not have permisson to access this resource');
};
