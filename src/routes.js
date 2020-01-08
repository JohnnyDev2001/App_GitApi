import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from "./pages/login";
import List from "./pages/list";

const Routes = createAppContainer(
    createSwitchNavigator({
      Login,
      List  
    })
);

export default Routes;