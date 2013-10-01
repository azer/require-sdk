var sdk = require('./');

it('loads soundcloud api', function(done){
  var soundcloud = sdk('http://connect.soundcloud.com/sdk.js', 'SC');

  var calledFirst;

  soundcloud(function (error, api) {
    expect(error).to.not.exist;
    expect(api).to.equal(window.SC);
    expect(calledFirst).to.not.exist;

    calledFirst = true;
  });

  soundcloud(function (error, api) {
    expect(error).to.not.defined;
    expect(api).to.equal(window.SC);
    expect(calledFirst).to.be.true;

    var loadedAgain;

    soundcloud(function (error, api) {
      expect(error).to.not.exist;
      expect(api).to.equal(window.SC);
      expect(loadedAgain).to.not.exist;
      done();
    });

    loadedAgain = true;
  });

});

it('loads youtube api', function(done){
  var youtube = sdk('https://www.youtube.com/iframe_api', 'YT');
  var trigger = youtube.trigger();

  window.onYouTubeIframeAPIReady = function() {
    trigger();
    delete window.onYouTubeIframeAPIReady;
  };

  var calledFirst;

  youtube(function (error, api) {
    expect(error).to.not.exist;
    expect(api).to.equal(window.YT);
    expect(calledFirst).to.not.exist;
    expect(YT.Player).to.exist;
    calledFirst = true;
  });

  youtube(function (error, api) {
    expect(error).to.not.defined;
    expect(api).to.equal(window.YT);
    expect(YT.Player).to.exist;
    expect(calledFirst).to.be.true;
    done();
  });

});
