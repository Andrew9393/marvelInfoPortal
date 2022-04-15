import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from "../pages";



// class App extends Component {
//     state = {
//         selectedChar: null
//     }

//     onCharSelected = (id) => {
//         this.setState({
//             selectedChar: id
//         })
//     }

//     render () {
//         return (
    
const App = () => {
    
    return (
            <BrowserRouter>
                <div className="app">
                  <AppHeader/>
                    <main>
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route exact path="/comics">
                           <ComicsPage/>
                        </Route>
                    </Switch>
                  </main>
                </div>
            </BrowserRouter>
        )
    }


export default App;