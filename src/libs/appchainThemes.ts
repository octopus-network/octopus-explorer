export const config = {
  default: {
    colors: {
      primary: {
        "50": "#ECF9F8",
        "100": "#C9EEED",
        "200": "#A6E2E1",
        "300": "#84D7D5",
        "400": "#61CCCA",
        "500": "#3EC1BE",
        "600": "#329A98",
        "700": "#257472",
        "800": "#194D4C",
        "900": "#0C2726"
      },
      secondary: {
        "50": "#E5FBFF",
        "100": "#B8F3FF",
        "200": "#8AECFF",
        "300": "#5CE5FF",
        "400": "#2EDDFF",
        "500": "#00D6FF",
        "600": "#00ABCC",
        "700": "#008099",
        "800": "#005566",
        "900": "#002B33"
      },
    }
  },
  debionetwork: {
    colors: {
      primary: {
        "50": "#F9EBF9",
        "100": "#EFC8EF",
        "200": "#E4A5E4",
        "300": "#DA81DA",
        "400": "#CF5ECF",
        "500": "#C43BC4",
        "600": "#9D2F9D",
        "700": "#762376",
        "800": "#4F174F",
        "900": "#270C27"
      },
      secondary: {
        "50": "#EFE8FC",
        "100": "#D3BFF8",
        "200": "#B796F3",
        "300": "#9B6DEE",
        "400": "#7F44E9",
        "500": "#621AE5",
        "600": "#4F15B7",
        "700": "#3B1089",
        "800": "#270B5B",
        "900": "#14052E"
      }
    }
  },
  myriad: {
    colors: {
      primary: {
        "50": "#F0E8FC",
        "100": "#D4BFF8",
        "200": "#B896F3",
        "300": "#9D6CEE",
        "400": "#8143EA",
        "500": "#651AE5",
        "600": "#5115B7",
        "700": "#3D1089",
        "800": "#290A5C",
        "900": "#14052E"
      },
      secondary: {
        "50": "#E8ECFD",
        "100": "#BECBF8",
        "200": "#94AAF4",
        "300": "#6B89F0",
        "400": "#4167EC",
        "500": "#1746E8",
        "600": "#1338B9",
        "700": "#0E2A8B",
        "800": "#091C5D",
        "900": "#050E2E"
      }
    }
  }
}

export function getAppchainTheme(appchainId) {
  if (config[appchainId]) {
    return config[appchainId];
  } else {
    return config.default;
  }
}
