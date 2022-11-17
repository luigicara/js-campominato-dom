const container = document.querySelector(".container");

const resoconto = document.querySelector(".resoconto");

const btnPlay = document.getElementById("play");

const difficulty = document.getElementById("select");

btnPlay.addEventListener('click',

    function() {
        container.innerHTML = "";

        resoconto.innerHTML = "";

        let divsCollection = [];

        let pointsArr = [];

        let maxBox = checkDifficulty();

        let arrBomb = genRandomNumbers(16, 1, maxBox);

        console.log(arrBomb);
        
        for (let i = 0; i < maxBox; i++) {
            let newBox = createBox(difficulty.value, i + 1, divsCollection);

            newBox.innerHTML = i + 1;
            
            let div = divsCollection[i];

            div.addEventListener('click',
                function () {
                
                    if (!arrBomb.includes(parseInt(div.innerHTML))) {

                        div.classList.add("clicked");

                        pointsArr.push(div);
                    } else {

                        for (let n = 0; n < 16; n++) {
                            let allRed = arrBomb[n];
                            divsCollection[allRed - 1].classList.add("boom");
                        }

                        alert("Hai Perso, ritenta!");

                        resoconto.innerHTML = `Hai totalizzato: ${pointsArr.length} punti!`;

                        divsCollection = [];

                    }
                    

                }, {once: true}
            )
        }

        btnPlay.innerHTML = "Rigioca";
    }

)


function checkDifficulty() {
    let selection = difficulty.value;

    let boxNumber;

    if (selection === "easy") {
        boxNumber = 100;
    } else if (selection === "medium") {
        boxNumber = 81;
    } else {
        boxNumber = 49;
    }

    return boxNumber

}

function createBox (classDifficult, i, array) {
    let div = document.createElement("div");

    div.classList.add("box", `box--${i}`, classDifficult);

    container.appendChild(div);

    array.push(div);

    return div
}

function randomInteger(min, max) {
    return ( Math.floor(Math.random() * ((max + 1) - min) + min));
}

function genRandomNumbers(quantity, minNum, maxNum) {

    const newArr = [];

    while (newArr.length < quantity) {
        let newNumber = randomInteger(minNum, maxNum);

        if(!newArr.includes(newNumber)) {
            newArr.push(newNumber);
        }
    }

    return newArr
}

