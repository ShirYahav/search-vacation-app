class Config {

}

class DevelopmentConfig extends Config {
    public isDevelopment = true;
    public mysql = { host: "localhost", user: "root", password: "", database: "BookingProject3" };
}

class ProductionConfig extends Config {
    public isDevelopment = false;
    public mysql = { host: "eu-cdbr-west-02.cleardb.net", user: "bcf0d9f9d14bb1", password: "6fce4aab", database: "heroku_eea34074bc974e1" };
}

const config = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();

export default config;