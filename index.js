let urlData = "http://127.0.0.1:5500/data/data.json"
let request = new XMLHttpRequest();
request.open("GET", urlData);
let petsData=null;
let buttonLeft = document.querySelector(".arrow-left");
let buttonRight = document.querySelector(".arrow-right");
function drawCards(listOfPets){
    const slider = document.querySelector(".slider-wrapper");
    slider.innerHTML="";
    listOfPets.forEach((cardData)=>{
        let card=`
    <div class="our-friends__card" data-pet-id="${cardData.id}">
        <img class="our-friends__img" src="${cardData.img}">
        <p class="paragraph">
        ${cardData.name}
        </p >
        <button class="button card-button">
        Learn more
        </button>
    </div>`;
    slider.innerHTML+=card;
    
    })
}

function scrollRight(){
    let container = document.querySelector(".slider-wrapper");
    let lastCardId =Number(container.children[container.children.length -1].dataset.petId);
    let firstCardId =Number(container.children[ 0 ].dataset.petId);
    let secondCardId =Number(container.children[ 1 ].dataset.petId);
    let listOfNextPets = [
        petsData[firstCardId],
        petsData[secondCardId],
        petsData[lastCardId],
        petsData[(lastCardId+1)%8 ],
        petsData[(lastCardId+2)%8] ,
        petsData[(lastCardId+3)%8]];
    console.log((lastCardId+1))
    drawCards(listOfNextPets);
    container.style.transition = 'transform 1s';
    container.style.transform='translate(-990px)'
    buttonLeft.removeEventListener('click', scrollLeft);
    buttonRight.removeEventListener('click', scrollRight);
    setTimeout(()=>{
        console.log(container.children);
        container.style.transition = '';
        container.style.transform='';
        container.children[0].remove();
        container.children[0].remove();
        container.children[0].remove();
        buttonLeft.addEventListener("click" , scrollLeft );
        buttonRight.addEventListener("click" , scrollRight );
    },1000)

}


function scrollLeft(){
    let container = document.querySelector(".slider-wrapper");
    let lastCardId =Number(container.children[container.children.length -1].dataset.petId);
    let firstCardId =Number(container.children[ 0 ].dataset.petId);
    let secondCardId =Number(container.children[ 1 ].dataset.petId);
    let listOfNextPets = [
        petsData[(firstCardId-3>=0? firstCardId-3 : 8+firstCardId-3) ],
    petsData[(firstCardId-2>=0? firstCardId-2 : 8+firstCardId-2)] ,
    petsData[(firstCardId-1>=0? firstCardId-1 : 8+firstCardId-1)],
    petsData[firstCardId],
    petsData[secondCardId],
    petsData[lastCardId]
];
    console.log((lastCardId+1))
    drawCards(listOfNextPets);
    container.style.transition = '';
    container.style.transform='translate(-990px)'
    buttonLeft.removeEventListener('click', scrollLeft);
    buttonRight.removeEventListener('click', scrollRight);

    setTimeout(()=>{
        container.style.transition = 'transform 1s';
         container.style.transform='translate(0)'
    },0)
    setTimeout(()=>{
        console.log(container.children);
       
        container.style.transition = '';
        container.children[5].remove();
        container.children[4].remove();
        container.children[3].remove();
        buttonLeft.addEventListener("click" , scrollLeft );
        buttonRight.addEventListener("click" , scrollRight );
    },1000)

}
  

buttonLeft.addEventListener("click" , scrollLeft )
buttonRight.addEventListener("click" , scrollRight )



request.responseType = 'json';
request.send();
request.onload = function() {
    petsData = request.response; 
    drawCards([petsData[0], petsData[1], petsData[2],]) 
}


// let container = document.querySelector(".slider-wrapper");
// let firstCardId =Number(container.children[ 0 ].dataset.petId);
// let listOfNextPets = [
//     petsData[(firstCardId-3>=0? firstCardId-3 : 8+firstCardId-3) ],
//     petsData[(firstCardId-2>=0? firstCardId-2 : 8+firstCardId-2)] ,
//     petsData[(firstCardId-1>=0? firstCardId-1 : 8+firstCardId-1)]
//     ];
                                
// drawCards(listOfNextPets);
