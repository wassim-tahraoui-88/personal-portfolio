import { random } from './utils';

export interface UICircle {
	radius: number;
	strokeWidth: number;
	dashArray: string;
}
export interface UICirclesOptions {
	maxRadius: number;
	count: { min: number, max: number };
	strokeWidth: { min: number, max: number };
	offsetFactor: number;
}

export const generateUICircles = (options : UICirclesOptions) : UICircle[] => {
	const circles : UICircle[] = [];
	const circlesCount = random(options.count.min, options.count.max);
	let _radius = options.maxRadius;
	for (let i = 0; i < circlesCount; i++) {
		let _strokeWidth = random(options.strokeWidth.min, options.strokeWidth.max);
		const dashArray = Array.from({ length: random(2, 5) }, () => random(10, 120)).join(", ");
		circles.push({ radius: _radius, strokeWidth: _strokeWidth, dashArray: dashArray });
		_radius -= _strokeWidth * options.offsetFactor;
	}
	return circles;
}