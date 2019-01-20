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
export const FETCH_SERVICES_REQUEST = 'FETCH_SERVICES_REQUEST';
export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS';
export const FETCH_SERVICES_FAILURE = 'FETCH_SERVICES_FAILURE';

export const FETCH_SPANS_REQUEST = 'FETCH_SPANS_REQUEST';
export const FETCH_SPANS_SUCCESS = 'FETCH_SPANS_SUCCESS';
export const FETCH_SPANS_FAILURE = 'FETCH_SPANS_FAILURE';
export const CLEAR_SPANS = 'CLEAR_SPANS';

export const FETCH_TRACE_REQUEST = 'FETCH_TRACE_REQUEST';
export const FETCH_TRACE_SUCCESS = 'FETCH_TRACE_SUCCESS';
export const FETCH_TRACE_FAILURE = 'FETCH_TRACE_FAILURE';

export const FETCH_TRACES_REQUEST = 'FETCH_TRACES_REQUEST';
export const FETCH_TRACES_SUCCESS = 'FETCH_TRACES_SUCCESS';
export const FETCH_TRACES_FAILURE = 'FETCH_TRACES_FAILURE';
export const CLEAR_TRACES = 'CLEAR_TRACES';

export const FETCH_DEPENDENCIES_REQUEST = 'FETCH_DEPENDENCIES_REQUEST';
export const FETCH_DEPENDENCIES_SUCCESS = 'FETCH_DEPENDENCIES_SUCCESS';
export const FETCH_DEPENDENCIES_FAILURE = 'FETCH_DEPENDENCIES_FAILURE';
export const CLEAR_DEPENDENCIES = 'CLEAR_DEPENDENCIES';

export const GLOBAL_SEARCH_SET_LOOKBACK_CONDITION = 'GLOBAL_SEARCH_SET_LOOKBACK_CONDITION';
export const GLOBAL_SEARCH_SET_LIMIT_CONDITION = 'GLOBAL_SEARCH_SET_LIMIT_CONDITION';
export const GLOBAL_SEARCH_ADD_CONDITION = 'GLOBAL_SEARCH_ADD_CONDITION';
export const GLOBAL_SEARCH_DELETE_CONDITION = 'GLOBAL_SEARCH_DELETE_CONDITION';
export const GLOBAL_SEARCH_CHANGE_CONDITION_KEY = 'GLOBAL_SEARCH_CHANGE_CONDITION_KEY';
export const GLOBAL_SEARCH_CHANGE_CONDITION_VALUE = 'GLOBAL_SEARCH_CHANGE_CONDITION_VALUE';
