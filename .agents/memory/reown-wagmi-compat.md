---
name: Reown and Wagmi compatibility
description: Pair AppKit's Wagmi connector with the Wagmi major used by the app.
---

When integrating AppKit in a Wagmi v2 app, keep `@wagmi/connectors` on v6 with a workspace override; the adapter's broad range can otherwise bring in v8 connectors designed for Wagmi v3.

**Why:** The initial dependency resolution selected connectors whose peer major did not match the app's Wagmi v2 setup, breaking adapter compatibility.

**How to apply:** When updating `@reown/appkit` or `@reown/appkit-adapter-wagmi`, verify the connector's supported Wagmi major and adjust the override in lockstep.
