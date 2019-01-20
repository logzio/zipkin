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
import { Link } from 'react-router-dom';

import Logo from '../../img/zipkin-logo.svg';

const propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

const pageInfo = {
  browser: {
    url: '/zipkin',
    label: 'Search',
    icon: 'fa-search',
  },
  dependencies: {
    url: '/zipkin/dependencies',
    label: 'Dependencies',
    icon: 'fa-code-branch',
  },
};

class Sidebar extends React.Component {
  renderPageOption(pageName) {
    const { location } = this.props;
    const { url } = pageInfo[pageName];
    const isSelected = location.pathname === url;
    return (
      <div className={`sidebar__page-option${isSelected ? '--selected' : ''}`}>
        <Link
          to={{ pathname: url }}
          className={`sidebar__page-option-link${isSelected ? '--selected' : ''}`}
        >
          <div className="sidebar__page-option-icon">
            <i className={`fas ${pageInfo[pageName].icon}`} />
          </div>
          <div>
            {pageInfo[pageName].label}
          </div>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="sidebar">
        <div
          to={{ pathname: '' }}
          className="sidebar__brand-link"
        >
          <Logo className="sidebar__brand-logo" />
        </div>
        <div className="sidebar__menu">
          {this.renderPageOption('browser')}
          {this.renderPageOption('dependencies')}
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;

export default Sidebar;
