
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 10,
    "mouthColor" : 13,
    "eyesColor" : 96,
    "earsColor" : 10,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 13,
    "decorationSidescolor" : 13,
    "animation" :  1,
    "lastNum" :  1
    }

    function randomCat(){
      var randomDNA = {
        "headcolor" : Math.floor(Math.random() * 88) + 10,
        "mouthColor" : Math.floor(Math.random() * 100),
        "eyesColor" : Math.floor(Math.random() * 100),
       "earsColor" : Math.floor(Math.random() * 100),
      
        "eyesShape" : Math.floor(Math.random() * 8),
        "decorationPattern" : Math.floor(Math.random() * 8),
        "decorationMidcolor" : Math.floor(Math.random() * 100),
        "decorationSidescolor" : Math.floor(Math.random() * 100),
        "animation" :  Math.floor(Math.random() * 7),
        "lastNum" :  1
      }
      renderCat(randomDNA)
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function defaultCat(){
  renderCat(defaultDNA);
}


function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headcolor],dna.headcolor)
    $('#bodycolor').val(dna.headcolor)
    mouthColor(colors[dna.mouthColor],dna.mouthColor)
    $('#mouthcolor').val(dna.mouthColor)
    eyeColor(colors[dna.eyesColor],dna.eyesColor)
    $('#eyecolor').val(dna.eyesColor)
    earColor(colors[dna.earsColor],dna.earsColor)
    $('#earcolor').val(dna.earsColor)
   
    eyeVariation(dna.eyesShape)
    $('#eyeshape').val(dna.eyesShape)
    decorationVariation(dna.decorationPattern)
    $('#decorativepattern').val(dna.decorationPattern)
    patternColor1(colors[dna.decorationMidcolor], dna.decorationMidcolor)
    $('#patterncolor1').val(dna.decorationMidcolor)
    patternColor2(colors[dna.decorationSidescolor], dna.decorationSidescolor)
    $('#patterncolor2').val(dna.decorationSidescolor)
    animationVariation(dna.animation)
    $('#animation').val(dna.animation)
}

// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})

//changing body mouth and tail colour
$('#mouthcolor').change(()=>{
  var color2Val = $('#mouthcolor').val()
  mouthColor(colors[color2Val],color2Val)
})

//listener for eyecolour slider
$('#eyecolor').change(()=>{
  var color3Val = $('#eyecolor').val()
  eyeColor(colors[color3Val],color3Val)
})

$('#earcolor').change(()=>{
  var color4Val = $('#earcolor').val()
  earColor(colors[color4Val],color4Val)
})

$('#eyeshape').change(() => {
  var shape = parseInt($('#eyeshape').val())
  eyeVariation(shape)
})

$('#decorativepattern').change(() => {
  var pattern = parseInt($('#decorativepattern').val())
  decorationVariation(pattern)
})

$('#patterncolour1').change(() => {
  var pattern1 = $('#patterncolour1').val()
  patternColor1(colors[pattern1], pattern1)
})

$('#patterncolour2').change(() => {
  var pattern2 = $('#patterncolour2').val()
  patternColor2(colors[pattern2], pattern2)
})

$('#animation').change(() => {
  var animations = parseInt($('#animation').val())
  animationVariation(animations)
})

//Randomize Kitty (simplified)
$('#random').click(() => {
  randomCat();
})

//Set Default Kitty
$('#default').click(() => {
  renderCat(defaultDNA)  
})

function showColors(){
  $('#catColors').removeClass('hidden')
  $('#cattributes').addClass('hidden')
}

function showCattributes(){
  $('#cattributes').removeClass('hidden')
  $('#catColors').addClass('hidden')
}