const participants = document.getElementById("participants");
const meetingEmployees = document.getElementById("meetingEmployees");
const empRequest = document.getElementById("empRequest");
const meetingLength = document.getElementById("meetingLength");
const earliestDate = document.getElementById("earliestDate");
const latestDate = document.getElementById("latestDate");
const officeHoursStart = document.getElementById("officeHoursStart");
const officeHoursEnd = document.getElementById("officeHoursEnd");
const find = document.getElementById("find");
const search = document.getElementById("search");
const suggestionResult = document.getElementById("suggestionResult");
const request = document.getElementById("request");
const spinner = document.getElementById("spinner");

// array to be filled with all desired employees for meeting
const actualparticipants = [];

let errorMsg = document.createElement("h5");
errorMsg.classList.add("errorMsg");

window.onload = function() {
  fillSelect(officeHoursStart);
  fillSelect(officeHoursEnd);

  find.onclick = () => {
    empRequest.innerHTML = "";
    spinner.style.display = "block";
    let value = participants.value;
    if (value.length >= 2) {
      fetchEmployee(value, result => {
        spinner.style.display = "none";
        if (!result) {
          printError("Something went wrong, please try again");
          return;
        }
        addAndFillEmployees(result);
      });
    } else {
      spinner.style.display = "none";
    }
  };

  search.onclick = () => {
    // do validation
    if (!validateInputs()) {
      return;
    }
    let obj = {
      toDate: [latestDate.value],
      employees: actualparticipants,
      officehoursStart: [officeHoursStart.value],
      meetingLength: [meetingLength.value],
      officehoursEnd: [officeHoursEnd.value],
      fromDate: [earliestDate.value]
    };

    fetchSuggestion(obj, result => {
      if (!result) {
        printError("Something went wrong, please try again");
        return;
      }

      addsuggestion(result);
      errorMsg.style.display = "none";
    });
  };
};

// fill the select elements of both Office Hours Start and End
fillSelect = element => {
  for (let hour = 8; hour <= 17; hour++) {
    for (let minute = 0; minute <= 1; minute++) {
      let option = document.createElement("option");
      option.value =
        (hour.toString().length == 1 ? "0" : "") +
        hour +
        ":" +
        minute * 30 +
        (minute == 0 ? "0" : "");
      option.innerHTML = option.value;
      element.appendChild(option);
      if (hour == 17) {
        break;
      }
    }
  }
};

let url = "https://stark-castle-84894.herokuapp.com";
// fetching the employees from heroku by sending a query
fetchEmployee = (query, handler) => {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/employees?q=" + query);
    promiseProcess(xhr, resolve, reject, handler);
  });
};

printError = message => {
  errorMsg.innerHTML += `<li class="errors">${message}</li>`;
  request.appendChild(errorMsg);
};

//append DOM with searched employees and add them to the meeting
addAndFillEmployees = result => {
  let text = document.createElement("h4");
  text.classList.add("addedText");
  text.innerHTML = `${result.matches.length} Results Found:`;
  empRequest.appendChild(text);
  for (let i = 0; i < result.matches.length; i++) {
    let matchedEmployee = document.createElement("li");
    matchedEmployee.classList += "matchedEmployee employee";
    matchedEmployee.innerHTML += '<i class="fas fa-plus add"></i>' + result.matches[i].name;

    //select desired employees to the meeting from the list of matched employees
    matchedEmployee.onclick = () => {
      meetingEmployees.style.display = "inline-block";
      let selectedEmployee = document.createElement("li");
      selectedEmployee.classList += "selectedEmployee employee";
      selectedEmployee.innerHTML = '<i class="fas fa-minus minus"></i>' + result.matches[i].name;
      if (actualparticipants.indexOf(result.matches[i].id) == -1) {
        actualparticipants.push(result.matches[i].id);
        meetingEmployees.appendChild(selectedEmployee);
      }
      selectedEmployee.onclick = () => {
        actualparticipants.pop(result.matches[i].id);
        meetingEmployees.removeChild(selectedEmployee);
      };
    };

    empRequest.style.display = "inline-block";
    empRequest.appendChild(matchedEmployee);
  }
};

//validate all inputs before sending the request
validateInputs = () => {
  errorMsg.innerHTML = "";
  suggestionResult.innerHTML = "";
  let status = true;
  if (actualparticipants.length == 0) {
    printError("Select Participants");
    status = false;
  }
  if (meetingLength.value == "") {
    printError("Select meeting length");
    status = false;
  }
  if (officeHoursStart.value > officeHoursEnd.value) {
    printError("Start Time can not be greater than End Time");
    status = false;
  }
  if (officeHoursStart.value == "") {
    printError("Select Office Hour Start");
    status = false;
  }
  if (officeHoursEnd.value == "") {
    printError("Select Office Hour End");
    status = false;
  }
  if (earliestDate.value == "") {
    printError("Select Earliest Date");
    status = false;
  }

  if (earliestDate.value > latestDate.value) {
    printError("Earliest Date can not be greater than Latest Date");
    status = false;
  }
  if (latestDate.value == "") {
    printError("Select Lastest  Date");
    status = false;
  }
  return status;
};

// fetching the suggestion response from heroku after sending the request
fetchSuggestion = (data, handler) => {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/suggestions" + formatParams(data));
    promiseProcess(xhr, resolve, reject, handler);
  });
};

//append DOM with the final result of the suggesstion
addsuggestion = result => {
  let text = document.createElement("h4");
  text.classList.add("addedText");
  text.innerHTML = `${result.suggestions.length} Possible Days with the following time:`;
  suggestionResult.appendChild(text);
  let suggestions = result.suggestions;
  for (let i = 0; i < suggestions.length; i++) {
    let ul = document.createElement("ul");
    let dateLi = document.createElement("li");
    dateLi.classList.add("dateLi");
    dateLi.innerHTML += suggestions[i].date;
    let startTimes = suggestions[i].start_times;
    for (let j = 0; j < startTimes.length; j++) {
      let timeLi = document.createElement("li");
      timeLi.classList.add("timeLi");
      timeLi.innerHTML += startTimes[j].substring(0, startTimes[j].lastIndexOf(":"));
      ul.appendChild(timeLi);
    }
    dateLi.innerHTML += ul.innerHTML;
    suggestionResult.appendChild(dateLi);
  }
  suggestionResult.style.display = "inline-block";
};

// to continue the promise process.
promiseProcess = (xhr, resolve, reject, handler) => {
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.status < 400) {
      resolve(xhr.response);
      handler(xhr.response);
    } else {
      reject(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      handler(false);
    }
  };
  xhr.onerror = () => reject(new Error("Network request failed"));
  xhr.send();
};

// create the get request params for fetchSuggestion link
function formatParams(params) {
  return (
    "?" +
    Object.keys(params)
      .map(function(key) {
        if (Array.isArray(params[key])) {
          let arr = params[key];
          let param = "";
          for (let i = 0; i < arr.length; i++) {
            param += key + "=" + encodeURIComponent(arr[i]);
            if (i != arr.length - 1) {
              param += "&";
            }
          }
          console.log(param);

          return param;
        }
        return key + "=" + encodeURIComponent(params[key]);
      })
      .join("&")
  );
}
