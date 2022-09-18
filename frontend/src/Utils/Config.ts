
class Config {

}

class DevelopmentConfig extends Config {
    public appUrl = "http://localhost:3001/"
    public vacationsUrl = "http://localhost:3001/api/vacations/";
    public vacationImageUrl = "http://localhost:3001/api/vacations/images/";
    public userLoginUrl = "http://localhost:3001/api/auth/login/";
    public userRegisterUrl = "http://localhost:3001/api/auth/register/";
    public followersUrl = "http://localhost:3001/api/followers/";
}

class ProductionConfig extends Config {
    public appUrl = "https://project3-by-shir.herokuapp.com/"
    public vacationsUrl = " https://project3-by-shir.herokuapp.com/api/vacations/";
    public vacationImageUrl = " https://project3-by-shir.herokuapp.com/api/vacations/images/";
    public userLoginUrl = " https://project3-by-shir.herokuapp.com/api/auth/login/";
    public userRegisterUrl = " https://project3-by-shir.herokuapp.com/api/auth/register/";
    public followersUrl = " https://project3-by-shir.herokuapp.com/api/followers/";

}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;