import { type Writable, writable } from 'svelte/store';

interface MousePosition {
	x: number;
	y: number;
}

export const mousePosition : Writable<MousePosition> = writable({ x: 0, y: 0 });

export const mouseTrack = (event : MouseEvent) : any => {
	mousePosition.set({ x: event.clientX, y: event.clientY });
}