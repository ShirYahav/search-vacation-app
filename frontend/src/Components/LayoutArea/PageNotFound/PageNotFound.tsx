import { NavLink } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
			<h1>Page Not Found</h1>
            <NavLink to="/login">
                <h3>Click Here To Login :)</h3>
            </NavLink>
        </div>
    );
}

export default PageNotFound;
