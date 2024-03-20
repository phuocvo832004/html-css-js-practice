//Constructor function
function Validator(options) {
  var selectorRules = {};

  function validate(inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );
    var errorMessage;

    //Lay ra cac ru cua tung selector
    var rules = selectorRules[rule.selector];
    //Lap qua trung rule va kiem tra
    //Neu co loi thi dung viec kiem tra
    for (var i = 0; i < rules.length; ++i) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) break;
    }
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }

  var formElement = document.querySelector(options.form);
  if (formElement) {
    formElement.onsubmit = function (e) {
      e.preventDefault();

      var isFormValid = true;

      //Thuc hien lap qua tung rule
      options.rules.forEach(function (rule) {
        var inputElement = document.querySelector(rule.selector);
        var isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });
      if (isFormValid) {
        console.log("co loi");
      } else {
        console.log("khong co loi");
      }
    };

    options.rules.forEach(function (rule) {
      //Luu lai cac rules cho moi input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.error);
      } else {
        selectorRules[rule.selector] = [rule.error];
      }

      var inputElement = document.querySelector(rule.selector);

      if (inputElement) {
        //Xu ly truong hop blur ra khoi inputs
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };

        //Xu ly moi khi nguoi dung nhap inputs
        inputElement.oninput = function () {
          var errorElement = inputElement.parentElement.querySelector(
            options.errorSelector
          );
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      }
    });
  }
}

//Dinh nghia rules
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    error: function (value) {
      return value.trim() ? undefined : message || "Vui long nhap truong nay";
    },
  };
};

Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    error: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : message || "Day la truong email";
    },
  };
};

Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    error: function (value) {
      return value.length >= min
        ? undefined
        : message || `Vui lòng nhập tối thiểu ${min} ký tự!`;
    },
  };
};

Validator.isConfirmed = function (selector, getConfirmedValue, message) {
  return {
    selector: selector,
    error: function (value) {
      return value === getConfirmedValue()
        ? undefined
        : message || "Xác nhận mật khẩu không thành công!";
    },
  };
};
