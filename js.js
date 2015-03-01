$(document).ready(function($) {
    $(".wrapper").fadeTo('600', 1);
});

function getJsonFromGoogle(json) {
    var total = 0;
    var entry = "";
    var questionWrap;

    // create the header

    var headline = $('h1').html(json.feed.entry[0].gsx$copy.$t);
    var intro = $('p.intro').html(json.feed.entry[1].gsx$copy.$t);

    var thephoto = json.feed.entry[3].gsx$copy.$t;
    $('.photo').append('<img src="' + thephoto + '">');

    var byline = $('p.byline').html("Quiz by: " + json.feed.entry[2].gsx$copy.$t);

    for (var i = 0; i < json.feed.entry.length; i++) {
        entry = json.feed.entry[i];

        var theQuestion = '<div class="the-question"><p class="question" data-attribute="' + entry.gsx$correctattr.$t + '">' + entry.gsx$question.$t + '</p></div>';
        var theOptions = '<div class="the-options">' + '<p data-attribute="' + entry.gsx$datanamea.$t + '"><span class="mark"></span>' + entry.gsx$optiona.$t + '</p>' + '<p data-attribute="' + entry.gsx$datanameb.$t + '"><span class="mark"></span>' + entry.gsx$optionb.$t + '</p>' + '<p data-attribute="' + entry.gsx$datanamec.$t + '"><span class="mark"></span>' + entry.gsx$optionc.$t + '</p></div>';

        var correct = '<p class="yes">' + entry.gsx$correct.$t + '</p>';
        var incorrect = '<p class="no">' + entry.gsx$incorrect.$t + '</p>';

        var answer = '<p>' + entry.gsx$answer.$t + '</p>';

        var theAnswers = '<div class="the-answers">' + correct + incorrect + answer + '</div>';

        var questionWrap = '<div class="question-wrap">' + theQuestion + theOptions + theAnswers + '</div>';
        $('.the-quiz-wrapper').append(questionWrap);
    }

    $('.the-options p').on('click',function(){

        if ($(this).attr('data-attribute') == $(this).parent().prev().children('p.question').attr('data-attribute')) {

            total+=1;

            $(this).find('.mark').html('&#10004;').css('color','#133c58');
            $(this).siblings().css('background','#d4d4d4').find('.mark').html('&#10006;').css('color','#133c58').unbind();
            $(this).addClass('correct-style').parent().next().fadeIn();
            $(this).parent().next().find('.no').hide();

        } else {

           $(this).find('.mark').html('&#10006;').css('color','#133c58');
           $(this).siblings().unbind();
           $(this).addClass('incorrect-style').parent().next().fadeIn();
           $(this).parent().next().find('.yes').hide();

            
            var storingAttrofPdotOption = $(this).parent().prev().children().attr('data-attribute');
            $(this).siblings().each(function() {
              if ($(this).attr('data-attribute') == storingAttrofPdotOption) {
                $(this).siblings().css('border', '5px solid black');
                $(this).css('border', '5px solid green');
              };
            });
        };
        $('.total').html(total);
    });

    $('.question-wrap:last-of-type').on('click',function(){
        $('.tally').fadeIn();
    });
}