let randomNumber = function () {
  return Math.floor(Math.random() * 100);
};
randomNumber();

let times = [1, 2, 3, 4];

let timesPromise = times.map((seconds) => {
  return new Promise((res) => {
    setTimeout(() => res(randomNumber()), seconds * 1000);
  });
});

Promise.all(timesPromise).then(console.log);

const userNames = ['kumarvivek313', 'prank7', 'nnnkit', 'suraj122', 'sunny'];

const userData = Promise.all(
  userNames.map((user) => {
    fetch(`https://api.github.com/users/${user}`)
      .then((res) => res.json())
      .then((user) =>
        console.log(`Name: ${user.name}, Followers: ${user.followers}`)
      );
  })
);

let url = ['https://random.dog/woof.json', 'https://aws.random.cat/meow'];
Promise.race(url.map((url) => fetch(url)))
  .then((res) => res.json())
  .then((value) => console.log(value));

Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log);

//output  ["Arya", "Sam", {…}]
