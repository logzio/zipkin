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

import Timeline from '../Timeline';
import LoadingOverlay from '../Common/LoadingOverlay';
import MiniTraceViewer from './MiniTraceViewer';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  traceId: PropTypes.string.isRequired, /* From url parameter */
  traceSummary: PropTypes.shape({}),
  fetchTrace: PropTypes.func.isRequired,
};

const defaultProps = {
  traceSummary: null,
};

class DetailedTraceSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTs: null,
      endTs: null,
    };
    this.handleStartAndEndTsChange = this.handleStartAndEndTsChange.bind(this);
  }

  componentDidMount() {
    const { fetchTrace, traceId, traceSummary } = this.props;
    if (!traceSummary || traceSummary.traceId !== traceId) {
      fetchTrace(traceId);
    }
  }

  handleStartAndEndTsChange(startTs, endTs) {
    this.setState({ startTs, endTs });
  }

  renderHeader() {
    const { traceId, traceSummary } = this.props;
    const {
      durationStr,
      serviceNameAndSpanCounts,
      spans,
      depth,
    } = traceSummary;

    return (
      <div className="detailed-trace-summary__header">
        <div className="detailed-trace-summary__trace-id">
          {traceId}
        </div>
        <div className="detailed-trace-summary__trace-data-list">
          {
            [
              { label: 'Duration', value: durationStr },
              { label: 'Services', value: serviceNameAndSpanCounts.length },
              { label: 'Depth', value: depth },
              { label: 'Total Spans', value: spans.length },
            ].map(elem => (
              <div
                key={elem.label}
                className="detailed-trace-summary__data-wrapper"
              >
                <div className="detailed-trace-summary__data-label">
                  {elem.label}
                </div>
                <div className="detailed-trace-summary__data-value">
                  {elem.value}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }

  render() {
    const { startTs, endTs } = this.state;
    const { isLoading, traceId, traceSummary } = this.props;

    return (
      <div>
        <LoadingOverlay active={isLoading} />
        <div className="detailed-trace-summary">
          {
            (!traceSummary || traceSummary.traceId !== traceId)
              ? null
              : (
                <div>
                  {this.renderHeader()}
                  <div className="detailed-trace-summary__mini-trace-viewer-wrapper">
                    <MiniTraceViewer
                      startTs={startTs || 0}
                      endTs={endTs || traceSummary.duration}
                      traceSummary={traceSummary}
                      onStartAndEndTsChange={this.handleStartAndEndTsChange}
                    />
                  </div>
                  <div className="detailed-trace-summary__timeline-wrapper">
                    <Timeline
                      startTs={startTs || 0}
                      endTs={endTs || traceSummary.duration}
                      traceSummary={traceSummary}
                    />
                  </div>
                </div>
              )
          }
        </div>
      </div>
    );
  }
}

DetailedTraceSummary.propTypes = propTypes;
DetailedTraceSummary.defaultProps = defaultProps;

export default DetailedTraceSummary;
