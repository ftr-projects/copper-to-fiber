import '../styles/main.scss';

(function() {

    var mbps = 50;
    var animation = 10;
    var fillColor = '#D9272D';
    var defaultcolor = '#a7a9ac';
    var firstSpeedometer = '#speed1'

    var obj = {};
    obj.intervalCache = [];
    obj.intervalId = 1;

    function initSpeedometer(el) {
        var fillColor = "#D9272D";
        var mbps = $(el).data('speed'); //speed number in mbps
        var index = 0;
        var lines = $(el).find('.cls-1');
        var speedText = $(el).find('.number')[0];
        var fill = $(el).data('fill') ? $(el).data('fill') : 100;
        var fillLines = Math.ceil(lines.length * fill / 100);

        while (index < fillLines) {
            lines[index++].style.fill = fillColor;
            speedText.innerText = Math.floor(index * (mbps / fillLines));
        }
        speedText.innerText = mbps;

    };

    function animateSpeedometer(el) {
        var fillColor = "#D9272D";
        var mbps = $(el).data('speed'); //speed number in mbps
        var duration = 1000; //milliseconds
        var index = 0;
        var lines = $(el).find('.cls-1');
        var speedText = $(el).find('.number')[0];
        var fill = $(el).data('fill') ? $(el).data('fill') : 100;
        var fillLines = Math.ceil(lines.length * fill / 100);

        // reset
        $(el).find('.cls-1').css('fill', '#efefef');
        $(el).find('.number')[0].innerText = 0;

        // animate
        var intervalId = obj.intervalId++;
        $(el).attr('data-interval-id', intervalId);
        obj.intervalCache[intervalId] = setInterval(function() {
            if (index < fillLines) {
                lines[index++].style.fill = fillColor;
                speedText.innerText = Math.floor(index * (mbps / fillLines));
            } else {
                clearInterval(obj.intervalCache[intervalId]);
                delete obj.intervalCache[intervalId];
                $(el).removeAttr('data-interval-id');
                speedText.innerText = mbps;
            }
        }, duration / lines.length);



    };


    function resetProgress(el) {
        var progressBar = $('.progress-bar');
        var fill = progressBar.data('fill') ? progressBar.data('fill') : 100;
        progressBar.css('width', fill + "%");
    };

    function animateProgress(el) {
        var progressBar = $(el).find('.progress-bar');
        var duration = progressBar.data('duration') ? progressBar.data('duration') : 1000; //milliseconds
        var index = 0;
        var lines = 100;
        var fill = progressBar.data('fill') ? progressBar.data('fill') : 100;
        var fillLines = Math.ceil(lines * fill / 100);

        // reset
        progressBar.css('width', 0);

        // animate
        var intervalId = obj.intervalId++;
        $(el).attr('data-interval-id', intervalId);
        obj.intervalCache[intervalId] = setInterval(function() {
            if (index <= fillLines) {
                progressBar.css('width', (index++) + "%");
            } else {
                clearInterval(obj.intervalCache[intervalId]);
                delete obj.intervalCache[intervalId];
                $(el).removeAttr('data-interval-id');
            }
        }, duration / lines);

    };


    $(window).scroll(function() {
        var hT = $(firstSpeedometer).offset().top,
            hH = $(firstSpeedometer).outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();
        if (wS > (hT + hH - wH)) {
            if (!$(firstSpeedometer).hasClass('animated1')) {
                animateSpeedometer(firstSpeedometer);
                $('#speed1').addClass('animated1');
            }
        }
    });

    $('.active-group').each(function(index) {
        $(this).on('click', function() {
            animateSpeedometer('#speed' + (index + 1));
            resetProgress();
            animateProgress(this);
            $('.active-group').removeClass('active-offer');
            $(this).addClass('active-offer');
        })
    });

    $(function() {
      //$.getScript('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js', function( data, textStatus, jqxhr ) {
        $('[data-tooltip]').tooltip();
      //})
    });

})();
