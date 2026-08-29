/**
 * Flush DNS cache
 * Used with Modules/Flush.sgmodule (type=generic, manual trigger)
 */
(async () => {
  const result = await httpAPI('POST', '/v1/dns/flush');
  $done(result);
})();

function httpAPI(method = 'GET', path, body = null) {
  return new Promise((resolve) => {
    $httpAPI(method, path, body, (result) => resolve(result));
  });
}
