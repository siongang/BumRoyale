const Typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  fontWeights: {
    light: "300" as const,
    regular: "400" as const,
    medium: "500" as const,
    bold: "700" as const,
  },
  lineHeights: {
    tight: 16,
    normal: 20,
    relaxed: 24,
    loose: 28,
  },
  fonts: {
    default: "Inter-Regular",      // general text
    heading: "Inter-SemiBold",     // headers
    body: "Inter-Medium",         // paragraphs
    mono: "RobotoMono-Regular",    // code/dev/number areas
  },
};

export default Typography;
