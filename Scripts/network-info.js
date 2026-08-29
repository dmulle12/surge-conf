/**
 * Network Info 面板脚本
 * 配合 Modules/Panel.sgmodule 使用
 * 显示 Wi-Fi SSID、本机 IP 与出口位置
 */
(async () => {
  const wifi = $network.wifi;
  const v4 = $network.v4;
  let content = `SSID: ${wifi?.ssid || '未连接'}\n本机: ${v4?.primaryAddress || '-'}\n出口: 获取中...`;
  const panel = {
    title: '网络信息',
    content,
    icon: 'wifi',
    'icon-color': '#5AC8FA',
  };
  try {
    const geo = await httpGet('http://ip-api.com/json/?fields=status,message,country,city,isp,query&lang=zh-CN');
    if (geo.status === 'success') {
      panel.content = `SSID: ${wifi?.ssid || '未连接'}\n本机: ${v4?.primaryAddress || '-'}\n出口: ${geo.query}\n${geo.country} ${geo.city || ''}`;
    }
  } catch (e) {
    panel.content = `SSID: ${wifi?.ssid || '未连接'}\n本机: ${v4?.primaryAddress || '-'}\n出口: 查询失败`;
  }
  $done(panel);
})();

function httpGet(url) {
  return new Promise((resolve, reject) => {
    $httpClient.get({ url, timeout: 5000 }, (err, resp, body) => {
      if (err) return reject(err);
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
}
