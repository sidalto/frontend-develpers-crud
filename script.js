const createLi = (developer) => {
  const li = document.createElement('li');
  // add developer details to `li`
  li.textContent = `${developer.id}: ${developer.nome} ${developer.sexo} ${developer.idade} ${developer.hobby} ${developer.datanascimento}`;

  // attach onclick event
  li.onclick = (e) => deleteDeveloper(li, developer.id);

  return li;
};

const appendToDOM = (developers) => {
  const ul = document.querySelector('ul');
  //iterate over all developers
  developers.map((developer) => {
    ul.appendChild(createLi(developer));
  });
};

const fetchDevelopers = () => {
  axios
    .get('http://localhost:8000/api/developers')
    .then((response) => {
      const developers = response.data.data;
      console.log(`GET list developers`, developers);
      // append to DOM
      appendToDOM(developers);
    })
    .catch((error) => console.error(error));
};

fetchDevelopers();

// create a new developer
const createDeveloper = (developer) => {
  axios
    .post('http://localhost:8000/api/developers', developer)
    .then((response) => {
      const developer = response.data;
      console.log(`POST: developer is added`, developer);
      // append to DOM
      appendToDOM(developer);
    })
    .catch((error) => console.error(error));
};

// event listener for form submission
const form = document.querySelector('form');

const formEvent = form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.querySelector('#nome').value;
  const sexo = document.querySelector('#sexo').value;
  const idade = document.querySelector('#idade').value;
  const hobby = document.querySelector('#hobby').value;
  const datanascimento = document.querySelector('#datanascimento').value;

  const developer = { nome, sexo, idade, hobby, datanascimento };
  createDeveloper(developer);
});

// delete a developer
const deleteDeveloper = (elem, id) => {
  axios
    .delete(`http://localhost:8000/api/developers/${id}`)
    .then((response) => {
      console.log(`DELETE: developer is removed`, id);
      // remove elem from DOM
      elem.remove();
    })
    .catch((error) => console.error(error));
};
