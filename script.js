getDataFromApi = async (cep) => {
  const api = 'https://api.postmon.com.br/v1/cep/';
  const data = await fetch(`${api}${cep}`).then((response) => response.json());
  return data;
};

transformUpperCaseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

createAndFillElement = (element, text, data) => {
  const object = document.createElement(element);
  object.innerHTML = `${transformUpperCaseFirstLetter(text)}: ${data[text]}`;
  return object;
};

document.getElementById('submit').addEventListener('click', async (e) => {
  e.preventDefault();
  const cep = document.getElementById('cep').value;
  const result = document.getElementById('result');
  const data = await getDataFromApi(cep);

  result.appendChild(createAndFillElement('p', 'logradouro', data));
  result.appendChild(createAndFillElement('p', 'bairro', data));
  result.appendChild(createAndFillElement('p', 'cidade', data));
  result.appendChild(createAndFillElement('p', 'estado', data));

  result.appendChild(document.createElement('hr'));
});
