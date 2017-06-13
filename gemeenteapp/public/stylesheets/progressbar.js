/**
 * Created by Bas on 08-06-17.
 */
window.addEventListener('load', function() {
    var h, i;
    var dataValues = [];
    var svgs = document.querySelectorAll('.svg');
    var play = document.getElementById('playAnimation');
    var replay = document.getElementById('replayAnimation');
    // get data values
    for (i = 0; i < svgs.length; i++) {
        dataValues.push(svgs[i].dataset["value"]);
    }
    // build the progress bar
    function drawcircles(duration = '5s') {

        var circlelines = document.querySelectorAll('.load-circle');

        for (h = 0; h < circlelines.length; h++) {
            var totalLength = circlelines[h].getTotalLength();
            var offset = totalLength - ((dataValues[h] / 100) * totalLength);
            circlelines[h].style.transitionDuration = duration;
            circlelines[h].style.strokeDashoffset = offset + "px";
        }
    }

    // release the progressbar to 0%

    function releaseCircles() {
        var circlelines = document.querySelectorAll('.load-circle');

        for (h = 0; h < circlelines.length; h++) {
            var totalLength = circlelines[h].getTotalLength();

            circlelines[h].style.transitionDuration = '.3s';
            circlelines[h].style.strokeDashoffset = totalLength + "px";

        }
    }

    function updateValue() {
        var svgs = document.querySelectorAll('.svg');

        var circlelines = document.querySelectorAll('.load-circle');

        for (h = 0; h < circlelines.length; h++) {
            var totalLength = circlelines[h].getTotalLength();
            var offset = totalLength - ((dataValues[h] / 100) * totalLength);
            if (svgs[h].dataset["value"] !== offset) {
                svgs[h].dataset["value"] = parseInt((offset / totalLength) * 100);
            }

        }
    }
    // initializing
    drawcircles();
    play.addEventListener('click', drawcircles);
    replay.addEventListener('click', releaseCircles);

})

function goBack() {
    window.history.back();
}