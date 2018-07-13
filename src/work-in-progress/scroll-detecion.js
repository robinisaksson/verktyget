//
import TweenMax from 'gsap';
import TimelineMax from 'gsap/TimelineMax';

import {EventDispatcher} from 'verktyget';
import {DeviceInfo} from 'verktyget';
import {DOM} from 'verktyget';

export class ScrollDetector extends EventDispatcher {

	constructor(node, options, debug = false) {
		super();

		// Events to listen for
		// enter
		// leave
		// enterTop
		// enterBottom
		// leaveTop
		// leaveBottom

		this.setSize = this.setSize.bind(this);

		this.node = node;
		this.debug = debug;
		this.size = DeviceInfo.GetSize();
		this.scroll = DeviceInfo.GetScroll();
		this.isWithin = false;
		this.fromBottom = false;
		this.fromTop = false;
		this.position = {
			top: 0,
			bottom: 0
		}
		// this.previousY = this.scroll.y; // Used for scroll direction
		// this.scrollDirection; // up, down


		// Options are used to tell where detection should START & STOP
		this.options = {
			offsetTop: this.size.y*0.3,
			offsetBottom: this.size.y*0.3, // this.size.y*0.5,
			triggerY: 0.5, // Can be a number between 0 and 1 defining the position of the trigger Y position in relation to the viewport height.
		}
		this.options = Object.assign(this.options, options); // Merge
		// console.log(this.options);

		// DEBUG - Draw visual lines for START & STOP
		this.debug = debug;
		if (this.debug) {
			if (document.getElementById('debug-center-line') === null) {
				// console.log('triggerY: ', this.options.triggerY);
				this.debugCenterTop = DOM.Create('div', {'id':'debug-center-line'});
				DOM.Style(this.debugCenterTop, {top: this.options.triggerY*this.size.y+'px', width:'30px', height: '2px', right: '0px', position: 'fixed', backgroundColor:'red'});
				document.body.appendChild(this.debugCenterTop);
			}

			this.debugLineTop = DOM.Create('div');
			this.debugLineBottom = DOM.Create('div');
			DOM.Style(this.debugLineTop, {top:0, width:'20px', height: '1px', right: '0px', position: 'absolute', backgroundColor:'green'});
			DOM.Style(this.debugLineBottom, {top:0, width:'20px', height: '1px', right: '0px', position: 'absolute', backgroundColor:'blue'});
			document.body.appendChild(this.debugLineTop);
			document.body.appendChild(this.debugLineBottom);
		}
		
		// Set size!
		window.requestAnimationFrame(this.setSize);

	}

	getNode() {
		return this.node;
	}

  update() {
		if (this.position === undefined) {
			console.log('issue?  ', this.position);
			return;
		}

		// Scroll position
		this.scroll = DeviceInfo.GetScroll();
		var adjustTriggerY = this.options.triggerY*this.size.y;
		let scrollY = this.scroll.y; // + adjustTriggerY;

		// // Check direction
		// let direction = scrollY > this.previousY ? 'down' : 'up';
    // if (this.scrollDirection && direction !== this.scrollDirection) {
		// 	this.scrollDirection = direction;
    // }

		var totalHeight = this.position.bottom - this.position.top; // Height between top and bottom bounds
		this.progress = (this.scroll.y-this.position.top)/totalHeight; // How far have we scrolled within bounds. 0-1 are within bounds
		// console.log('progress ', this.progress);

		// OUTSIDE - BOTTOM
		if (this.progress > 1) {
			if (this.isWithin === true) {
				this.fromBottom = true;
				this.fromTop = false;
				this.dispatchEvent({type:'leave', target:this});
				this.dispatchEvent({type:'leaveBottom', target:this});
				// if (this.debug) {console.log('LEAVE from bottom')}
			}
			this.isWithin = false;

		}
		// OUTSIDE - TOP
		else if (this.progress < 0) {
			if (this.isWithin === true) {
				this.fromBottom = false;
				this.fromTop = true;
				this.dispatchEvent({type:'leave', target:this});
				this.dispatchEvent({type:'leaveTop', target:this});
				// if (this.debug) {console.log('LEAVE from top')}
			}
			this.isWithin = false;

		}
		// INSIDE
		else {

			// TODO ANIMATION
			/* ------------------------------------------------------------------------------------------ */
			// investigate how to use requestAnimationFrame
			// this.dispatchEvent({type:'progressWithin', target:this});
			this.dispatchEvent({type:'progress', target:this});

			// Play
			// if (progress > 0) { // play from 0 to 1
			// 	this.tween.play();
			// } else { // play from 1 to 0
			//  this.tween.reverse();
			// }

			// go to a specific point in time
			if (this.tween) {

				// go smooth
				this.tween.tweenTo(this.progress * this.tween.duration());

				// just hard set it
				// this.tween.progress(progress).pause();

				// BUG When scrolling up from bottom, the animation start from wrong place
			}

			/* ------------------------------------------------------------------------------------------ */
 			if (this.isWithin === true) return;

			// BOTTOM
			if (this.progress >= 0.5) {
				this.fromBottom = true;
				this.fromTop = false;
				// if (this.debug) {console.log('enter from bottom')}
				this.dispatchEvent({type:'enterBottom', target:this});
			}
			// TOP
			else if (this.progress < 0.5) {
				this.fromBottom = false;
				this.fromTop = true;
				this.dispatchEvent({type:'enterTop', target:this});
				// if (this.debug) {console.log('enter from top')}
			}

			this.dispatchEvent({type:'enter', target:this}); // Send event
			this.isWithin = true; // Block multiple events firing
		}

		// // Scroll direciton - Save for next update
    // this.previousY = scrollY;
    // this.scrollDirection = direction;


	}

	// detector.setTween(TweenMax.to(this.h3), 1, {x: 400});
	setTween(node, duration, params) {

		var tween = TweenMax.to(node, duration, params);

		this.tween = new TimelineMax({smoothChildTiming: true});
		this.tween.add(tween);
		this.tween.pause();

		// // If no timeline
		// var this.tween = tween;
	}


	// ScrollDetector dosent have a "resize" event. This is handeled by parent class
	setSize(options) {
		this.size = DeviceInfo.GetSize();



		// Node position
		this.nodeTop = DOM.AbsoluteY(this.node);
		this.nodeHeight = this.node.offsetHeight;
		this.nodeBottom = this.nodeTop + this.nodeHeight;

		// Offset Top & Bottom - can be overwritten by parent
		this.options = Object.assign(this.options, options); // Merge

		// Position of START & STOP
		var adjustTriggerY = this.options.triggerY*this.size.y;
		this.position = {
			top: this.nodeTop - this.options.offsetTop - adjustTriggerY, //+ adjustTriggerY,
			bottom: this.nodeBottom + this.options.offsetBottom - adjustTriggerY
		}

		// Draw debug lines
		if (this.debug) {
			DOM.Style(this.debugLineTop, {top:this.position.top + adjustTriggerY +'px'});
			DOM.Style(this.debugLineBottom, {top: this.position.bottom + adjustTriggerY +'px'});
		}
		this.update();
	}

	destroy() {}

}

export default ScrollDetector;
