const heading = document.querySelector("h1")
const generateButton = document.querySelector(".generate")
const colorValue = document.querySelector(".copy")

const hexaColorGenerator = () => {
    let str = '0123456789abcdef'
    let color = ''
    for (let i = 0; i < 6; i++) {
        let index = Math.floor(Math.random() * str.length)
        color += str[index]
    }
    color = color.toUpperCase()
    return `#${color}`
}

const setHeadingColor = (s) => {
    var {red, blue, green} = hexToRGB(s)
    var distance = Math.sqrt(Math.pow(255 - red, 2) + Math.pow(255 - blue, 2) + Math.pow(255 - green, 2))
    const threshold = Math.sqrt(Math.pow(255, 2) + Math.pow(255, 2) + Math.pow(255, 2))
    const thresholdMax = 75 / 100 * threshold
    const thresholdMin = 25 /100 * threshold
    
    if(distance > thresholdMax){
        heading.style.color = `rgb(${255-red}, ${255-blue}, ${255-green})`
    }else if(distance<thresholdMin){
        heading.style.color = "rgb(127, 127, 127)"
    } else{
        heading.style.color = "#fff"
    }
}

function hexToRGB(s) {
    if (s.at(0) === "#")
        return hexToRGB(s.slice(1))

    var colors = s.split("")

    let red = colors.slice(0, 2).join("")
    let blue = colors.slice(2, 4).join("")
    let green = colors.slice(4, 6).join("")
    // console.log(red, blue, green)

    const redValue = parseInt(red, 16)
    const blueValue = parseInt(blue, 16)
    const greenValue = parseInt(green, 16)
    return {rgb: `rgb(${redValue}, ${blueValue}, ${greenValue})`, red:redValue, blue:blueValue, green: greenValue}
}

generateButton.onclick = function () {
    let newColor = hexaColorGenerator()
    document.body.style.backgroundColor = newColor
    colorValue.textContent = newColor
    setHeadingColor(colorValue.textContent.slice(1))
}

colorValue.onclick = function () {
    let valueToCopy = colorValue.textContent
    navigator.clipboard.writeText(valueToCopy)
}