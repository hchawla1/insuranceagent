/*	
 * Copyright IBM Corp. 2016
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @author Steven Atkin
 */


var Policy = (function () {

  var policyData;

  // Publicly accessible methods defined
  return {
    getPolicy: getPolicy,

    getPolicyData: function () {
      return policyData;
    },

    setPolicyData: function (data) {
      policyData = data;
    }
  };


  function getPolicy(policy, language) {

    $.ajax({
      type: "GET",
      url: "/policy",
      data: {
        "customer": policy,
        "language": language
      },
      success: function (data) {
        // If there is no Intl object then use non localized forms
        var effectiveToDate = new Date(data.effectiveToDate.replace(/\/(\d\d)$/,"/20$1"));

        // localize date
        if (typeof Intl != "undefined") {
          data.effectiveToDate = new Intl.DateTimeFormat().format(effectiveToDate);
        } else {
          data.effectiveToDate = effectiveToDate.toString();
        }

        Policy.setPolicyData(data);
      },
      error: function (xhr, message) {
        alert(message);
      }
    });
  }

}());