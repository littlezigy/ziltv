export default function(video){
    let name = (video.title) ? video.title + '_thumbnail' : 'thumbnail';
    name += '_' + (Math.random() * 10000);

    var filename = video.src;
    var w = video.videoWidth;//video.videoWidth * scaleFactor;
    var h = video.videoHeight;//video.videoHeight * scaleFactor;
    var canvas = document.createElement('canvas');

    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, w, h);

    return new Promise((resolve, reject) => {
        const blob = canvas.toBlob(function(blob) {
            resolve(new File([blob], name + '.png', {type: 'image/png'}))
        }, 'image/png');
    });
}
