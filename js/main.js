
/* eslint-disable */
/*stylelint-disable*/
'use strict';

var number = 645545965

function addDashes(num) {
  var str = num.toString();
  var result = [str[0]];

  for (var i = 1; i < str.length; i++) {
    var x = str[i] % 2;
    var y = str[i-1] % 2;
    var sum = x + y;
    if (sum === 1) {
      result.push('-', str[i]);
    } else {
      result.push(str[i]);
    }
    // или так
    // if (str[i] % 2 !== 0 && str[i - 1] % 2 === 0 || str[i] % 2 === 0 && str[i - 1] % 2 !== 0) {
    //   result.push('-', str[i]);
    // } else {
    //   result.push(str[i]);
    // }
  }
  return result.join('')
}

// test
// console.log(addDashes(645545965)); // '64-55-4-59-6-5'
// console.log(addDashes('411222333')); // '4-11-222-333'
// console.log(addDashes(81229576231)); // '8-1-22-957-62-31'


// ex2
var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Канада","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","Франция","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Германия","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Мужчина","Israel","Италия","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Швеция","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

function autocomplete(input, array) {
  var currentFocus;
  var matches = [];
  input.addEventListener("input", function(e) {
    var val = this.value;
    val = val.replace(/[^a-zа-яё]/gi, '');
    var hint;
    var b;
    closeAllLists();
    if (!val) { return false;}
    currentFocus = -1;

    hint = document.createElement("DIV");
    hint.setAttribute("id", this.id + "autocomplete-list");
    hint.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(hint);

    function createMatches(val, el) {
      b = document.createElement("DIV");
      b.innerHTML = "<strong>" + el.substr(0, val.length) + "</strong>";
      b.innerHTML += el.substr(val.length);
      b.innerHTML += "<input type='hidden' value='" + el + "'>";
      b.addEventListener("click", function(e) {
        input.value = this.getElementsByTagName("input")[0].value;
        closeAllLists();
      });
      hint.appendChild(b);
    }

    function createConditions(val, c) {
      if (c.substring(0, val.length).toUpperCase() == val.toUpperCase()) {
        if (matches.includes(c) == false && matches.length < 5) {
          matches.push(c);
        }
      }
    }

    function createNewArray(val) {
      matches = [];
      array.forEach(country => {
        createConditions(val, country);
      });
    };
    createNewArray(val);

    while (matches.length===0 && val.length > 1) {
      val = val.slice(0, -1).toUpperCase();
      array.forEach(country => {
        createConditions(val, country);
      });
    }

    matches.forEach(element => {
      createMatches(val, element);
    });
    return matches;
  });

  input.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) { //вниз
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) { //вверх
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) { //ENTER
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(el) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (el != x[i] && el != input) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}

document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

autocomplete(document.getElementById("myInput"), countries);
