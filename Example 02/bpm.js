//Inicialização da API do workflow
this.workflowCockpit = workflowCockpit({
  init: _init,
  onSubmit: _saveData,
  onError: _rollback,
});

// Função init é chamada ao abrir o formulário
function _init(data, info) {
  // Caso seja executado algum serviço externo ao abrir o formulário e o retorno dele seja atribuído a variáveis de execução
  // essas variáveis serão preenchidas
  if (data && data.loadContext) {
    const { initialVariables } = data.loadContext;
    console.log("initialVariables: " + JSON.stringify(initialVariables));
  }
  
  info
    .getUserData()
    .then(function (user) {
      // Usuário logado
      document.getElementById("nomFun").setAttribute("value", user.fullname);
      document.getElementById("emaFun").setAttribute("value", user.email);
    })
    .then(function () {
      info.getPlatformData().then(function (platformData) {
        // Informações da G7
        this.tokenG7 = platformData.token;
        this.serviceUrl = platformData.serviceUrl;
        this.odataUrl = platformData.odataUrl;
      });
    });

  // Retorna os dados que já foram previamente preenchidos no formulário
  info.getInfoFromProcessVariables().then(function (data) {
    // Somente recupera os dados caso não seja a criação de uma tarefa (somente se estiver tratando a tarefa)
    if (!info.isRequestNew() && Array.isArray(data)) {
      var map = new Map();
      var i;
      for (i = 0; i < data.length; i++) {
        if (data[i].value == undefined) {
          map.set(data[i].key, '')
        } else {
          map.set(data[i].key, data[i].value);
        }
      }

      console.log("Carregando Dados", map);
      const nomDes = map.get("nomDes");
      const desMot = map.get("desMot");
      const estDes = map.get("estDes");
      const numCep = map.get("numCep");
      const rua = map.get("rua"); 
      const complemento = map.get("complemento");
      const bairro = map.get("bairro");
      const cidade = map.get("cidade");
      const estado = map.get("estado");
      const numero = map.get("numero");  
      const option1 = map.get("option1");
      const option2 = map.get("option2");
      const option3 = map.get("option3");
      const radio1 = map.get("radio1");
      const radio2 = map.get("radio2");
      const radio3 = map.get("radio3");
      const gridCheck = map.get("gridCheck");
      const formTextarea1 = map.get("formTextarea1");
      const range1 = map.get("range1");
      const table = map.get("table");

      document.getElementById("nomDes").setAttribute("value", nomDes);
      document.getElementById("desMot").setAttribute("value", desMot);
      document.getElementById("estDes").value = estDes;
      document.getElementById("numCep").setAttribute("value", numCep);
      document.getElementById("rua").setAttribute("value", rua);
      document.getElementById("complemento").setAttribute("value", complemento);
      document.getElementById("bairro").setAttribute("value", bairro);
      document.getElementById("cidade").setAttribute("value", cidade);
      document.getElementById("estado").setAttribute("value", estado);
      document.getElementById("numero").setAttribute("value", numero);
      option1 == 'true' ? $("#option1").prop("checked", true) : '';
      option2 == 'true' ? $("#option2").prop("checked", true) : '';
      option3 == 'true' ? $("#option3").prop("checked", true) : '';
      gridCheck == 'true' ? $("#gridCheck").prop("checked", true) : '';
      radio1 == 'true' ? $("#radio1").prop("checked", true) : '';
      radio2 == 'true' ? $("#radio2").prop("checked", true) : '';
      radio3 == 'true' ? $("#radio3").prop("checked", true) : '';
      document.getElementById("formTextarea1").value = formTextarea1;
      document.getElementById("range1").setAttribute("value", range1);
      document.getElementsByClassName("employees-table")[0].innerHTML = table;
  }});
}

// Essa função é chamada quando o usuário clicar no botão 'Enviar'
function _saveData(data, info) {
  if (!isFormValid()) {
    document.getElementById("gridCheck").setAttribute("class", "form-check-input is-invalid");
    throw new Error("Aceite os termos para prosseguir.");
  }
  let newData = {};
  let selectEstado = document.getElementById("estDes");

  newData.desMot = document.getElementById("desMot").value;
  newData.nomDes = document.getElementById("nomDes").value;
  newData.estDes = selectEstado.options[selectEstado.selectedIndex].value;
  newData.numCep = document.getElementById("numCep").value;
  newData.rua = document.getElementById("rua").value;
  newData.complemento = document.getElementById("complemento").value;
  newData.bairro = document.getElementById("bairro").value;
  newData.cidade = document.getElementById("cidade").value;
  newData.estado = document.getElementById("estado").value;
  newData.numero = document.getElementById("numero").value;
  newData.option1 = document.getElementById("option1").checked;
  newData.option2 = document.getElementById("option2").checked;
  newData.option3 = document.getElementById("option3").checked;
  newData.radio1 = document.getElementById("radio1").checked;
  newData.radio2 = document.getElementById("radio2").checked;
  newData.radio3 = document.getElementById("radio3").checked;
  newData.gridCheck = document.getElementById("gridCheck").checked;
  newData.formTextarea1 = document.getElementById("formTextarea1").value
  newData.range1 = document.getElementById("range1").value;
  newData.table = document.getElementsByClassName("employees-table")[0].innerHTML;

  console.log("newData: " + JSON.stringify(newData));
  return {
    formData: newData,
  };
}

function _rollback(data, info) {
  console.log("Error: " + JSON.stringify(data.error));
  if (info.isRequestNew()) {
    return removeData(data.processInstanceId);
  }
  return rollbackData(data.processInstanceId);
}

function isFormValid() {
  const isChecked = document.getElementById("gridCheck").checked;  
  return isChecked;
}

// Handler de eventos do checkbox
function onSelect() {
  const isChecked = document.getElementById("gridCheck").checked;  
  if (isChecked) {
    document.getElementById("gridCheck").setAttribute("class", "form-check-input is-valid");
  } else {
    document.getElementById("gridCheck").setAttribute("class", "form-check-input is-invalid");
  }
}

function getCep() {
  const cepInput = document.querySelector("input[name=cep]");
  
  cepInput.addEventListener('blur', e => {
  		const value = cepInput.value.replace(/[^0-9]+/, '');
      const url = `https://viacep.com.br/ws/${value}/json/`;
      
      return fetch(url)
      .then( response => response.json())
      .then( json => {
          if (json.logradouro) {
          	document.querySelector('input[name=rua]').value = json.logradouro;
            document.querySelector('input[name=complemento]').value = json.complemento;
            document.querySelector('input[name=bairro]').value = json.bairro;
            document.querySelector('input[name=cidade]').value = json.localidade;
            document.querySelector('input[name=estado]').value = json.uf;
          }
      })
  })
}

var selectedRow = null;

function onFormSubmit() {
  if (validate()) {
      var formData = readFormData();
      if (selectedRow == null) {
          insertNewRecord(formData);
      } else {
          updateRecord(formData);
      }
      resetForm();
  }
}

function readFormData() {
  var formData = {};
  formData["fullName"] = document.getElementById("fullName").value;
  formData["email"] = document.getElementById("email").value;
  formData["salary"] = document.getElementById("salary").value;
  formData["city"] = document.getElementById("city").value;
  return formData;
}

function insertNewRecord(data) {
  var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.fullName;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.email;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.salary;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.city;
  cell4 = newRow.insertCell(4);
  cell4.innerHTML = `<a onClick="onEdit(this)"><b>Editar</b></a>
                     <a onClick="onDelete(this)"><b>Deletar</b></a>`;
}

function resetForm() {
  document.getElementById("fullName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("salary").value = "";
  document.getElementById("city").value = "";
  selectedRow = null;
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
  document.getElementById("email").value = selectedRow.cells[1].innerHTML;
  document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
  document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.fullName;
  selectedRow.cells[1].innerHTML = formData.email;
  selectedRow.cells[2].innerHTML = formData.salary;
  selectedRow.cells[3].innerHTML = formData.city;
}

function onDelete(td) {
  if (confirm('Tem certeza que quer deletar esse registro?')) {
      row = td.parentElement.parentElement;
      document.getElementById("employeeList").deleteRow(row.rowIndex);
      resetForm();
  }
}

function validate() {
  isValid = true;
  if (document.getElementById("fullName").value == "") {
      isValid = false;
      document.getElementById("fullNameValidationError").classList.remove("hide");
  } else {
      isValid = true;
      if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
          document.getElementById("fullNameValidationError").classList.add("hide");
  }
  return isValid;
}
  
// Disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
});
