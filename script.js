const config = {
  cep: { key: "cep", label: "CEP" },
  logradouro: { key: "logradouro", label: "Logradouro" },
  bairro: { key: "bairro", label: "Bairro" },
  cidade: { key: "cidade", label: "Cidade" },
  estado: { key: "estado", label: "UF" },
  estado_info: { key: "nome", label: "Estado", dataKey: "estado_info" },
  cidade_info: {
    key: "area_km2",
    label: "Área",
    dataKey: "cidade_info",
  },
};

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const buildApiUrl = (base, param) => `${base}${param}`;

const createAndFillElement = (elementType, contentKey, contentData) => {
  const element = document.createElement(elementType);
  element.innerHTML = `${contentKey}: ${contentData[contentKey]}`;
  return element;
};

const appendChildToElement = (parent, child) => parent.appendChild(child);

const changeElementText = (element, newName) => {
  const originalText = element.innerText;
  let [name, valor] = originalText.split(":");
  if (name === "area_km2") {
    valor = `${valor} km²`;
  }
  const modifiedText = `${newName}: ${valor}`;
  element.innerText = modifiedText;
};

document.getElementById("submit").addEventListener("click", async (e) => {
  e.preventDefault();
  const cep = document.getElementById("cep").value;
  const apiUrl = buildApiUrl("https://api.postmon.com.br/v1/cep/", cep);
  const data = await fetchData(apiUrl);
  const result = document.getElementById("result");

  Object.keys(config).forEach((text) => {
    const { key, label, dataKey } = config[text];
    const element = createAndFillElement(
      "p",
      key,
      dataKey ? data[dataKey] : data
    );
    changeElementText(element, label);
    appendChildToElement(result, element);
  });

  appendChildToElement(result, document.createElement("hr"));
});
