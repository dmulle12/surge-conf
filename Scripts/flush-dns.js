/**
 * Flush DNS 缓存
 * 配合 Modules/Flush.sgmodule 使用(type=generic,需手动触发)
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
