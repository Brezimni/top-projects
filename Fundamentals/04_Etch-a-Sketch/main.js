const mainContainer = document.querySelector('.container');

function randomizeColor(targetTile) {
    let backgroundColor = getComputedStyle(targetTile).getPropertyValue('background-color');
    let colorOpacity = getComputedStyle(targetTile).getPropertyValue('opacity');
    if(backgroundColor === 'rgb(255, 255, 255)') {
        let randomColor = `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
        targetTile.style.backgroundColor = randomColor;
        targetTile.style.opacity = 0.1;
    } else if(colorOpacity < 1) {
        targetTile.style.opacity = parseFloat(colorOpacity) + 0.1;
    } else return null;

}

function drawTiles(tileRow) {
    mainContainer.innerHTML = '';
    for(i = 0; i < tileRow*tileRow; i++) {
        let newChild = document.createElement('div');
        newChild.classList.add('tile');
        newChild.style.width = `${920/tileRow}px`;
        newChild.style.height = `${920/tileRow}px`;
        newChild.addEventListener('mouseover', (e) => {randomizeColor(e.target)});
        mainContainer.appendChild(newChild);
    }
};
drawTiles(16);
function askUser() {
    let rowNumber = prompt('How wide should your grid be?');
    if(isNaN(parseInt(rowNumber)) || parseInt(rowNumber) > 100) {return alert('Please enter a number that is not bigger than 100.')
    } else { return drawTiles(parseInt(rowNumber)) }
}