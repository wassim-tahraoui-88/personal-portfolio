import { writable } from 'svelte/store';

export const MousePosition = writable({ x: 0, y: 0 });

export const MouseTrack = (event : MouseEvent) => {
	MousePosition.set({ x: event.clientX, y: event.clientY });
}