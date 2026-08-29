# Surge 5 iOS Configuration Repository

This repository maintains the main Surge 5 (iOS/macOS) configuration, remote modules, and rule sets with version control on GitHub.

## Directory Structure

```
.
├── Surge.conf              # Main config (import into Surge using the URL below)
├── Modules/                # Remote modules (.sgmodule)
│   ├── General.sgmodule    #   General settings
│   ├── ADBlock.sgmodule    #   Ad blocking (rewrite rules)
│   ├── Sub-Store.sgmodule  #   Sub-Store subscription management
│   ├── Panel.sgmodule      #   Network info panel
│   └── Flush.sgmodule      #   DNS cache cleanup
├── Rules/                  # Remote rule sets (.list)
│   ├── Direct.list         #   Direct connection
│   ├── Proxy.list          #   Proxy
│   ├── Reject.list         #   Ad blocking
│   ├── Apple.list          #   Apple services
│   └── Lan.list            #   LAN/private network
└── Scripts/                # JS scripts
    ├── network-info.js     #   Panel script
    └── flush-dns.js        #   DNS flush
```

## Usage

### 1. Import the Main Config

In Surge, go to Configuration → Configuration File → Download from URL, then enter the URL below (replace `gleichners` with your GitHub username):

```
https://raw.githubusercontent.com/gleichners/surge-conf/main/Surge.conf
```

### 2. Install Modules

In Surge, go to Module → Install from URL. For example, ad blocking:

```
https://raw.githubusercontent.com/gleichners/surge-conf/main/Modules/ADBlock.sgmodule
```

### 3. Policy Groups

The `[Rule]` section in the main config references policies such as `REJECT / DIRECT / Apple / Proxy`. Please create corresponding policy groups in Surge (or use built-in `DIRECT` where appropriate). Add your own node subscriptions in the `[Proxy]` section or policy groups, and **do not commit subscription URLs to this repository**.

## Maintenance Notes

- Rule files use one rule per line, and lines starting with `#` are comments. After updates, Surge will auto-fetch the latest version (or tap "Update" in the config page).
- Module files must include `#!name` and `#!desc` headers.
- Before committing, check for leaked subscription links, node domains, or personal Hosts.
- If this repository is private, Surge may fail to fetch `raw.githubusercontent.com` anonymously. Consider GitHub Pages or keep the repository public.

## Security Notes

- `.gitignore` already excludes sensitive files such as `*.local.conf` and `secrets/`.
- Do not place real subscription URLs in the main config. If needed, store them in `private/` (already ignored).
- It is recommended to use a private repo + Surge Header Authorization, or keep sensitive content local.

## License

[MIT](LICENSE)
