let input = document.querySelector('input');
let ul = document.querySelector('ul');

let url =
  'https://api.unsplash.com/photos/?client_id=SvC0GOeRgsLlzyqle__37j2EzczPvxqK7YM-_ez6AgU';

function createUI(data) {
  let li = document.createElement('li');
  data.forEach((element) => {
    let img = document.createElement('img');
    img.src = element.urls.small;
    img.classList.add('image');
    li.append(img);
  });
  ul.append(li);
}

let xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onload = function () {
  let data = JSON.parse(xhr.response);
  console.log(data);
  createUI(data);
};

xhr.onerror = function () {
  console.log('something went wrong');
};

xhr.send();

function imageSearch(event) {
  ul.innerHTML = '';
  if (event.keyCode === 13) {
    let xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      `https://api.unsplash.com/search/photos/?query=${input.value}&client_id=SvC0GOeRgsLlzyqle__37j2EzczPvxqK7YM-_ez6AgU`
    );
    xhr.onload = function () {
      let data = JSON.parse(xhr.response);
      console.log(data);
      createUI(data.results);
    };

    xhr.onerror = function () {
      console.log('something went wrong');
    };

    xhr.send();
    input.value = '';
  }
}

input.addEventListener('keyup', imageSearch);
