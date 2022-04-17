import { BrowserRouter, Route, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";
// import { MainPage, ComicsPage, SingleComicPage} from "../pages";
import Spiner from "../spiner/Spiner";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));


const App = () => {
    
    return (
            <BrowserRouter>
                <div className="app">
                  <AppHeader/>
                    <main>
                    <Suspense fallback={<Spiner/>}>
                        <Switch>
                            <Route exact path="/">
                                <MainPage />
                            </Route>
                            <Route exact path="/comics">
                            <ComicsPage />
                            </Route>
                            <Route exact path="/comics/:comicId">
                            <SingleComicPage />
                            </Route>
                            <Route exact path="*">
                            <Page404 />
                            </Route>
                        </Switch>
                    </Suspense>
                  </main>
                </div>
            </BrowserRouter>
        )
    }


export default App;