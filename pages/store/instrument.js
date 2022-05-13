import { Sampler, Filter, Master, Compressor } from 'tone';
import samples from '../../static/samples.json';

const NOTE_TIME_OFFSET_S = 0.01;

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

const getInstrument = (instrument) => {
	const sampler = new Sampler({
		urls: samples[instrument],
		baseUrl: "https://mood.toob.net.cn/samples/"
	}).chain(lowpass, lowshelf, compressor, Master);

	return sampler;
}
export default getInstrument