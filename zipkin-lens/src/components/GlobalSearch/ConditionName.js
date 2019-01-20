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

const propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onConditionChange: PropTypes.func.isRequired,
  setNextFocusRef: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  isFocused: PropTypes.bool.isRequired,
};

class ConditionName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpened: false,
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  getMaxLengthOfOptions() {
    const { options } = this.props;
    let max = 4;
    options.forEach((option) => {
      const { length } = option;
      if (max < length) {
        max = length;
      }
    });
    return max;
  }

  getOptions() {
    const { options } = this.props;
    const result = [{
      value: '',
      label: 'all',
    }];
    options.forEach((option) => {
      result.push({
        value: option,
        label: option,
      });
    });
    return result;
  }

  handleFocus() {
    const { onFocus } = this.props;
    onFocus();
    setTimeout(() => { this.setState({ isMenuOpened: true }); }, 100);
  }

  handleBlur() {
    const { onBlur } = this.props;
    onBlur();
    this.setState({ isMenuOpened: false });
  }

  render() {
    const {
      value,
      onConditionChange,
      setNextFocusRef,
      isFocused,
    } = this.props;

    const {
      isMenuOpened,
    } = this.state;

    const maxLengthOfOptions = this.getMaxLengthOfOptions();
    return (
      <div className="condition-name">
        <ReactSelect
          ref={(ref) => { setNextFocusRef(ref); }}
          value={{ value, label: value === '' ? 'all' : value }}
          options={this.getOptions()}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          styles={{
            control: provided => ({
              ...provided,
              width: isFocused
                // When this component is focused, change the width of the
                // entier component according to the length of the max length
                // of the option strings.
                ? `${8 * maxLengthOfOptions + 16}px`
                // When this component is not focused, change the width of
                // the entire component according to the length of the value.
                : `${(8 * value.length) + 16}px`,
            }),
            // Disable because the dropdown indicator makes UX lower.
            indicatorsContainer: () => ({
              display: 'none',
            }),
            menuPortal: base => ({
              ...base,
              zIndex: 9999,
              width: `${8 * maxLengthOfOptions + 16}px`,
            }),
          }}
          onChange={(selected) => {
            onConditionChange(selected.value);
          }}
          menuPortalTarget={
            /* If we don't use portal, menu is hidden by the parent element. */
            document.body
          }
          classNamePrefix="condition-name-select"
          blurInputOnSelect
          menuIsOpen={isMenuOpened}
        />
      </div>
    );
  }
}

ConditionName.propTypes = propTypes;

export default ConditionName;
