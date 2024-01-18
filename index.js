const keyCodeToNote = [
    'KeyQ',     //C
    'Digit2',   //C#
    'KeyW',     //D
    'Digit3',   //D#
    'KeyE',     //E
    'KeyR',     //F
    'Digit5',   //F#
    'KeyT',     //G
    'Digit6',   //G#
    'KeyY',     //A
    'Digit7',   //A#
    'KeyU'      //B
]

const actx = new AudioContext()
const sq = actx.createOscillator()
const filter = actx.createBiquadFilter()
const gain = actx.createGain()

const gainMax = 0.6

const midiToFreq = (m) => 440 * Math.pow(2, (m - 69) / 12)

/* add(key) {
        if (this.list.size >= this.nVoices) return false
        let k = keyCodeToNote.indexOf(key)
        if (k === -1) return false
        return this.list.add(key + A440)
    }

    remove(key) {
        let k = keyCodeToNote.indexOf(key)
        return this.list.delete(k + A440)
    }
 */

let flag = false
addEventListener('keydown', (ev) => {
    let k = keyCodeToNote.indexOf(ev.code)
    if (k === -1) return false
    filter.frequency.value = midiToFreq(k + 69)
    console.log(k + 69, filter.frequency.value)
    // if (!flag) {
    //     sq.start()
    //     flag = true
    // }
    // return this.list.add(key + A440)
})
addEventListener('keyup', (ev) => {
    let k = keyCodeToNote.indexOf(ev.code)
    if (k === -1) return false
    // if (flag) {
    //     sq.stop()
    //     flag = false
    // }
})

let bufferSize = 2 * actx.sampleRate,
    noiseBuffer = actx.createBuffer(1, bufferSize, actx.sampleRate),
    output = noiseBuffer.getChannelData(0);
for (var i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
}

var whiteNoise = actx.createBufferSource();
whiteNoise.buffer = noiseBuffer;
whiteNoise.loop = true;
whiteNoise.start(0);



// sq.type = 'square'
// sq.frequency.value = 440

// sq.start()

filter.type = "bandpass"
filter.Q.value = 100
filter.gain = 200
filter.frequency = 440

gain.gain.value = gainMax

whiteNoise.connect(filter)
filter.connect(gain)
gain.connect(actx.destination)
