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
        // Se algum valor vier indefinido, substitui por texto vazio
        if (data[i].value == undefined) {
          map.set(data[i].key, '')
        } else {
          map.set(data[i].key, data[i].value);
        }
      }

      // Carrega os dados do formData/newData do _saveData
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
      const crudTable = map.get("crudTable");

      // Atribui os valores gravados na etapa anterior aos campos atuais
      document.getElementById("nomDes").value = nomDes;
      document.getElementById("desMot").value = desMot;
      document.getElementById("estDes").value = estDes;
      document.getElementById("numCep").value = numCep;
      document.getElementById("rua").value = rua;
      document.getElementById("complemento").value = complemento;
      document.getElementById("bairro").value = bairro;
      document.getElementById("cidade").value = cidade;
      document.getElementById("estado").value = estado;
      document.getElementById("numero").value = numero;
      option1 == 'true' ? document.getElementById("option1").checked = true : '';
      option2 == 'true' ? document.getElementById("option2").checked = true : '';
      option3 == 'true' ? document.getElementById("option3").checked = true : '';
      radio1 == 'true' ? document.getElementById("radio1").checked = true : '';
      radio2 == 'true' ? document.getElementById("radio2").checked = true : '';
      radio3 == 'true' ? document.getElementById("radio3").checked = true : '';
      document.getElementById("crudTable").innerHTML = crudTable;
  }});
}

// Essa função é chamada quando o usuário clicar no botão 'Enviar'
function _saveData(data, info) {
  // Salva as informações de todos campos do formulário
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
  newData.crudTable = document.getElementById("crudTable").innerHTML;
  // console.log("newData: " + JSON.stringify(newData));
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
