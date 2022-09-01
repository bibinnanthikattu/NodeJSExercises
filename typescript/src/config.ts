const MISSING_SETTINGS = "Warning: no value is for enviornment variable";

const config = {
    "port":process.env.PORT || MISSING_SETTINGS
}
export default config;