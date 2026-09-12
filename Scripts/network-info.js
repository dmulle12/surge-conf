/**
 * Network info panel script
 * Used with Modules/Panel.sgmodule
 * Displays Wi-Fi SSID, local IP, and egress location
 */
(async () => {
  const wifi = $network.wifi;
  const v4 = $network.v4;
  let content = `SSID: ${wifi?.ssid || 'Disconnected'}\nLocal: ${v4?.primaryAddress || '-'}\nEgress: Loading...`;
  const panel = {
    title: 'Network Info',
    content,
    icon: 'wifi',
    'icon-color': '#5AC8FA',
  };
  try {
    const geo = await httpGet('http://ip-api.com/json/?fields=status,message,country,city,isp,query&lang=en');
    if (geo.status === 'success') {
      panel.content = `SSID: ${wifi?.ssid || 'Disconnected'}\nLocal: ${v4?.primaryAddress || '-'}\nEgress: ${geo.query}\n${geo.country} ${geo.city || ''}`;
    }
  } catch (e) {
    panel.content = `SSID: ${wifi?.ssid || 'Disconnected'}\nLocal: ${v4?.primaryAddress || '-'}\nEgress: Query failed`;
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
