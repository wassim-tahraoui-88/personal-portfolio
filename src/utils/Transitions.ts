export type TransitionOptions = { transitionTime : string, isEnter : boolean }

export enum TransitionType {
	FADE, SWIPE
}


const Transitions : { [key in TransitionType] : { setup: Function, apply : Function } } = {
	[TransitionType.FADE]: {
		setup: (element : Element, options : TransitionOptions) => {
			// TODO: Necessary setup logic here
			Transitions[TransitionType.FADE].apply(element, options);
		},
		apply: (element : Element, options : TransitionOptions) => {
		}
	},
	[TransitionType.SWIPE]: {
		setup: (element : Element, options : TransitionOptions) => {
			// TODO: Necessary setup logic here
			Transitions[TransitionType.SWIPE].apply(element, options);
		},
		apply: (element : Element, options : TransitionOptions) => {

		}
	}
}