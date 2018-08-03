class AudioBuffer {
    alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    press = "Press_The_Letter";
    path = "/assests/sounds/";
    loaded = false;

    constructor(context){
        this.context = context;
        this.buffer = [];
        this.urls = this.alphabet.map((letter) => {
            return this.path + letter + ".wav";
        });
        this.urls.push(this.path + this.press + ".wav");
    }

    loadSound(url, index) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('get', url, true);
            request.responseType = 'arraybuffer';
            let thisBuffer = this;
            request.onload = function() {
                thisBuffer.context.decodeAudioData(request.response, function(buffer) {
                    thisBuffer.buffer[index] = buffer;
                    if(index == thisBuffer.urls.length-1) {
                        this.loaded = true;
                    }
                    resolve();
                });
            };
            request.send();
        });
    };

    loadAll() {
        return Promise.all(this.urls.map((url, index) => this.loadSound(url, index)));
    }

    getSoundByIndex(index){
        return this.buffer[index];
    }

    appendBuffer(buffer1, buffer2) {
        var numberOfChannels = Math.min( buffer1.numberOfChannels, buffer2.numberOfChannels );
        var tmp = this.context.createBuffer( numberOfChannels, (buffer1.length + buffer2.length), buffer1.sampleRate );
        for (var i=0; i<numberOfChannels; i++) {
          var channel = tmp.getChannelData(i);
          channel.set( buffer1.getChannelData(i), 0);
          channel.set( buffer2.getChannelData(i), buffer1.length);
        }
        return tmp;
    }

}

export default AudioBuffer;