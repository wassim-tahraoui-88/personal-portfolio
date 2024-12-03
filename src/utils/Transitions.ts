
export enum TransitionType {
	FADE, SWIPE
}

export type TransitionOptions = { transitionTime : string, isEnter : boolean }

const Transitions : { [key in TransitionType] : { setup: Function, apply : Function } } = {
	[TransitionType.FADE]: {
		setup: (element : Element, options : TransitionOptions) => {
			Transitions[TransitionType.FADE].apply(element, options);
		},
		apply: (element : Element, options : TransitionOptions) => {
			// Transitions[TransitionType.FADE].setOpacity(element, options.isEnter ? 0 : 1);
		}
	},
	[TransitionType.SWIPE]: {
		setup: (element : Element, options : TransitionOptions) => {},
		apply: (element : Element, options : TransitionOptions) => {}
	}
}