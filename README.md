
# Carousel

![version](https://img.shields.io/github/manifest-json/v/Natjo/carousel)

Light carousel

## Parameters
| Parameter | Type | Default | Description |
| ------ | ------ | ------ | ------ |
|  |  | - |  |


## Usage

### html
```html
<ul class="carousel">
	<li class="item">
		<img src="https://picsum.photos/id/26/800/600" alt="">
	</li>
	<li class="item">
		<img src="https://picsum.photos/id/12/800/600" alt="">
	</li>
	<li class="item">
		<img src="https://picsum.photos/id/81/800/600" alt="">
	</li>
	<li class="item">
		<img src="https://picsum.photos/id/301/800/600" alt="">
	</li>
	<li class="item">
		<img src="https://picsum.photos/id/52/800/600" alt="">
	</li>
	<li class="item">
		<img src="https://picsum.photos/id/152/800/600" alt="">
	</li>
	<li class="item">
		<img src="https://picsum.photos/id/22/800/600" alt="">
	</li>
</ul>
```
### javascript
```javascript
const slider_first = document.querySelector('.carousel');
const btn_prev = document.querySelector('.btn-prev');
const btn_next = document.querySelector('.btn-next');
const carousel1 = new Carousel(slider_first);
carousel1.enable();

btn_prev.onclick = () => carousel1.prev();
btn_next.onclick = () => carousel1.next();

```
### Css
```css
.carousel{
	--nb: 2;
	@media (min-width: 800px){
		--nb: 2;
	}
}
```
```css
.carousel{
	--nb: 2;
	padding-left: var(--ctr-margin);
	grid-auto-columns: calc((100% - var(--ctr-margin)) / var(--nb) - var(--gap) * ((var(--nb) - 1) / var(--nb)));
	
	@media (min-width: 800px){
		--nb: 3;
		padding-left: calc((100% - var(--ctr-width)) / 2 + var(--ctr-margin));
	}
}
```


## Demo
loop with grid pos 
[See codepen demo](https://codepen.io/natjo/pen/LYRwKyW?editors=0011)


Scroll native:
[See codepen demo](https://codepen.io/natjo/pen/JjRvoNP?editors=0010)


[See codepen demo](https://codepen.io/natjo/pen/QWERPrb?editors=0110)

-> No loop more simple
[See codepen demo](https://codepen.io/natjo/pen/VwpBjWE)

