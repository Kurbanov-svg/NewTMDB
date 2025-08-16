import type { FC, ReactNode } from "react";
import { ConfigProvider, type ThemeConfig } from "antd";

interface IAntdProvidersProps {
  children: ReactNode;
}

const config: ThemeConfig = {
  token: {
    colorPrimary: "#ba18ff",
  },
  components: {
    Button: {
      borderRadius: 4,
      colorBorder: "#9336fd",
    },
    Input: {
      borderRadius: 4,
      colorBorder: "#9336fd",
      colorBgContainer: "#111111",
      colorText: "#fff",
      colorTextPlaceholder: "#757575",
    },
  },
};

export const AntdProviders: FC<IAntdProvidersProps> = ({ children }) => {
  return <ConfigProvider theme={config}>{children}</ConfigProvider>;
};
