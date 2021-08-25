let ul = document.getElementById('main');
let modal = document.getElementById('modal');
let container = document.querySelector('.container');

let url = 'https://www.anapioficeandfire.com/api/books';

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    createUi(data);
    console.log(data);
  })
  .catch(error => console.log(error));

function createUi(data) {
  data.forEach((data) => {
    let li = document.createElement('li');
    let name = document.createElement('h2');
    name.innerText = data.name;
    let author = document.createElement('h3');
    author.innerText = data.authors[0];
    let noOfpages = document.createElement('span');
    noOfpages.innerText = data.numberOfPages;
    let publisher = document.createElement('h4');
    publisher.innerText = data.publisher;
    let released = document.createElement('span');
    released.innerText = data.released;
    let country = document.createElement('h4');
    country.innerText = data.country;
    let button = document.createElement('button');
    button.innerText = `show charcter ${data.characters.length}`;
    button.addEventListener('click', (e) => {
      container.innerHTML = '';
      createModal(data.characters);
      container.style.display = 'block';
    });
    li.append(name, author, noOfpages, publisher, released, country, button);
    main.append(li);
  });
}

function createModal(data) {
  Promise.all(data.map((char) => fetch(char).then((res) => res.json()))).then(
    (data) => {
      data.forEach((elem) => {
        let li = document.createElement('li');
        let h3 = document.createElement('h3');
        h3.innerText = elem.name;
        li.append(h3);
        modal.append(li);
      });
    }
  );
  container.append(modal);
}
