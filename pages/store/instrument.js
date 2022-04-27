import { Sampler, Filter, Master, Compressor } from 'tone';
import samples from '../../static/samples.json';
import {Scale} from 'tonal';

const ONE_HUNDRED = 100;
const NOTE_TIME_OFFSET_S = 0.01;
const VELOCITY = 1
const tonicPc = 'D';
// eslint-disable-next-line no-magic-numbers
const octaves = [2, 3, 4, 5, 6];
const notes = octaves.reduce(
	(allNotes, octave) =>
	allNotes.concat(Scale.notes(`${tonicPc}${octave}`, 'major')),
	[]
)
const getNoteAtHeight = yPct =>
	notes[
		Math.min(
			notes.length - 1,
			Math.floor(((ONE_HUNDRED - yPct) / ONE_HUNDRED) * notes.length)
		)
	];
const lowpass = new Filter({
	frequency: 2500,
	type: 'lowpass',
});
const lowshelf = new Filter({
	freqequency: 1500,
	type: 'lowshelf',
	rolloff: -96,
});
const compressor = new Compressor();

const playByInstrument = (yPct, delay) => {
	const note = getNoteAtHeight(yPct);
	const instrument = new Sampler({
		urls: samples['vsco2-piano-reverb-mp3'],
		baseUrl: "/static/samples/vsco2-piano-reverb-mp3/",
		onload: () => {
			instrument.triggerAttack(note, delay + NOTE_TIME_OFFSET_S, VELOCITY);
		}
	}).chain(lowpass, lowshelf, compressor, Master);
}
export default playByInstrument