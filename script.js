const container = document.querySelector(".container");

const resoconto = document.querySelector(".resoconto");

const btnPlay = document.getElementById("play");

const difficulty = document.getElementById("select");

btnPlay.addEventListener('click',

    function() {
        container.innerHTML = "";

        resoconto.innerHTML = "";

        let pointsArr = [];

        let divsCollection;

        let maxBox = checkDifficulty();

        let arrBomb = genRandomNumbers(16, 1, maxBox);

        console.log(arrBomb);

        let result;
        
        for (let i = 0; i < maxBox; i++) {
            let newBox = createBox(difficulty.value, i + 1);

            newBox.innerHTML = i + 1;

            divsCollection = document.getElementsByClassName("box");
            
            let div = divsCollection[i];

            
            div.addEventListener('click', 
            
                function() {

                    if (result === "true") {

                    } else {
                        if (!arrBomb.includes(parseInt(div.innerHTML))) {

                            div.classList.add("clicked");
    
                            pointsArr.push(div);

                            if (pointsArr.length === maxBox - 16) {
                                alert("Complimenti, hai vinto!");

                                showBombs(arrBomb, divsCollection);

                                result = "true";

                            }
                        } else {
    
                            showBombs(arrBomb, divsCollection);
    
                            alert("Hai Perso, ritenta!");
                            let point = "punti";

                            if (pointsArr.length === 1) {
                                point = "punto";
                            }
                            resoconto.innerHTML = `Hai totalizzato: ${pointsArr.length} ${point}!`;
    
                            result = "true";
                            
                        }

                    }

                    
                },{once: true}
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

function createBox (classDifficult, i) {
    let div = document.createElement("div");

    div.classList.add("box", `box--${i}`, classDifficult);

    container.appendChild(div);

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

function showBombs(bombArray, divsArray) {
    for (let n = 0; n < 16; n++) {
        let allRed = bombArray[n];
        divsArray[allRed - 1].classList.add("boom");
    }
}