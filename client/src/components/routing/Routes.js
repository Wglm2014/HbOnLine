import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/register';
import Login from '../auth/login';
import Alert from '../alert';
import Dashboard from "../dashboard";
import BudgetForm from '../budgetForm';
import MovementsForm from '../movementsForm';
import TransfersForm from '../transfersForm';
//import NotFound from '../NotFound';
import PrivateRoute from '../routing/privateroute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/budgetform' component={BudgetForm} />
        <PrivateRoute exact path='/movementsform' component={MovementsForm} />
        <PrivateRoute exact path='/transfersform' component={TransfersForm} />

      </Switch>
    </section>
  );
};
export default Routes;


/*<Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <Route component={NotFound} />*/