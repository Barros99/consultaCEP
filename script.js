const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const buildApiUrl = (base, param) => `${base}${param}`;

const createAndFillElement = (elementType, contentKey, contentData) => {
  const element = document.createElement(elementType);
  element.innerHTML =
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
  const result = document.getElementById("result");
  const data = await getDataFromApi(cep);

  ["logradouro", "bairro", "cidade", "estado"].forEach((text) =>
    result.appendChild(createAndFillElement("p", text, data))
  );

  result.appendChild(document.createElement("hr"));
});
