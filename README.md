<p align="center">
  <a href="" rel="noopener">
 <img src="https://dev.senior.com.br/wp-content/uploads/2017/11/Logo-Senior-2017_BRANCO-PNG.png" alt="Project logo"></a>
</p>

---

<p align="center"> Formulário de exemplo para ser utilizado dentro do BPM da Senior Sistemas
    <br> 
</p>

## 📝 Indice

- [Sobre](#about)
- [Configurações no BPM](#bpm_configuration)
- [Iniciando o formulário localmente](#onpremise_form)
- [Usando o formulário no BPM](#usage)

## 🧐 Sobre <a name = "about"></a>

O cockpit do Workflow é capaz de apresentar dentro de um iframe formulários ECM e interfaces customizadas hospedadas em outros domínios. A comunicação entre as duas partes é realizada por Window.postMessage() e abstraída por este componente, que deve ser incluído na página e configurado pelo desenvolvedor.

Para o correto funcionamento da interface customizada dentro do cockpit, deve-se definir como a página salva os dados do processo e como reage a erros ocorridos na criação do processo e tratamento da pendência.

Esse projeto de exemplo, mostra de forma simples como uma página WEB externa poderá ser incorporada dentro do BPM, implementando os métodos necessários para o correto funcionamento.

## 🏁 Configurações no BPM <a name = "bpm_configuration"></a>

Primeiro de tudo, precisamos criar um fluxo no BPM que suporte formulários externos.

Acesse `Senior X Platform` > `BPM` > `Processos`

Clique em `Novo Processo` e selecione o tipo de execução sendo `Interface Web`.

![image](https://user-images.githubusercontent.com/28518259/136276775-e3faec61-f51c-404f-86df-9622a05685de.png)

Quando selecionado este tipo, será necessário inserir a URL de onde seu formulário estará hospedado.

> Dica: Existem diversos serviços online que são gratuitos para hospedagem, como por exemplo  [Heroku](https://www.heroku.com/), [Vercel](https://vercel.com/), [Azure](https://azure.microsoft.com/pt-br/services/devops/), [AWS S3](https://aws.amazon.com/pt/s3/), [GitHub](https://pages.github.com/).

Para este exemplo, utilizaremos o formulário localmente:

![image](https://user-images.githubusercontent.com/28518259/136278388-ece55f9c-2cb4-4f8d-8979-674ef4e75bc3.png)

Defina um fluxo para o processo, exemplo:

![image](https://user-images.githubusercontent.com/28518259/136278622-db665ef3-8f65-4711-b21e-71b584974a57.png)

Para ambas as tarefas, configure a URL do formulário e o modo de abertura sendo:

![image](https://user-images.githubusercontent.com/28518259/136278807-c9d2658a-2c02-480f-bebe-2cb890f8db38.png)

Defina também o papel responsável pelo processo de `Aprovação`:

![image](https://user-images.githubusercontent.com/28518259/136284045-593e624e-42d9-4d24-8841-1d44066918bb.png)

Selecione a opção Salvar. Logo em seguida no Fluxo, selecione a opção Salvar e depois a opção Publicar.

No menu `Variáveis do processo`, inclua as variáveis com as seguintes configurações:

![image](https://user-images.githubusercontent.com/28518259/136278955-6c2f145f-5f5c-454a-99b7-d97c8e8ef05a.png)

Você pode fazer o download do processo [aqui](https://github.com/SeniorSA/bpm-example-form-web/files/7297043/Solicitacoes.de.Veiculos.zip).

## 🎈 Iniciando o formulário localmente <a name="onpremise_form"></a>

Faça o clone do repositório ou simplesmente crie os dois arquivos ([bpm.js](https://github.com/SeniorSA/bpm-example-form-web/blob/master/bpm.js) e [index.html](https://github.com/SeniorSA/bpm-example-form-web/blob/master/index.html)) em uma pasta (ex: formulario-web) e copie/cole o conteúdo.

> Dica: Utilize o [VSCode](https://code.visualstudio.com/) e instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), desta forma, você não precisará instalar e configurar um servidor Web como NodeJS ou Apache.

No VSCode, inicie o server:
![image](https://user-images.githubusercontent.com/28518259/136282499-dea88408-126a-46d4-a4fa-44ec5f8df4f2.png)

Sua página deverá estar acessível pelo endereço http://127.0.0.1:5500/

![image](https://user-images.githubusercontent.com/28518259/136282836-48b447f1-3640-4493-a1f4-71b4320daa88.png)

## 🚀 Usando o formulário no BPM <a name = "usage"></a>

Para testar se tudo que fizemos está funcionando, vamos criar uma nova tarefa no BPM utilizando nosso processo.

Acesse `Senior X Platform` > `BPM` > `Central de Tarefas` e selecione `Nova Solicitação`, na lista de processos, escolha o processo criado anteriormente. Deverá então ser carregado o formulário já com os dados do usuário logado.

![image](https://user-images.githubusercontent.com/28518259/136284495-c1874784-0747-40cf-a61a-367711ea364e.png)