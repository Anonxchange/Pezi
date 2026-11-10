import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  arbitrum,
  avalanche,
  base,
  bsc,
  mainnet,
  optimism,
  polygon,
} from "@reown/appkit/networks";
import { createConfig, http } from "wagmi";

export const evmNetworks: [
  typeof mainnet,
  typeof polygon,
  typeof bsc,
  typeof arbitrum,
  typeof base,
  typeof optimism,
  typeof avalanche,
] = [
  mainnet,
  polygon,
  bsc,
  arbitrum,
  base,
  optimism,
  avalanche,
];

export const evmNetworkById = new Map<number, { id: number; name: string }>(
  evmNetworks.map(
    (network): [number, { id: number; name: string }] => [
      network.id,
      network,
    ],
  ),
);

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID?.trim();

export const wagmiAdapter = projectId
  ? new WagmiAdapter({
      networks: evmNetworks,
      projectId,
    })
  : null;

if (projectId && wagmiAdapter) {
  createAppKit({
    adapters: [wagmiAdapter],
    networks: evmNetworks,
    projectId,
    defaultNetwork: mainnet,
    metadata: {
      name: "Pexly",
      description: "Pexly non-custodial wallet",
      url:
        typeof window === "undefined"
          ? "https://pexly.com"
          : window.location.origin,
      icons: [],
    },
    features: {
      analytics: false,
      email: true,
      socials: ["google"],
    },
  });
}

export const isReownConfigured = Boolean(wagmiAdapter);
const readOnlyWagmiConfig = createConfig({
  chains: evmNetworks,
  connectors: [],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
    [avalanche.id]: http(),
  },
});

export const wagmiConfig = wagmiAdapter?.wagmiConfig ?? readOnlyWagmiConfig;
