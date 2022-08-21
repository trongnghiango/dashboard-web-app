const dotenv = require("dotenv");
dotenv.config();
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  publicRuntimeConfig: {
    firebaseView: process.env.FIREBASE_VIEW,
    publicUri: process.env.PUBLIC_URI,
    tinymceApiKey: process.env.TINYMCE_API_KEY,
    recaptcha: process.env.RECAPTCHA,
    nodeENV: process.env.NODE_ENV,
    nonceCode: process.env.NONCE_CODE,
    SM_ABI_BUY_TOKEN: process.env.SM_ABI_BUY_TOKEN,
    SM_ADDRESS_BUY_TOKEN: process.env.SM_ADDRESS_BUY_TOKEN,
    SM_ABI_CLAIM_TOKEN: process.env.SM_ABI_CLAIM_TOKEN,
    SM_ADDRESS_CLAIM_TOKEN: process.env.SM_ADDRESS_CLAIM_TOKEN,
    DASHBOARD_TYPE : process.env.DASHBOARD_TYPE
  },
});
