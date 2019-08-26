import React, { Fragment,Component} from "react";
import BudgetForm from "../budgetForm";
class Dashboard extends Component {
    render() {
        return(
            <Fragment>
                <h1 className="large text-primary">Budget</h1>
                <BudgetForm />
            </Fragment>)
    }

}

export default Dashboard;