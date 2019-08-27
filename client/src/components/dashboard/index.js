import React, { Fragment } from "react";
import BudgetForm from "../budgetForm";
function Dashboard() {

    return (
        <Fragment>
            <h1 className="large text-primary">Budget</h1>
            <BudgetForm />
        </Fragment>)


}

export default Dashboard;