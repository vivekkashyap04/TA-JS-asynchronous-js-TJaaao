let xhr = new XMLHttpRequest();

//Github User
let input = document.querySelector('input');
let userImage = document.querySelector('.userImage');
let userName = document.querySelector('.userName');
let followers = document.querySelector('.followers');
let following1 = document.querySelector('.following');

function userHandler(event) {
  if (event.keyCode === 13) {
    xhr.open('GET', `https://api.github.com/users/${event.target.value}`);
    xhr.onload = function () {
      let data = JSON.parse(xhr.response);
      console.log(data);
      userName.innerText = data.name;
      userImage.src = data.avatar_url;
      following(data.login);
      follower(data.login);
    };

    xhr.send();
    event.target.value = '';
  }
}

function follower(user) {
  followers.innerHTML = '';
  xhr.open('GET', `https://api.github.com/users/${user}/followers`);
  xhr.onload = function () {
    let followerData = JSON.parse(xhr.response);
    console.log(followerData);
    createUi(followerData, followers);
  };
  xhr.send();
}

function following(user) {
  following.innerHTML = '';
  xhr.open('GET', `https://api.github.com/users/${user}/following`);
  xhr.onload = function () {
    let followingData = JSON.parse(xhr.response);
    console.log(followingData);
    createUi(followingData, following1);
  };
  xhr.send();
}

function createUi(data, root) {
  let li = document.createElement('li');
  data.forEach((element, index) => {
    if (index < 5) {
      let img = document.createElement('img');
      img.src = element.avatar_url;
      img.classList.add('image');
      li.append(img);
    }
  });
  root.append(li);
}

input.addEventListener('keyup', userHandler);

//Cat

let btn = document.querySelector('.btn');
let cat = document.querySelector('.cat');

function changeImage() {
  xhr.open(
    'GET',
    'https://api.thecatapi.com/v1/images/search?limit=1&size=full'
  );

  xhr.onload = function () {
    let img = JSON.parse(xhr.response);
    console.log(img[0].url);
    cat.src = img[0].url;
  };
  xhr.send();
}

btn.addEventListener('click', changeImage);
