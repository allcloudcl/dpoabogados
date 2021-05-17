import React from "react";
import { Switch, Route, withRouter } from "react-router";

import ContractList from "./ContractList";
import Contract from "./Contract";
import ContractNew from "./ContractNew";
import ContractSearch from "./ContractSearch";

function ContractsRouter(props) {
  return (
    <Switch>
      <Route path="/contracts" exact component={ContractList} />
      <Route path="/contracts/new" exact component={ContractNew} />
      <Route path="/contracts/search" exact component={ContractSearch} />
      <Route path="/contracts/:id" exact component={Contract} />
    </Switch>
  );
}

export default withRouter(ContractsRouter);
