import {lazy, Suspense} from "react";
import {Route, Switch} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import {ComicsPage, HomePage, ComicsSinglePage, Character} from "../../pages";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../../pages/Page404'));
const App = () => {

    return (
        <div className="app">
            <AppHeader />
            <main style={{padding: '10px 35px'}}>
                <Suspense fallback={<Spinner />}>
                    <Switch>
                        <Route path='/characters/:id' component={Character} />
                        <Route path='/comics/:id' component={ComicsSinglePage} />
                        <Route exact path='/comics' component={ComicsPage} />
                        <Route exact path='/' component={HomePage} />
                        <Route path='*' component={Page404} />
                    </Switch>
                </Suspense>
            </main>
        </div>
    )
}

export default App;