$(document).ready(function() {

    //functions which will be executed regardless of screensize
    tabSystem()
    formValidation()
    backToTheTop()

    //reload on page resize to load the right JS functions
    //conditional functions which should be only executed on specific screen sizes

    //Refresh browser on window size change
    $(window).on('resize', function() {
        if ($(window).width() > 1024) {
            location.reload()
        }
    })

    //fire functions depending on screen size
    if ($(window).width() < 1024) {
        burgerMenu()
        sliderMobile()
    } else {
        lightBox()
    }





    /*
    Functions impressum
  
    Mobile functions
    Burgermenu........................51-56
    Slider............................59-12

    Desktop functions
    Lightbox..........................130-217

    Global functions
    Tabs..............................222-258
    Form Validation...................261-393
    Back to Top.......................396-404
  
    */

    //Functions (Mobile)
    //burgerMenu(), sliderMobile()


    //Burgermenu function
    function burgerMenu(e) {
        $('.icon-one').click(function() {
            $('.sideSection nav ul li').toggle('show')
        })
    }


    //slider function
    function sliderMobile(e) {

        //we inject a template to use the desired slider menu which unfortunatly won't work/look good enough with our current html
        const template = `<div class="left"><i class="fas fa-caret-left"></i></div>
  <div class="right"><i class="fas fa-caret-right"></i></div>`

        $('.mainGallery').append(template)

        //variables for the buttons
        const MprevBtn = $('.left'),
            MnextBtn = $('.right')

        //variables for the slider
        const sliderList = $('.thumbnail'),
            slides = sliderList.children('img'),
            slideCount = slides.length,
            slidesWidth = slides.width(),
            slidesHeight = slides.height(),
            sliderListWidth = slideCount * slidesWidth

        //make the slider as big as the slide
        sliderList.css({
            width: sliderListWidth,
            marginLeft: slidesHeight
        })

        // fit the row of slides
        sliderList.css({
            width: sliderListWidth,
            marginLeft: slidesWidth
        })

        //take last slide and put it to the end of the slide row
        slides.last().prependTo(sliderList)

        //Click events on the buttons
        MprevBtn.on('click', moveLeft)
        MnextBtn.on('click', moveRight)

        function moveLeft() {
            //animate the movement of the slide
            sliderList.animate({
                    left: +slidesWidth
                }, 200,
                function() {
                    $(this).children('img').last().prependTo(sliderList)
                    $(this).css('left', '')
                })
        }

        //basically the same as the moveLeft function, just backwards
        function moveRight() {
            sliderList.animate({
                    left: -slidesWidth
                }, 200,
                function() {
                    $(this).children('img').first().appendTo(sliderList)
                    $(this).css('left', '')
                })
        }
    }








    //Functions (Desktop/Laptop)
    // lightBox()

    // Lightbox, this will open a modal view of to browse through the images
    function lightBox() {

        //open and close functions for the modal view

        //variables
        const $images = $('#moodboard > div > div > img')

        //click to open modal view
        $images.click(function() {
            let targetImg = $(this).attr('src')

            $('.modal').addClass('visible')
                //give the selected img a class to indetify in the big picture, when the modal is open
            $(this).addClass('selectedImg')
                //get the source of the clicked thumbnail and give it to the big picture in the lightbox
            $('#moodboard > div.modal.visible > div > img').attr('src', targetImg)
            $('#moodboard > div.modal.visible > div > img').addClass('activeImg')
                //disable scrolling while the modal is open
            $('body').css('overflow', 'hidden')
        })

        //functions for the actual modal view (get the big picture, browse left and right)

        //lightbox buttons and other variables
        const nextBtn = $('.right'),
            prevBtn = $('.left'),
            allImgs = $('.thumbnail'),
            firstImg = allImgs.filter(':first-of-type').find(':first'),
            lastImg = allImgs.filter(':last-of-type').find(':last')




        //Next arrow button
        nextBtn.click(function() {
            //select the image src which is right next the one with the class .selectedImg
            let nextImg = $('.selectedImg').next().attr('src')
                //console.log(firstImg);

            //loop through the imgs and give on click the next img the class .selectedImg which will appear in the big picture of the modal
            $images.each(function() {

                //remove every selectedImg class 
                $(this).removeClass('selectedImg')
                $('.activeImg').attr('src', nextImg)
                    //compare if the looped image has the same src as the image in the modal. If yes give it the class selectedImg
                if ($(this).attr('src') == $('.activeImg').attr('src')) {
                    $(this).addClass('selectedImg')
                }
                //if you get to the last image in the main gallery, you should get the src of the first image
                if ($(this).attr('src') == lastImg.attr('src')) {
                    $('.activeImg').attr('src', firstImg.attr('src'))
                }
            })
        })


        //Previous arrow button, the explanation to these are the same as the next button, just backwards
        prevBtn.click(function() {

            let prevImg = $('.selectedImg').prev().attr('src')


            $images.each(function() {
                console.log($(this));
                $(this).removeClass('selectedImg')
                $('.activeImg').attr('src', prevImg)
                if ($(this).attr('src') == $('.activeImg').attr('src')) {
                    $(this).addClass('selectedImg')
                }
                if ($(this).attr('src') == firstImg.attr('src')) {
                    $('.activeImg').attr('src', lastImg.attr('src'))
                }
            })
        })

        //close modal with the cross icon
        $('.exitButton').click(function() {
            console.log('closetheview')
                //remove all given classes and reactivate the scrolling
            $('.modal').removeClass('visible')
            $($images).removeClass('activeImg')
            $('body').css('overflow', 'auto')
        })
    }


    //Code which will function regardless of screensize

    //Tabs

    function tabSystem() {
        //define the variables
        const $wrapper = $('.tab-container'),
            $allTabs = $('.tab-inhalt > div'),
            $tabMenu = $('.tab-auswahl li')

        //hide tabs-content that are not the first tab
        $allTabs.not(':first-of-type').hide()

        //for every tab, assign a data attribute to the li (itterate)
        $tabMenu.each(function(i) {
            $(this).attr('data-tab', 'tab' + i)
        })

        //now do the same for the tabs themselves (the content)
        $allTabs.each(function(i) {
            $(this).attr('data-tab', 'tab' + i)
        })

        //when we click one of the tabs:
        $tabMenu.on('click', function() {
            const dataTab = $(this).data('tab'),
                $getWrapper = $(this).closest($wrapper)

            //we remove the active class of all tabs, add it to the one we clicked
            $getWrapper.find($tabMenu).removeClass('active')
            $(this).addClass('active')

            //we hide all the tabs
            $getWrapper.find($allTabs).hide()
                // show the tab which was clicked using the data attribute of the clicked menu
            $getWrapper.find($allTabs).filter(`[data-tab="${dataTab}"]`).show()
        })

    }


    function formValidation() {

        //prevent page reload which on submit click
        document.querySelector('#submit').addEventListener('click', (e) => {
            e.preventDefault()


            //remove any rest Data
            if (document.querySelector('span')) {
                document.querySelectorAll('form span').forEach(element => {
                    element.remove()
                })
            }
            //the main function which, how the name is hinting validates the form.
            validateForm()
        })

        //form validation function is being written down here
        function validateForm() {

            //this variable will contain all data delivered by the form
            let data = {}

            //this variable will contain all the errors, if any where made while filing in the form
            let validationErrors = {}

            //let's link the path from which our data var will get the data which is the inputs
            data.firstName = document.querySelector('#firstName')
            data.lastName = document.querySelector('#lastName')
            data.email = document.querySelector('#email')
            data.textbox = document.querySelector('#textbox')

            //validation start

            //first name validation. if empty, length
            if (!data.firstName.value) {
                console.error('No first name value')
                validationErrors.firstName = 'Please enter your first name'

            } else if (!data.firstName.length > 2) {
                console.error('Name value too short')
                validationErrors.firstName = 'Your name is too short, please enter atleast two letters'
                console.info('First Name present')
            }


            //validate last name. if empty, length
            if (!data.lastName.value) {
                console.error('No Last name value')
                validationErrors.lastName = 'Please enter your first name'

            } else if (!data.lastName.length > 2) {
                console.error('Last name value too short')
                validationErrors.lastName = 'Your Last name is too short, please enter atleast two letters'
                console.info('Last Name present')
            }

            //validate email
            if (!data.email.value) {
                console.error('no email value')
                validationErrors.email = 'please enter your Email';
            } else {
                console.info('Email present')
                    //the email part of the form is not empty, we should still check if the mail contains a valid combination

                let emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                //test the mail now. if the value is valid or not
                if (!emailRegExp.test(data.email.value)) {
                    validationErrors.email = 'Invalid email address'
                }
            }


            //validate textbox
            if (!data.textbox.value) {
                console.error('no value in textbox')
                validationErrors.textbox = 'please enter a message'
            } else if (!data.textbox.length > 3) {
                console.error('textbox value too short')
                validationErrors.lastName = 'your text is too short!'
                console.info('Last Name present')
            }
            //call the functions. if we have errors we will implement them in the DOM. else the 

            //check if the errors object has data 
            if (Object.keys(validationErrors).length > 0) {
                console.log('error')
                displayErrors(validationErrors, data)
            } else {
                console.log('no errors found');
                sendForm(data)
            }

        }

        function displayErrors(errors, data) {
            //output the result in a function which will create a data after the failde form
            if (errors.firstName) {
                createAfter(data.firstName, errors.firstName)
            }
            if (errors.lastName) {
                createAfter(data.lastName, errors.lastName)
            }
            if (errors.email) {
                createAfter(data.email, errors.email)
            }
            if (errors.textbox) {
                createAfter(data.textbox, errors.textbox)
            }
        }

        //the actual createAfter function
        function createAfter(reference, message) {
            //create element to contain the error message
            let errorContent = document.createElement('span')
                //insert said message in the html
            errorContent.innerHTML = message
            reference.after(errorContent)
        }

        // if everything is OK this will be sent
        function sendForm(data) {
            document.querySelector('form').style.display = 'none'
            let box = document.createElement('div')
            box.className = 'everythingOK'

            //append the (THANK YOU) box to the HTML
            box.innerHTML = `  
  <h3>Thank you for your time! We will take a look at your Request.</h3>
  `
            document.querySelector('.contactContent').prepend(box)
        }
    }


    //back to top button
    function backToTheTop() {
        $('.backToTop').click(function() {
            //animate smooth scroll to the top
            $('html, body').animate({
                scrollTop: 0
            }, 'slow')
        })
    }
})