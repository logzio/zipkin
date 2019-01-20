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

import { fetchTrace } from '../../actions/trace-action';
import DetailedTraceSummary from '../../components/DetailedTraceSummary';
import { treeCorrectedForClockSkew, detailedTraceSummary } from '../../zipkin';

const mapStateToProps = (state, ownProps) => {
  const props = {
    isLoading: state.trace.isLoading,
    traceId: ownProps.match.params.traceId,
  };
  if (state.trace.trace.length === 0) {
    props.traceSummary = null;
  } else {
    const corrected = treeCorrectedForClockSkew(state.trace.trace);
    props.traceSummary = detailedTraceSummary(corrected);
  }
  return props;
};

const mapDispatchToProps = dispatch => ({
  fetchTrace: traceId => dispatch(fetchTrace(traceId)),
});

const DetailedTraceSummaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailedTraceSummary);

export default DetailedTraceSummaryContainer;
