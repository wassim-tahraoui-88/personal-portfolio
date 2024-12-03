import { random } from './Utils';

export type EffectOptions = { timeout: any, apply: any }

export enum EffectType {
	BLINK, SPASM, TYPEWRITER
}

const Effects: { [key in EffectType] : { setup: Function, apply : Function } } = {
	[EffectType.BLINK]: {
		setup: (element : Element, options : EffectOptions) => {
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
		setup: (element : Element, options : EffectOptions) => {
			Effects[EffectType.SPASM].apply(element, options.apply.otherTransforms);
			setTimeout(() => Effects[EffectType.SPASM].setup(element, options), random(options.timeout.min, options.timeout.max));
		},
		apply: (element : Element, otherTransforms : string) => element.setAttribute('transform', `rotate(${random(-270, 270)}) ${otherTransforms}`)
	},
	[EffectType.TYPEWRITER]: {
		setup: (element : Element, options : EffectOptions) => {
			options.apply.index = 0;
			element.classList.add('typewriter-container');

			const text = document.createElement('p');
			text.classList.add('typewriter-text');

			const textNode = document.createTextNode('');

			const caret = document.createElement('span',);
			caret.classList.add('typewriter-caret');
			caret.innerHTML = '&nbsp;_';

			text.append(textNode, caret);
			element.appendChild(text);

			const interval = setInterval(() => Effects[EffectType.TYPEWRITER].apply(text.firstChild, interval, options.apply), options.apply.interval);
		},
		apply: (element : Element, interval : number, options : any) => {
			if (options.index === options.text.length) return clearInterval(interval);
			element.nodeValue = options.text.substring(0, ++options.index);
		}
	}
}
export function useEffect(node : Element, params : { type: EffectType, options: any }) {
	Effects[params.type].setup(node, params.options);
}
