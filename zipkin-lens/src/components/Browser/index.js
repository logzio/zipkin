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
import PropTypes from 'prop-types';
import React from 'react';
import ReactSelect from 'react-select';

import TraceSummary from './TraceSummary';
import LoadingOverlay from '../Common/LoadingOverlay';

const propTypes = {
  traceSummaries: PropTypes.arrayOf(PropTypes.shape({
    width: PropTypes.number,
    infoClass: PropTypes.string,
    spanCount: PropTypes.number,
    durationStr: PropTypes.string,
    timestamp: PropTypes.number,
    servicePercentage: PropTypes.number,
    serviceSummaries: PropTypes.arrayOf(PropTypes.shape({
      serviceName: PropTypes.string,
      spanCount: PropTypes.number,
    })),
  })).isRequired,
  skewCorrectedTracesMap: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  clearTraces: PropTypes.func.isRequired,
};

const sortingMethodOptions = [
  { value: 'LONGEST', label: 'Longest First' },
  { value: 'SHORTEST', label: 'Shortest First' },
  { value: 'NEWEST', label: 'Newest First' },
  { value: 'OLDEST', label: 'Oldest First' },
];

class Browser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingMethod: 'LONGEST',
    };
    this.handleSortingMethodChange = this.handleSortingMethodChange.bind(this);
  }

  componentWillUnmount() {
    const { clearTraces } = this.props;
    clearTraces();
  }

  handleSortingMethodChange(selected) {
    this.setState({
      sortingMethod: selected.value,
    });
  }

  sortTraceSummaries() {
    const { traceSummaries } = this.props;
    const { sortingMethod } = this.state;

    return traceSummaries
      .sort((a, b) => {
        switch (sortingMethod) {
          case 'LONGEST':
            return b.duration - a.duration;
          case 'SHORTEST':
            return a.duration - b.duration;
          case 'NEWEST':
            return b.timestamp - a.timestamp;
          case 'OLDEST':
            return a.timestamp - b.timestamp;
          default:
            return 0;
        }
      });
  }

  renderResultsHeader() {
    const { traceSummaries } = this.props;
    const { sortingMethod } = this.state;
    return (
      <div className="browser__results-header">
        <div className="browser__total-results">
          {`${traceSummaries.length} results`}
        </div>
        <div>
          <ReactSelect
            onChange={this.handleSortingMethodChange}
            className="browser__sorting-method-select"
            options={sortingMethodOptions}
            value={{
              value: sortingMethod,
              label: sortingMethodOptions.find(opt => opt.value === sortingMethod).label,
            }}
          />
        </div>
      </div>
    );
  }

  renderResults() {
    const { skewCorrectedTracesMap } = this.props;
    const sortedTraceSummaries = this.sortTraceSummaries();
    return (
      <div className="browser__results">
        {
          sortedTraceSummaries.map(
            traceSummary => (
              <div
                key={traceSummary.traceId}
                className="browser__trace-summary-wrapper"
              >
                <TraceSummary

                  traceId={traceSummary.traceId}
                  width={traceSummary.width}
                  infoClass={traceSummary.infoClass}
                  spanCount={traceSummary.spanCount}
                  durationStr={traceSummary.durationStr}
                  timestamp={traceSummary.timestamp}
                  servicePercentage={traceSummary.servicePercentage}
                  serviceSummaries={traceSummary.serviceSummaries}
                  skewCorrectedTrace={skewCorrectedTracesMap[traceSummary.traceId]}
                />
              </div>
            ),
          )
        }
      </div>
    );
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div className="browser">
        <LoadingOverlay active={isLoading} />
        {this.renderResultsHeader()}
        {this.renderResults()}
      </div>
    );
  }
}

Browser.propTypes = propTypes;

export default Browser;
