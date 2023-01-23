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
  const { initialVariables } = data.loadContext;
  console.log(initialVariables);
  
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
        console.log(platformData);
      });
    });

  // Retorna os dados que já foram previamente preenchidos no formulário
  info.getInfoFromProcessVariables().then(function (data) {
    // Somente recupera os dados caso não seja a criação de uma tarefa (somente se estiver tratando a tarefa)
    if (!info.isRequestNew() && Array.isArray(data)) {
      var map = new Map();
      var i;
      for (i = 0; i < data.length; i++) {
        map.set(data[i].key, data[i].value);
      }

      console.log("Carregando Dados", map);
      const nomDes = map.get("nomDes");
      const desMot = map.get("desMot");
      const estDes = map.get("estDes");
      const numCep = map.get("numCep");

      document.getElementById("nomDes").setAttribute("value", nomDes);
      document.getElementById("desMot").setAttribute("value", desMot);
      document.getElementById("estDes").value = estDes;
      document.getElementById("numCep").setAttribute("value", numCep);
    }
  });
}

// Essa função é chamada quando o usuário clicar no botão 'Enviar'
function _saveData(data, info) {
  if (!isFormValid()) {
    document.getElementById("gridCheck").setAttribute("class", "form-check-input is-invalid");
    throw new Error("Os dados informados não são válidos.");
  }
  let newData = {};
  let selectEstado = document.getElementById("estDes");

  newData.desMot = document.getElementById("desMot").value;
  newData.nomDes = document.getElementById("nomDes").value;
  newData.estDes = selectEstado.options[selectEstado.selectedIndex].value;
  newData.numCep = document.getElementById("numCep").value;
  newData.check = document.getElementById("gridCheck").value;
  console.log(newData);
  return {
    formData: newData,
  };
}

function _rollback(data, info) {
  /*data: ({
       error: obj
       processInstanceId: int
    })*/
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
})();
