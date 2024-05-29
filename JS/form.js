document
  .getElementById("form-data")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formValues = {
      email: "",
      password: "",
      gender: "",
      role: "",
      permissions: [],
    };

    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      if (formValues[key]) {
        if (Array.isArray(formValues[key])) {
          formValues[key].push(value);
        } else {
          formValues[key] = value;
        }
      } else {
        formValues[key] = value;
      }
    });
    valdidationRules(formValues);
  });

function valdidationRules(formValues) {
  let isValid = true;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (!emailRegex.test(formValues.email)) {
    displayError("email");
    isValid = false;
  }

  if (!passwordRegex.test(formValues?.password)) {
    displayError("pswd");
    isValid = false;
  }

  if (formValues?.gender === "nan") {
    displayError("gender");
    isValid = false;
  }

  if (formValues.role.length <= 0) {
    displayError("allroles");
    isValid = false;
  }

  if (formValues.permissions.length < 2) {
    displayError("permissions");
    isValid = false;
  }

  if (isValid) {
    let formDetails = document.querySelector(".form-details");
    formDetails.style.display = "flex";
        Object.entries(formValues).map(([key,value])=>{
          let node = document.createElement("li");
          let textnode = document.createTextNode(`${key} : ${value}`);
          node.appendChild(textnode);
          document.getElementById("user-details").appendChild(node);
      
    })
    document.querySelector(".formData").style.display="none"
  }
}

function displayError(params) {
  document.querySelector(`#${params}`).style.border = "2px solid red";
  setTimeout(() => {
    document.querySelector(`#${params}`).style.border = "none";
  }, 3000);
}
