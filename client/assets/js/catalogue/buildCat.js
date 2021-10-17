// CSS properties to build each cat depending on the DNA


var colors = Object.values(allColors())

function headColor(code, id) {

    var color = colors[code]
    $('#head' + id + ', #chest' + id).css('background', '#' + color)
}

function mouthColor(code, id) {
    var color = colors[code]
    $('#mouth-contour' + id + ', #tail' + id + ', #chest_inner' + id).css('background', '#' + color)
}

function eyeColor(code, id) {
    var color = colors[code]
    $('#catEye' + id).find('span').css('background', '#' + color)
}

function earColor(code, id) {
    var color = colors[code]
    $('#leftEar' + id + ', #rightEar' + id + ', #pawLeft' + id + ', #pawRight' + id + ', #pawRightInner' + id + ', #pawLeftInner' + id).css('background', '#' + color)

}

//Middle decoration color
function patternColor1(code, id) {
    var color = colors[code]
    $('#midDot' + id).css('background', '#' + color)
}

//Sides decoration color
function patternColor2(code, id) {
    var color = colors[code]
    $('#leftDot' + id).css('background', '#' + color)
    $('#rightDot' + id).css('background', '#' + color)
}

// Variation functions for range-bars

//eye types
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


//decorations types
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

//6 Animations 
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

// **   Eyes **  //

function normalEyes() {
    $('.cat__eye').find('span').css('border', 'none')
}

function eyesType1(){
    $('.cat__eye').find('span').css('border-top', '15px solid') 
}

function eyesType2(){
    $('.cat__eye').find('span').css('border-bottom', '15px solid')
}

function eyesType3(){
    $('.cat__eye').find('span').css('border-left', '11px solid')
    $('.cat__eye').find('span').css('border-right', '11px solid')
}

function eyesType4(){
     $('.cat__eye').find('span').css('border', '11px solid')
}

function eyesType5(){
    $('.cat__eye').find('span').css('border-left', '13px solid')
    $('.cat__eye').find('span').css('border-right', '6px solid')
    $('.cat__eye').find('span').css('border-bottom', '14px solid')
}    

function eyesType6(){
    $('.cat__eye').find('span').css('border-left', '6px solid')
    $('.cat__eye').find('span').css('border-right', '13px solid')
    $('.cat__eye').find('span').css('border-bottom', '14px solid')
}

// **   Decoration **  //

// ** Angles ** //

function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

function decoration1() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(90deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

function decoration2() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(180deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

function decoration3() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(270deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

function decoration4() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "80px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

function decoration5() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "65px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "65px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

function decoration6() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0" })
}

/** Animations **/

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


// Eyes of the cat following the cursor
const closer = 4;
const further = -4;

document.addEventListener('mousemove', (e) => {
    let positionX = e.pageX;
    let positionY = e.pageY;

    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    let moveX = (positionX - width) / (width) * closer;
    let moveY = (positionY - height) / (height) * closer;

    $('.pupil-left').css('transform', 'translate(' + moveX + 'px,' + moveY + 'px)')
    $('.pupil-right').css('transform', 'translate(' + moveX + 'px,' + moveY + 'px)')

}, false);