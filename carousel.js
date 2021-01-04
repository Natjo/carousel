/**
 * @module Carousel
 */

function Carousel (slides){
	const items = slides.querySelectorAll('.item');
	const length = items.length;
	const isTouchable = 'ontouchstart' in document.documentElement;
	let itemW;
	let gap;
	let offset = 0;
	let index = 0;
	var downX;
	
	const animation = param => {
		const ease = t => t*(2-t);
		const start = param.start;
		const end = param.end;
		const duration = 300;
		var req, time;
		var init = null;

		const startAnim = timeStamp  => {
			init = timeStamp;
			draw(timeStamp);
		}
		const draw = now => {
			time = now - init;
			param.onChange(start + (end - start) * ease(time / duration));
			req = window.requestAnimationFrame(draw);
			time >= duration && window.cancelAnimationFrame(req);
		}
		req = window.requestAnimationFrame(startAnim);
	}
	
	const resize = () => {
		itemW = items[0].clientWidth;
		gap = parseInt(getComputedStyle(slides).gridColumnGap);
		slides.scrollLeft = (itemW + gap) * index;
	};
	
	const mouseMove = val => slides.scrollTo(-val + offset, 0);
	
	const goto = num => {
		if(index < 0) index = 0;
		else if(index >= length-1) index = length-1;
		if ( 'scrollBehavior' in document.documentElement.style ) {
    		slides.scrollTo({
				left: (itemW + gap) * num,
				behavior: 'smooth'
			});
		}else{
			animation({
				start: slides.scrollLeft,
				end: (itemW + gap) * num,
				onChange(value){
					slides.scrollTo(value, 0);
				}
			});
		}
	}

	const mouseUp = val => {
		downX - val < 0 ? index-- : index++;
		slides.style.cursor = 'default';
		slides.onmousemove = slides.onmouseup = null;
		slides.ontouchmove = slides.ontouchend = null;
		goto(index);
	}
	
	const mouseDown = val => {
		downX = val;
		offset = downX + slides.scrollLeft;
		slides.style.cursor = 'grab';
		slides.onmousemove = e => mouseMove(e.clientX);
		slides.onmouseup = e => mouseUp(e.clientX);
		return false;
	}
	
	const touchstart = val => {
		downX = val;
		offset = downX + slides.scrollLeft;
		slides.style.cursor = 'grab';
		slides.ontouchmove = e => mouseMove(e.touches[0].clientX);
		slides.ontouchend = e => mouseUp(e.changedTouches[0].clientX);
		return false;
	}

	this.prev = () => {
		index--;
		goto(index);
	} 

	this.next = () => {
		index++;
		goto(index);
	}
	
	this.enable = () => {
		if(isTouchable){
			slides.ontouchstart = e => touchstart(e.touches[0].clientX);
		}else{
			slides.onmousedown = e => mouseDown(e.clientX);
		}
		window.addEventListener('resize', resize, {passive: true});
		resize();
	}
	
	this.disable = () => {
		slides.onmousemove = slides.onmouseup = slides.onmousedown = null;
		slides.ontouchmove = slides.ontouchend = slides.ontouchstart = null;
		window.removeEventListener('resize', resize);
	}
}


export default Carousel;