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

const propTypes = {
  limit: PropTypes.number.isRequired,
  onLimitChange: PropTypes.func.isRequired,
};

class ConditionLimit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
    this.inputRef = undefined;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.inputRef.blur();
    }
  }

  handleFocus() {
    this.setState({ isFocused: true });
  }

  handleBlur() {
    this.setState({ isFocused: false });
  }

  handleValueChange(event) {
    const { onLimitChange } = this.props;

    let newLimit = parseInt(event.target.value, 10);
    if (Number.isNaN(newLimit)) {
      newLimit = 0;
    }
    onLimitChange(newLimit);
  }

  handleClick() {
    this.handleFocus();
    setTimeout(() => { this.inputRef.focus(); }, 0);
  }

  render() {
    const { isFocused } = this.state;
    const { limit } = this.props;

    return (
      <div className="condition-limit">
        {
          isFocused
            ? (
              <input
                ref={(ref) => { this.inputRef = ref; }}
                type="number"
                value={limit}
                onChange={this.handleValueChange}
                className="condition-limit__input condition-limit__input--focused"
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                min={0}
              />
            )
            : (
              <div
                className="condition-limit__input"
                role="presentation"
                onClick={this.handleClick}
              >
                {`Max ${limit}`}
              </div>
            )
        }
      </div>
    );
  }
}

ConditionLimit.propTypes = propTypes;

export default ConditionLimit;
