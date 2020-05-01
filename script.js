// javascript for background
function manyStars() {
    var universe = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    for (let i = 0; i < universe.length; i++) {
        var star = document.getElementById('star');
        var newElement = document.createElement('div');
        newElement.setAttribute('class', `dynamic`);
        star.appendChild(newElement);
    }

    for (let i = 0; i < universe.length; i++) {
        var star = document.getElementById('star2');
        var newElement = document.createElement('div');
        newElement.setAttribute('class', 'dynamic2');
        star.appendChild(newElement);
    }


    for (let i = 0; i < universe.length; i++) {
        var star = document.getElementById('star3');
        var newElement = document.createElement('div');
        newElement.setAttribute('class', 'dynamic3');
        star.appendChild(newElement);
    }
}

manyStars();

function manyStars2() {
    var universe = [1];

    // these divs are all on the highest level
    for (let i = 0; i < universe.length; i++) {
        var newElement = document.createElement('div');
        newElement.setAttribute('class', 'parentstars');
        document.getElementsByTagName('body')[0].prepend(newElement)
    }
}

manyStars2();

function manyStars3() {
    var universe = [1, 2, 3, 4, 5]

    for (let i = 0; i < universe.length; i++) {
        var star = document.getElementById('star4');
        var newElement = document.createElement('div');
        newElement.setAttribute('class', 'dynamic4');
        star.appendChild(newElement);
    }

    for (let i = 0; i < universe.length; i++) {
        var star = document.getElementById('star5');
        var newElement = document.createElement('div');
        newElement.setAttribute('class', 'dynamic5');
        star.appendChild(newElement);
    }

    // these divs are all on the highest level
    for (let i = 0; i < universe.length; i++) {
        var newElement = document.createElement('div');
        newElement.setAttribute('class', 'parentstars2');
        document.getElementsByTagName('body')[0].prepend(newElement)
    }
}

manyStars3();


// javascript for navbar
function scrollCheck(){
    window.onscroll = function(){
        var nav = document.getElementById('navbar')
        nav.setAttribute('class', 'navbar fixed-top navbar-expand-lg navbar-light bg-light')
    }
}


scrollCheck();