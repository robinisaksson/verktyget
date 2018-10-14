
import {EventDispatcher} from './event-dispatcher';
import {DeviceInfo} from './device-info';
import {DOM} from './dom';
import {Lerp} from './math';

export class ScrollDetector extends EventDispatcher {

	constructor(node, options) {
		super();

		// Events to listen for
		// enter
		// leave
		// enterTop
		// enterBottom
		// leaveTop
		// leaveBottom
		
		if (node === undefined) {
			console.log('Node is required for Scroll Detection to work');
			return;
		}
		
		// Bind events
		this.runUpdate = this.runUpdate.bind(this);
		this.runSetSize = this.runSetSize.bind(this);
		
		// Var
		this.setSize = this.setSize.bind(this);
		// this.refresh = this.refresh.bind(this);
		this.size = DeviceInfo.GetSize();
		this.scroll = DeviceInfo.GetScroll();
		this.node = node;
		this.isWithin = true; // fires events first time: outside-top, outside-bottom, inside
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
			useAnimation: false,
			offsetStart: 0, // offset start position
			offsetEnd: 0, // offset end position
			triggerY: 0.5, // Can be a number between 0 and 1 defining the position of the trigger Y position in relation to the viewport height.
			debug: false,
			
			// Extend?
			// refreshInterval: 100
		}
		this.options = Object.assign(this.options, options); // Merge


		// DEBUG - Draw visual lines for START & STOP
		// ------------------------------------------------------------------------------------------------------------
		this.debug = this.options.debug;
		if (this.debug) {
			this.debugLineTop = DOM.Create('div');
			this.debugLineBottom = DOM.Create('div');
			this.debugCenterTop = DOM.Create('div');
			DOM.Style(this.debugLineTop, {top:0, width:'20px', height: '1px', right: '0px', position: 'absolute', backgroundColor:'green'});
			DOM.Style(this.debugLineBottom, {top:0, width:'20px', height: '1px', right: '0px', position: 'absolute', backgroundColor:'blue'});
			DOM.Style(this.debugCenterTop, {top: this.options.triggerY*this.size.y+'px', width: '30px', height: '2px', right: '0px', position: 'fixed', backgroundColor:'red'});
			
			document.body.appendChild(this.debugLineTop);
			document.body.appendChild(this.debugLineBottom);
			document.body.appendChild(this.debugCenterTop);
		}
		// ------------------------------------------------------------------------------------------------------------
		
		// this.scheduleRefresh();
		// window.requestAnimationFrame(this.setSize);
		this.setSize();
	}

	getNode() {
		return this.node;
	}
	
	getProgress() {
		return this.progress;
	}
	
	getDuration() {
		return this.position.bottom - this.position.top;
	}
	
	
  update() {
		window.requestAnimationFrame(this.runUpdate); // Delay update 1 frame
	}
	
	runUpdate() {
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
				
				// Update progress animation so it start from the end
				if (this.options.useAnimation === true) {
					this.progress = 1;
					this.dispatchEvent({type:'progress', target:this});
				}
				this.dispatchEvent({type:'leave', target:this});
				this.dispatchEvent({type:'leaveBottom', target:this});
				// if (this.debug) {console.log('LEAVE from bottom')}
			}
			this.isWithin = false;

		}
		// OUTSIDE - TOP
		else if (this.progress < 0) {
			if (this.isWithin === true) {
				console.log('outside top: ', this.progress);
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

			// USE ANIMATION
			/* ------------------------------------------------------------------------------------------ */
			if (this.options.useAnimation === true) {
				this.progressTarget = this.progress;
		    this.onProgressRAF(); // Run requestAnimationFrame
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

		// console.log('update');
	}

	// get element position (optionally relative to viewport)
	getNodePosition(node, relativeToViewport = true) {
		var pos = {
			top: 0,
			left: 0,
			width: 0,
			height: 0
		};

		var rect = node.getBoundingClientRect();
		pos.top = rect.top;
		pos.left = rect.left;
		pos.height = rect.height;
		pos.width = rect.width;
		
		if (relativeToViewport === true) { 
			pos.top += this.scroll.y;
			pos.left += this.scroll.x;
		}

		return pos;
	};
	

	onProgressRAF() {

		const dif = (this.progressTarget - this.progress);
		if (Math.abs(dif) > 0.001) {
			this.progress = Lerp(this.progress, this.progressTarget, 0.01);
			this.raf = window.requestAnimationFrame(this.onProgressRAF);
		} else {
			this.progress = this.progressTarget;
			window.cancelAnimationFrame(this.raf);
		}

		// Update tween!
		// console.log('progress: ', this.progress);
		this.dispatchEvent({type:'progress', target:this});
	}
	
	
	
	
	// // TODO - Use a interval to reset values, until they are the same of X amount of iterations.
	// refresh() {
	// 	console.log('run refresh!');
	// 	this.setSize();
	// }
	// 
	// scheduleRefresh() {
	// 	console.log(this.options.refreshInterval);
	// 	if (this.options.refreshInterval > 0) {
	// 		this.refreshTimeout = window.setTimeout(this.refresh, this.options.refreshInterval);
	// 	}
	// };



	// ScrollDetector dosent have a "resize" event. You need to call setSize in your project code
	setSize(options) {
		
		// Offset Top & Bottom - can be overwritten by parent
		if (options) {
			this.options = Object.assign(this.options, options); // Merge
		}
		
		var runSetSize = this.runSetSize;
		window.setTimeout(function() { runSetSize(); }, 100);
		// window.requestAnimationFrame(this.runSetSize); // Delay setSize 1 frame - not enough!
	}
	
	runSetSize() {
		this.size = DeviceInfo.GetSize();

		// Node position
		// OLD way of messeure node position
		this.nodeTop = DOM.AbsoluteY(this.node);
		this.nodeHeight = this.node.offsetHeight;
		this.nodeBottom = this.nodeTop + this.nodeHeight;

		// var pos = this.getNodePosition(this.node)
		// this.nodeTop = pos.top;
		// this.nodeHeight = pos.height;
		// this.nodeBottom = pos.top + pos.height;
		

		// // Position of START & STOP
		var adjustTriggerY = this.options.triggerY*this.size.y;
		this.position = {
			top: this.nodeTop - this.options.offsetStart - adjustTriggerY,
			bottom: this.nodeBottom + this.options.offsetEnd - adjustTriggerY
		}
		
		// Draw debug lines
		if (this.debug === true) {
			DOM.Style(this.debugLineTop, {top:this.position.top + adjustTriggerY +'px'});
			DOM.Style(this.debugLineBottom, {top: this.position.bottom + adjustTriggerY +'px'});
			DOM.Style(this.debugCenterTop, {top: this.options.triggerY*this.size.y+'px'});
		}
		
		this.update();
	}

	destroy() {
		// window.clearTimeout(this.refreshTimeout);
	}

}

// export default ScrollDetector;
