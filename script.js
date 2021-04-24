const clickedColour = document.querySelector('.clicked-colour')
const hexValue = document.querySelector('.hex-colour')
const colourValue = document.querySelectorAll('.colour-value')
const colourValueCopy = document.querySelectorAll('.colour-value')
const colourValueText = document.querySelectorAll('.colour-value-text')
const generateBtn = document.querySelector('.btn')



// Random pastel Colour Value Generator
function getRandomColor() {
    var r = (Math.round(Math.random()* 127) + 127).toString(16);
    var g = (Math.round(Math.random()* 127) + 127).toString(16);
    var b = (Math.round(Math.random()* 127) + 127).toString(16);
    color= '#' + r + g + b;
    return color;
}

// FUNC - Generates random colour in DOM
function generateRandomColour() {
    colourValueText.forEach((text) => {
        text.innerText = getRandomColor()
        text.previousElementSibling.style.backgroundColor = `${text.innerText}`

    })
}

generateRandomColour()

// FUNC - Add copied popup on screen and pop up colour card
function clickedColorPalette() {
    colourValue.forEach((colour) => {
        colour.addEventListener('click', () => {
            // Clicked colour palatte card effect
            colour.classList.add('success');
            // Clicked colour card pop up
            clickedColour.classList.add('active')
            // Add HEX value to pop up
            hexValue.innerText = `${colour.lastElementChild.innerText}`


            const selection = window.getSelection()
            const range = document.createRange()
            range.selectNodeContents(colour);
            selection.removeAllRanges()
            selection.addRange(range)
            
            try {
                document.execCommand('copy')
                selection.removeAllRanges()
                
                setTimeout(() => {
                    // Removes classes
                    colour.classList.remove('clicked')
                    colour.classList.remove('success');
                    
                }, 1000)
            } catch(e) {

            }
            setTimeout(() => {
                // Longer timeout for pop up class removal
                clickedColour.classList.remove('active')
            }, 1500)
        })
    })
}

clickedColorPalette()


function copyAllHexValues() {
    let values = [];
    document.querySelectorAll('.colour-value-text').forEach( (p) => values.push( p.innerHTML ) );
    let text = document.createElement('textarea');
    document.body.appendChild(text);
    text.value = values.join(', ');
    text.select();
    document.execCommand('copy');
    text.parentNode.removeChild(text);
       
}

// document.execCommand('copy')
document.addEventListener('keydown', (e) => {
    const c_keyDown = e.key

    if(c_keyDown == 'c') {
        copyAllHexValues()
        }
    })


// Generate Random Palette - Btn
generateBtn.addEventListener('click', () => {
    generateRandomColour()
})







