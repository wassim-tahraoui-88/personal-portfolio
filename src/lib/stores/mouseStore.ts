import { writable } from 'svelte/store';

type MousePositionType = { x: number; y: number; }

export const MousePosition = writable<MousePositionType>({ x: 0, y: 0 });
export const trackMouse = (event : MouseEvent) : any => {
	MousePosition.set({ x: event.clientX, y: event.clientY });
};