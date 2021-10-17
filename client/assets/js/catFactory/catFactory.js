
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code) {
    $('.cat__head, .cat__chest').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function mouthColor(color,code) {
    $('.cat__tail, .cat__chest_inner, .cat__mouth-contour').css('background', '#' + color)  //This changes the color of the cat
    $('#bodycode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnamouth').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function eyeColor(color,code) {
    $('.pupil-left, .pupil-right').css('background', '#' + color)  //This changes the color of the cat
    $('#eyecode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaeyes').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function earColor(color,code) {
    $('.cat__paw-left, .cat__paw-left_inner, .cat__paw-right, .cat__paw-right_inner, .cat__ear--left, .cat__ear--right').css('background', '#' + color)  //This changes the color of the cat
    $('#earcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaears').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function patternColor1(color, code) {
    $('.cat__head-dots').css('background', '#' + color)
    $('#pattern1code').html('code: '+code)
    $('#dnadecorationMid').html(code)
}

function patternColor2(color, code) {
    $('.cat__head-dots_first, .cat__head-dots_second').css('background', '#' + color)
    $('#pattern2code').html('code: '+code)
    $('#dnadecorationSides').html(code)
}



//###################################################
//Functions below will be used later on in the project
//###################################################
function animationVariation(num){
    $('#dnaanimation').html(num)
    switch(num) {
        case 1:
            animationType1()
            $('#animationName').html('Moving Head')
            break
        case 2:
            animationType2()
            $('#animationName').html('Moving Eyes')
            break
        case 3:
            animationType3()
            $('#animationName').html("Wagging Tail") 
            break
        case 4:
            animationType4()
            $('#animationName').html("Nodding Head")
            break
        case 5:
            animationType5()
            $('#animationName').html("Waving Ears")
            break
        case 6:
            animationType6()
            $('#animationName').html("Trippy Eyes")            
         break
    }
}

function animationType1(){
    resetAnimation()
    $('#head').addClass('movingHead');
}

function animationType2(){
    resetAnimation()
    $('.pupil-left').addClass("movingLeftEye")
    $('.pupil-right').addClass("movingRightEye")
    
} 

function animationType3(){
    resetAnimation()
    $('.cat__tail').addClass("movingTail")
}

function animationType4(){
    resetAnimation()
    $('.cat__head').addClass("noddingHead")
}

function animationType5(){
    resetAnimation()
    $('.cat__ear--left').addClass("wavingLeftEar")
    $('.cat__ear--right').addClass("wavingRightEar")
} 

function animationType6(){
    resetAnimation()
    $('.pupil-left').addClass("leftEyeTripping")
    $('.pupil-right').addClass("rightEyeTripping")
}

function resetAnimation(){
    $('#head').removeClass('movingHead');
    $('.pupil-left').removeClass('movingLeftEye')
    $('.pupil-right').removeClass('movingRightEye')
    $('.cat__tail').removeClass('movingTail')
    $('.cat__head').removeClass('noddingHead')
    $('.cat__ear--left').removeClass("wavingLeftEar")
    $('.cat__ear--right').removeClass("wavingRightEar")
    $('.pupil-left').removeClass("leftEyeTripping")
    $('.pupil-right').removeClass("rightEyeTripping")

}

function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeName').html('Basic')
            break
        case 2:
            normalEyes()
            $('#eyeName').html('Chill')
            eyesType1()
            break
        case 3:
            normalEyes()
            $('#eyeName').html('Crazy')
            eyesType2()
            break
        case 4:
            normalEyes()
            $('#eyeName').html('Lizard')
            eyesType3()
            break
        case 5:
            normalEyes()
            $('#eyeName').html('Infatuated')
            eyesType4()
            break
        case 6:
            normalEyes()
            $('#eyeName').html('Looking Right')
            eyesType5()
            break
        case 7:
            normalEyes()
                $('#eyeName').html('Looking Left')
                eyesType6()
                break
               

    }
}

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#decorationName').html('Basic')
            normaldecoration()
            break
        case 2:
            normaldecoration()
            $('#decorationName').html("Left Stripes")
            decoration1()
            break
        case 3:
            normaldecoration()
            $('#decorationName').html("Upside Down")
            decoration2()
            break
        case 4:
            normaldecoration()
            $('#decorationName').html('Right Stripes')
            decoration3()
            break
        case 5:
            normaldecoration()
            $('#decorationName').html('Long Middle Stripe')
            decoration4()
            break
        case 6:
            normaldecoration()
            $('#decorationName').html('Long Outer Stripes')
            decoration5()
            break
        case 7:
            normaldecoration()
            $('#decorationName').html('Square Stripes')
            decoration6()
            break   
  
    }
}



async function normalEyes() {
    await $('.cat__eye').find('span').css('border', 'none')
}

async function eyesType1(){
    await $('.cat__eye').find('span').css('border-top', '15px solid') 
}

async function eyesType2(){
    await $('.cat__eye').find('span').css('border-bottom', '15px solid')
}

async function eyesType3(){
    await $('.cat__eye').find('span').css('border-left', '11px solid')
    await $('.cat__eye').find('span').css('border-right', '11px solid')
}

async function eyesType4(){
     await $('.cat__eye').find('span').css('border', '11px solid')
}

async function eyesType5(){
    await $('.cat__eye').find('span').css('border-left', '13px solid')
    await $('.cat__eye').find('span').css('border-right', '6px solid')
    await $('.cat__eye').find('span').css('border-bottom', '14px solid')
}    

async function eyesType6(){
    await $('.cat__eye').find('span').css('border-left', '6px solid')
    await $('.cat__eye').find('span').css('border-right', '13px solid')
    await $('.cat__eye').find('span').css('border-bottom', '14px solid')
}

async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    await $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    await $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    await $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function decoration1() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    await $('.cat__head-dots').css({ "transform": "rotate(90deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    await $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    await $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function decoration2() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    await $('.cat__head-dots').css({ "transform": "rotate(180deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    await $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    await $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function decoration3() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    await $('.cat__head-dots').css({ "transform": "rotate(270deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    await $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    await $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function decoration4() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    await $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "80px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    await $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    await $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function decoration5() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    await $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    await $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "65px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    await $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "65px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function decoration6() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    await $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0" })
    await $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0" })
    await $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0" })
}