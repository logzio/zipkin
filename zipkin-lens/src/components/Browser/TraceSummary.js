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
import moment from 'moment';
import { Link } from 'react-router-dom';

import Timeline from '../Timeline';
import ServiceNameBadge from '../Common/ServiceNameBadge';
import { getErrorTypeColor } from '../../util/color';
import * as api from '../../constants/api';
import { detailedTraceSummary } from '../../zipkin';

const propTypes = {
  traceId: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  infoClass: PropTypes.string,
  spanCount: PropTypes.number.isRequired,
  durationStr: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  servicePercentage: PropTypes.number,
  serviceSummaries: PropTypes.arrayOf(PropTypes.shape({
    serviceName: PropTypes.string,
    spanCount: PropTypes.number,
  })).isRequired,
  skewCorrectedTrace: PropTypes.shape({}).isRequired,
};

const defaultProps = {
  infoClass: 'none',
  servicePercentage: undefined,
};

class TraceSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimelineOpened: false,
    };
    this.handleTimelineOpenToggle = this.handleTimelineOpenToggle.bind(this);
  }

  handleTimelineOpenToggle() {
    const { isTimelineOpened } = this.state;
    this.setState({ isTimelineOpened: !isTimelineOpened });
  }

  barColor() {
    const { infoClass } = this.props;
    switch (infoClass) {
      case 'trace-error-transient':
        return getErrorTypeColor('transient');
      case 'trace-error-critical':
        return getErrorTypeColor('critical');
      default:
        return getErrorTypeColor('none');
    }
  }

  renderBar(width, label) {
    return (
      <div
        className="trace-summary__bar-container"
        role="presentation"
        onClick={this.handleTimelineOpenToggle}
      >
        <div
          className="trace-summary__bar-wrapper"
          style={{ width: `${width}%` }}
        >
          <div
            className="trace-summary__bar"
            style={{ backgroundColor: this.barColor() }}
          />
        </div>
        <div className="trace-summary__bar-label">
          {label}
        </div>
      </div>
    );
  }

  renderButtons() {
    const { traceId } = this.props;
    const { isTimelineOpened } = this.state;
    return (
      <div className="trace-summary__buttons">
        <span
          className={`fas fa-angle-double-${isTimelineOpened ? 'up' : 'down'} trace-summary__button`}
          role="presentation"
          onClick={this.handleTimelineOpenToggle}
        />
        <a href={`${api.TRACE}/${traceId}`} target="_brank">
          <i className="fas fa-file-download" />
        </a>
        <Link to={{ pathname: `/zipkin/trace/${traceId}` }}>
          <i className="fas fa-angle-double-right" />
        </Link>
      </div>
    );
  }

  renderServiceBadges() {
    const { serviceSummaries } = this.props;
    return serviceSummaries.map(summary => (
      <div
        key={summary.serviceName}
        className="trace-summary__badge-wrapper"
      >
        <ServiceNameBadge
          serviceName={summary.serviceName}
          count={summary.spanCount}
        />
      </div>
    ));
  }

  renderTimeline() {
    const { skewCorrectedTrace } = this.props;
    const { isTimelineOpened } = this.state;

    if (!isTimelineOpened) {
      return null;
    }
    const detailedTrace = detailedTraceSummary(skewCorrectedTrace);
    return (
      <div className="trace-summary__timeline-wrapper">
        <Timeline
          startTs={0}
          endTs={detailedTrace.duration}
          traceSummary={detailedTrace}
        />
      </div>
    );
  }

  render() {
    const {
      traceId,
      width,
      servicePercentage,
      spanCount,
      durationStr,
      timestamp,
    } = this.props;

    const upperBarLabel = (
      <div className="trace-summary__upper-bar-label">
        <div>
          {`${spanCount}spans ${durationStr}`}
        </div>
        <div>
          {moment(timestamp / 1000).format('MM/DD HH:mm:ss:SSS')}
        </div>
      </div>
    );
    const lowerBarLabel = `${servicePercentage}%`;

    return (
      <div className="trace-summary">
        <div className="trace-summary__trace-id">
          Trace ID:&nbsp;
          <b>
            {traceId}
          </b>
        </div>
        <div className="trace-summary__upper-container">
          <div className="trace-summary__bars">
            {this.renderBar(width, upperBarLabel)}
            {servicePercentage ? this.renderBar(servicePercentage, lowerBarLabel) : null}
          </div>
          {this.renderButtons()}
        </div>
        <div className="trace-summary__lower-container">
          {this.renderServiceBadges()}
        </div>
        {this.renderTimeline()}
      </div>
    );
  }
}

TraceSummary.propTypes = propTypes;
TraceSummary.defaultProps = defaultProps;

export default TraceSummary;
