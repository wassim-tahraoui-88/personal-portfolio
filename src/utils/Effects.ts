import { random } from './Utils';

export enum EffectType {
	BLINK, SPASM
}

const Effects: { [key in EffectType] : any } = {
	[EffectType.BLINK]: {
		setup: (element : Element, options : any) => {
			Effects[EffectType.BLINK].apply(element, options.apply.color, options.apply.duration );
			setTimeout(() => Effects[EffectType.BLINK].setup(element, options), random(options.timeout.min, options.timeout.max));
		},
		apply: (element : Element, color: string, duration : number) => {
			element.setAttribute('stroke', color);
			element.classList.remove('filter-glow');
			setTimeout(() => {
				element.setAttribute('stroke', 'white');
				element.classList.add('filter-glow');
			}, duration);
		},
	},
	[EffectType.SPASM]: {
		setup: (element : Element, options : any) => {
			Effects[EffectType.SPASM].apply(element, options.apply.otherTransforms);
			setTimeout(() => Effects[EffectType.SPASM].setup(element, options), random(options.timeout.min, options.timeout.max));
		},
		apply: (element : Element, otherTransforms : string) => element.setAttribute('transform', `rotate(${random(-270, 270)}) ${otherTransforms}`)
	}
}

export default Effects;