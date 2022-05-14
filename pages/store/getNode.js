import {Scale} from 'tonal';

const ONE_HUNDRED = 100;
const tonicPc = 'D';
// eslint-disable-next-line no-magic-numbers
const octaves = [2, 3, 4, 5, 6];
const notes = octaves.reduce(
	(allNotes, octave) =>
	allNotes.concat(Scale.notes(`${tonicPc}${octave}`, 'major')),
	[]
)

const noteIndex = (yPct) => Math.min(
			notes.length - 1,
			Math.floor(((ONE_HUNDRED - yPct) / ONE_HUNDRED) * notes.length)
		)

const getNoteAtHeight = (yPct) => {
	// console.log('yPct------',yPct);
	// console.log('notes------',notes);
	let iy = noteIndex(yPct)+1;
	// console.log('noteIndex------',iy);
	return notes[iy<0?0:iy];
}

export default getNoteAtHeight