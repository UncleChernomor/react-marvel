import ErrorMessage from "../components/errorMessage/ErrorMessage";
import {Link} from "react-router-dom";

const Page404 = () => {
    return (
        <>
            <ErrorMessage />
            <h2>Oops. This page doesn't exist</h2>
            <Link to="/">Go to HomePage</Link>
        </>
    );
}

export default Page404;
