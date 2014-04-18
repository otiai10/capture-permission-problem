# This is
an extension to inspect `chrome.tabs.captureVisibleTab`'s specification.

[`captureVisibleTab` changes its result implicitly - Google Product Forum](https://productforums.google.com/forum/#!category-topic/chrome/report-a-problem-and-get-troubleshooting-help/mac/35-Beta/bgarjaYuX78)

# THIS PROBLEM IS SOLVED!
See https://developer.chrome.com/extensions/activeTab#invoking-activeTab

> ... In contrast, an extension with the activeTab permission only obtains access to a tab in response to an explicit user gesture. ... 

Developer defined keyboard-events are *NOT* granted as "explicit user gestures".

Use `"commands"` declaration in `manifest.json` instead, like [56ee16507131fb6a3066e195baaa9dce2ed5e53c](https://github.com/otiai10/capture-permission-problem/commit/56ee16507131fb6a3066e195baaa9dce2ed5e53c).

# The Problem is

`chrome.tabs.captureVisibleTab` changes its result by the combination of permission declaration and its trigger.

such as

| trigger \ permissions     | `activeTab` | `<all_urls>` |
|:-------------------------:|:-----------:|:------------:|
| `browserAction.onClicked` |     ok      |  ok          |
| `runtime.onMessage`       |  undefined  |  ok          |

# Why it's problem
Just to capture current page, we (developers) don't need and also want to request users `<all_urls>` permission but `activeTab`.
Requesting `<all_urls>` permission, users might be sensitive to install extensions.
`permissions` field in `manifest.json` should resolve this users anxieties, so these behaviors of `permissions` can embarrass developers.

# To realize behaviors
use `manifest.ng.json` for `manifest.json`

The difference is just
```diff
--- manifest.ok.json    2014-04-14 01:33:50.000000000 +0900
+++ manifest.ng.json    2014-04-14 01:33:58.000000000 +0900
@@ -5,7 +5,7 @@
     "description": "",
     "permissions" : [
         "tabs",
-        "<all_urls>"
+        "activeTab"
     ],
     "browser_action": {
         "default_icon": "icon_128.png"
```
