const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const buildApiUrl = (base, param) => `${base}${param}`;

const transformUpperCaseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const createAndFillElement = (element, text, data) => {
  const object = document.createElement(element);
  object.innerHTML = `${transformUpperCaseFirstLetter(text)}: ${data[text]}`;
  return object;
};

document.getElementById("submit").addEventListener("click", async (e) => {
  e.preventDefault();
  const cep = document.getElementById("cep").value;
  const result = document.getElementById("result");
  const data = await getDataFromApi(cep);

  ["logradouro", "bairro", "cidade", "estado"].forEach((text) =>
    result.appendChild(createAndFillElement("p", text, data))
  );

  result.appendChild(document.createElement("hr"));
});
