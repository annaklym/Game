'use strict';
var interval;
var gamescore = 0;
var area = document.getElementById("area");
var score = document.getElementById('score');
var start = document.getElementById('start');
var stop = document.getElementById('stop');

function getSpeed() {
  return (Math.random() * 8 + 2) + 's';
}

function getInterval() {
  return Math.random() * 2500 + 500;
}

function getColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  if (r > 200 && g > 200) {
    b = 255;
  }
  return "rgb(" + r + "," + g + "," + b + ")";
}

function Item() {
  var pointX = Math.abs(Math.floor(Math.random() * 600));
  var item = document.createElement('span');
  item.className = 'item';
  item.style.left = pointX + 'px';
  return item;
}

function handleClick(event) {
  gamescore += 1;
  score.firstChild.nodeValue = gamescore;
  event.currentTarget.parentNode.removeChild(event.currentTarget);
}

function play() {
  interval = setInterval(function () {
    var item = area.appendChild(new Item());
    item.style.backgroundColor = getColor();
    item.style.animationDuration = getSpeed();
    item.addEventListener('click', handleClick);
    item.addEventListener('animationend', gameOver);
  }, getInterval());
}

function gameOver() {
  stopGame();
  alert("Game Over! Your score: " + gamescore);
}

function stopGame() {
  clearInterval(interval);
  var deleteItems = document.getElementsByClassName('item');
  var arr = Array.prototype.slice.call(deleteItems);
  for (var i = 0; i < arr.length; i++) {
    arr[i].parentNode.removeChild(arr[i]);
  }
}

function startGame() {
  stopGame();
  gamescore = 0;
  score.firstChild.nodeValue = gamescore;
  play();
}
start.addEventListener('click', startGame);
stop.addEventListener('click', stopGame);