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
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import GlobalSearch from '../../components/GlobalSearch';
import { fetchSpans } from '../../actions/spans-action';
import { fetchServices } from '../../actions/services-action';
import { fetchTraces } from '../../actions/traces-action';
import {
  setLookbackCondition,
  setLimitCondition,
  addCondition,
  deleteCondition,
  changeConditionKey,
  changeConditionValue,
} from '../../actions/global-search-action';

const mapStateToProps = state => ({
  spans: state.spans.spans,
  services: state.services.services,
  conditions: state.globalSearch.conditions,
  lookbackCondition: state.globalSearch.lookbackCondition,
  limitCondition: state.globalSearch.limitCondition,
});

const mapDispatchToProps = dispatch => ({
  fetchServices: () => dispatch(fetchServices()),
  fetchSpans: serviceName => dispatch(fetchSpans(serviceName)),
  fetchTraces: params => dispatch(fetchTraces(params)),
  setLookbackCondition: lookbackCondition => dispatch(setLookbackCondition(lookbackCondition)),
  setLimitCondition: limitCondition => dispatch(setLimitCondition(limitCondition)),
  addCondition: condition => dispatch(addCondition(condition)),
  deleteCondition: index => dispatch(deleteCondition(index)),
  changeConditionKey: (index, conditionKey) => {
    dispatch(changeConditionKey(index, conditionKey));
  },
  changeConditionValue: (index, conditionValue) => {
    dispatch(changeConditionValue(index, conditionValue));
  },
});

const GlobalSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GlobalSearch);

export default withRouter(GlobalSearchContainer);
