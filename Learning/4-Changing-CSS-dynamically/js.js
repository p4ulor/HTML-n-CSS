// Inspired by https://alvarotrigo.com/blog/change-css-javascript/

const section = _5 // section to run
const helloDiv = document.querySelector('.hello')
helloDiv.textContent = helloDiv.textContent + " " + section.name
section()

//1 - Change CSS inline properties with JavaScript
function _1(){
    const firstButton = document.querySelector('button')

    firstButton.addEventListener('click', () => {
        const helloDiv = document.querySelector('.hello')
        helloDiv.style.backgroundColor = 'green' //setting a inner style, overwrides the css in the head
    });

    // Extra: add another button, create style element and add it to the head of the HTML, and allow toggling between the styles
    const newButton = document.createElement('button')
    newButton.textContent = 'Change CSS style 2'
    newButton.style.marginLeft = '10px'
    firstButton.insertAdjacentElement('afterend', newButton)

    const secondButton = document.querySelectorAll('button')[1]
    secondButton.addEventListener('click', () => {
        const headElements = document.head.children
        let wasStylesAddedInHead = false
        for(let i = 0; i < headElements.length; i++){
            const currElement = headElements.item(i)
            if(currElement.tagName=="STYLE"){
                wasStylesAddedInHead = true
            }
        }

        Array.from(document.body.children).forEach(element => {
            element.removeAttribute("style") //remove all elements with attribute style, since it has presedence over the styles in head
        })
        
        if(!wasStylesAddedInHead){ //to avoid running this again on clicking the button more than 1 time
            const sheet = document.createElement('style')
            sheet.innerHTML = "div {border: 2px solid black; background-color:red;}"
            document.head.appendChild(sheet) //adds styles element to the head
        }
    })
}

//2 - Set Multiple CSS Styles At The Same Time
function _2(){
    document.head.insertAdjacentHTML("afterbegin", `<style>body{background-color:#0194}</style>`)

    const myStyles = `
    display: block;
    width: 80%;
    background-color: red;
    border: 2px;
    font-size: 5em;
    color: white;
    margin: 20px;
    padding-left: 10px;
    padding-bottom: 10px;
    border: 2px solid black;
    `;

    const element = document.querySelector('.hello');
    element.style.cssText = myStyles;
}

//3 - Change CSS class in JavaScript
function _3(){
    const element = document.querySelector('.hello');
    element.classList.add('new-class');
    
    document.querySelector('button').addEventListener("click", () => {
        element.classList.toggle('new-class');
    })
}

// 4 - Change CSS stylesheets dynamically
function _4(){
    const stylesheet = document.styleSheets[0];
    // not really possible to acess stylesheet.cssRules, since it throws exception https://stackoverflow.com/questions/48753691/cannot-access-cssrules-from-local-css-file-in-chrome-64 https://stackoverflow.com/questions/49993633/uncaught-domexception-failed-to-read-the-cssrules-property https://stackoverflow.com/questions/46356349/document-stylesheetsx-cssrules-are-null
    // except if we set up our own server and setup a cors policy that allows this
    Array.from(document.body.children).forEach(element => {
        const style = getComputedStyle(element)
        style.background = "blue"
    })
}

//5 - Append And Remove CSS stylesheets dynamically
function _5(){
    const style = document.createElement("style")
    style.type = "text/css"
    style.id = "new"
    
    if(false){
        //method 1
        style.appendChild(document.createTextNode("body { background-color: orange;}"))
        document.head.appendChild(style)
    } else {
        //method 2
        style.innerText = "body { background-color: rgb(109, 177, 255);}";
        document.head.appendChild(style)
    }

}

// 6 - Overwrite CSS !important style with JavaScript
function _6(){
    const hello = document.querySelector('.hello');
    hello.style.setProperty('background-color', 'purple', 'important');
}