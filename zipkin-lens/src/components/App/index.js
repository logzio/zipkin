/*
 * Copyright 2015-2019 The OpenZipkin Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Layout from './Layout';
import BrowserContainer from '../../containers/Browser/BrowserContainer';
import DetailedTraceSummaryContainer from '../../containers/DetailedTraceSummary/DetailedTraceSummaryContainer';
import DependenciesContainer from '../../containers/Dependencies/DependenciesContainer';
import configureStore from '../../store/configure-store';

const App = () => (
  <Provider store={configureStore()}>
    <BrowserRouter>
      <Layout>
        <Route
          exact
          path="/zipkin"
          render={props => (
            <BrowserContainer {...props} />
          )}
        />
        <Route
          exact
          path="/zipkin/trace/:traceId"
          render={props => (
            <DetailedTraceSummaryContainer {...props} />
          )}
        />
        <Route
          exact
          path="/zipkin/dependencies"
          render={props => (
            <DependenciesContainer {...props} />
          )}
        />
      </Layout>
    </BrowserRouter>
  </Provider>
);

export default App;
