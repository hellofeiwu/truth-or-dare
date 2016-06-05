'use strict';

var $ = require('jquery');

var HttpRequest = {
  http_request_with_param_authentication: function (method, url, param, successCallback, errorCallback) {
      $.ajax({
                type: method,
                url: url,
                headers: {
                  authorization: window.localStorage.getItem('username')  
                },
                contentType: 'application/json',
                param: param,
                success: successCallback,
                error: errorCallback,
                dataType: 'json'
            });
  },
  http_request_with_data_authentication: function (method, url, data, successCallback, errorCallback) {
      $.ajax({
                type: method,
                url: url,
                headers: {
                  authorization: window.localStorage.getItem('username')  
                },
                contentType: 'application/json',
                data: data,
                success: successCallback,
                error: errorCallback,
                dataType: 'json'
            });
  },
  http_request_with_param: function (method, url, param, successCallback, errorCallback) {
      $.ajax({
                type: method,
                url: url,
                contentType: 'application/json',
                param: param,
                success: successCallback,
                error: errorCallback,
                dataType: 'json'
            });
  },
  http_request_with_data: function (method, url, data, successCallback, errorCallback) {
      $.ajax({
                type: method,
                url: url,
                contentType: 'application/json',
                data: data,
                success: successCallback,
                error: errorCallback,
                dataType: 'json'
            });
  },
};

module.exports = HttpRequest;