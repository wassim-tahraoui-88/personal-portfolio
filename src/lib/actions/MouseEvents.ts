import type { Action } from 'svelte/action';

export type MouseEventOptions = { callback: MouseEventCallback, data?: any };
export type MouseEventCallback = (event : Event) => void;
export type InteractiveNode = HTMLElement | SVGElement;

export const useLongPress : Action<InteractiveNode, MouseEventOptions> = (node, options : MouseEventOptions) => {
	const handlePress = (event : Event) => options.data.timeout = setTimeout(() => options.callback(event), options.data.duration);
	const handleCancel = () => clearTimeout(options.data.timeout);

	node.addEventListener('mousedown', handlePress);
	node.addEventListener('mouseup', handleCancel);
	node.addEventListener('mouseleave', handleCancel);
	return {
		destroy: () => {
			node.removeEventListener('mousedown', handlePress);
			node.removeEventListener('mouseup', handleCancel);
			node.removeEventListener('mouseleave', handleCancel);
		}
	};
}