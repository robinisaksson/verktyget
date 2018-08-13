
import {EventDispatcher} from './event-dispatcher';
import {DOM} from './dom';
import {VideoLoader} from './video-loader';
import {ImageLoader} from './image-loader';
import {ResponsiveVideoLoader} from './responsive-video-loader';

export class Video extends EventDispatcher {


  constructor(containerNode, urls, sizes, options) {

    super();
    /*
    node = outer container div
    urls = [small.mp4, medium.mp4, large.mp4]
    sizes = [320, 720, 1280]
    options = {
      autoplay:true,
      loop:true,
      videoAspect: 4/3,
      containerAspect: 16/9,
      size: 'cover' || 'contain '
    }
    */
    this.onVideoLoaded = this.onVideoLoaded.bind(this);
    this.onCoverLoaded = this.onCoverLoaded.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onVideoEnded = this.onVideoEnded.bind(this);
    this.onUpdateTime = this.onUpdateTime.bind(this);


    this.urls = urls; // ['small.jpg', 'medium.jpg', 'large.jpg']
    this.sizes = sizes; // [767, 1024, 1280]
    this.containerNode = containerNode;
    this.width = this.containerNode.offsetWidth;
		this.height; // used in setSize
		this.isFirstLoad = true;
    
    if (this.urls.length !== this.sizes.length) {
      console.log('! Amount of Urls does not match amount of Sizes');
    }

    // Deafult Options - override with constructor {options}
    this.options = {
      autoplay: true,
      loop: true,
      videoAspect: 16/9,
      containerAspect: undefined,
      size: 'cover', // cover, contain
      volume: 0,
    }
		this.options = Object.assign(this.options, options); // Merge
		
    // Video loader
    this.videoLoader = new ResponsiveVideoLoader(this.urls, this.sizes);
    this.videoLoader.addEventListener('complete', this.onVideoLoaded);
    
		// Element <video>
		this.videoNode = this.videoLoader.getHTML();
		
		// Autoplay
		if (this.options.autoplay === true) {
			this.videoNode.setAttribute('muted', 'true');
			this.videoNode.setAttribute('playsinline', '1');
			this.videoNode.setAttribute('autoplay', 'true');
			this.videoNode.volume = 0;
			
		}
		// Volume
		else {
			this.videoNode.volume = this.options.volume;
		}
		
		// Loop
    if (this.options.loop === true) this.videoNode.setAttribute('loop', 'true');
		
  }


  execute() {

    // Add video
    this.videoLoader.execute(this.width);

    this.videoNode.addEventListener('play', this.onPlay);
    this.videoNode.addEventListener('pause', this.onPause);
    this.videoNode.addEventListener('ended', this.onVideoEnded);
    this.videoNode.addEventListener('timeupdate', this.onUpdateTime);
  }

  setCover(urls, sizes) {
    
    // TODO!
    console.log('Todo - setCover function');
    // this.coverUrl = url;
    //
    // // Cover
    // this.coverNode = DOM.Create('div', {"class":'video-cover'});
    // DOM.Style(this.coverNode, {width:this.width+'px', height:this.height+'px'});
    //
    // this.imageLoader = new ImageLoader([this.coverUrl]);
    // this.imageLoader.addEventListener('complete', this.onCoverLoaded);
    // this.imageLoader.execute();
    // // console.log('imageLoader: ', this.imageLoader)
  }

  executeCover() {
  }



  // ---------------------------- Public functions ----------------------------

  // getHTML() {}

  makeAutoplay() {

    // Mobile autoplay works when:
    // volume: 0
    // playsinline: 1

    this.options.autoplay = true;
    if (this.videoNode !== undefined) {
      this.videoNode.setAttribute('autoplay', 'true');
			this.videoNode.setAttribute('volume', '0');
			this.videoNode.setAttribute('playsinline', '1');
			this.videoNode.play();
    }
  }

  setLoop(loop) {
    this.options.loop = loop;
		
    if (this.videoNode !== undefined) {
			this.videoNode.setAttribute('loop', 'true');
    }
  }
  play() {
    if (this.videoNode !== undefined) {
      this.videoNode.play();
    }
  }
  pause() {
    if (this.videoNode !== undefined) {
      this.videoNode.pause();
    }
  }
  togglePlayPause() {
    if (this.isPlaying() === true) {
      this.pause();
    } else {
      this.play();
    }
  }

  stop() {
    // same as pause but seeks to '0'
    this.videoNode.pause();
    this.seekTo(0);
  }
  seek(value) {
    this.videoNode.currentTime = value;
  }
  isPlaying() {
    return this.videoNode.paused ? false : true;
  }
  getDuration() {
    return this.videoNode.duration;
  }

  getCurrentTime() {
    return this.videoNode.currentTime;
  }

  setVolume(volume) {
    this.options.volume = volume;
    if (this.videoNode !== undefined) {
      this.videoNode.volume = volume;
    }
  }
  getVolume() {
    return this.options.volume;
  }
  toggleVolume() {

    if (this.getVolume() > 0) {
      // mute
      this.setVolume(0);
    } else {
      // unmute
      this.setVolume(this.options.volume); // same as before muting
    }
  }
	setContainerAspect(as) {
		this.options.containerAspect = as;
	}
	setVideoAspect(as) {
		this.options.videoAspect = as;
	}
	

  // setVideoSize(size) {
  //   this.options.size = size;
  //   this.setSize();
  // }



  setSize() {
    
		this.width = this.containerNode.offsetWidth; // Determines video width and if we should load new asset onResize
		
    
    // Only Scale & Position video within container if we have containerAspect
    if (this.options.containerAspect !== undefined) {
      
      this.height = this.containerNode.offsetHeight;
			if (this.height === 0) {
				console.log('video container height 0. Maybe its "position:absolute"?');
			}
			
			// TODO set overflow:hidden on Container??
			
			// 4 different scenarios depending on Cover vs Contain && if container-aspect vs video-aspect is Wider or Taller
      // Portrait (taller) + Contain
			// Landscape (wider) + Cover
			if (this.options.containerAspect >= this.options.videoAspect && this.options.size === 'cover' || this.options.containerAspect <= this.options.videoAspect && this.options.size === 'contain') {
				
				var height = Math.round(this.width/this.options.videoAspect); // 1920/(16/9) = 1080
        var marginTop = (this.height/2) - (height/2) // height/2 - window.height/2;
        DOM.Style(this.videoNode, {width: this.width+'px', height: height+'px', marginLeft:'0px', marginTop: marginTop+'px'});
      }
      // Landscape (wider) + Contain
			// Portrait (taller) + Cover
      else if (this.options.containerAspect < this.options.videoAspect && this.options.size === 'cover' || this.options.containerAspect > this.options.videoAspect && this.options.size === 'contain') {
				
				var marginLeft = Math.round(((this.height*this.options.videoAspect) - this.width) / 2);
        var width = Math.round(this.options.videoAspect*this.height); // (16/9)*1080 = 1920
        DOM.Style(this.videoNode, {width: width+'px', height: this.height+'px', marginLeft: -marginLeft+'px', marginTop:'0px'});
      }
    }
   
		// Dont trigger updateSize onfirst load since it will load video twice
		// Dont update size if we only have one source
		if (this.isFirstLoad !== true || this.urls.length > 1) {
			this.videoLoader.updateSize(this.width);
		}
		
    // if (cover) {
    //   this.imageLoader.updateSize();
    //   DOM.Style(this.coverNode, {width:this.width+'px', height:this.height+'px'});
    // }
  }



  // ------------------ Private functions ---------------------------
  onVideoLoaded(event) {
		
		this.setSize();
		
		// Add video to DOM
		if (this.isFirstLoad === true) {
			DOM.Add(this.videoNode, this.containerNode);
		}
		
		this.isFirstLoad = false;
		this.dispatchEvent({type:'complete', target:this});
  }

  onCoverLoaded(event) {
    console.log('onCoverLoaded ');
    DOM.Style(this.coverNode, {backgroundImage: 'url('+this.coverUrl+')'});
    this.dispatchEvent({type:'cover-complete', target:this});
  }


  onVideoEnded() {

    if (this.options.loop === true) {
      //this.seekTo(0);
      //this.play();
    }

    if (this.coverNode !== undefined) {
      DOM.Style(this.coverNode, {visibility:'visible'});
    }
    this.dispatchEvent({type:'ended', target:this});
  }

  onUpdateTime() {
    this.dispatchEvent({type:'timeupdate', target:this});
  }


  onPlay() {
    if (this.coverNode !== undefined) {
      DOM.Style(this.coverNode, {visibility:'hidden'});
    }

    this.dispatchEvent({type:'play', target:this});
  }

  onPause() {
    if (this.coverNode !== undefined) {
      DOM.Style(this.coverNode, {visibility:'visible'});
    }
    this.dispatchEvent({type:'pause', target:this});
  }


  revert() {
    
    this.videoLoader.destroy();
    
    this.videoNode.removeEventListener('play', this.onPlay);
    this.videoNode.removeEventListener('pause', this.onPause);

    this.videoNode.removeEventListener('ended', this.onVideoEnded);
    this.videoNode.removeEventListener('timeupdate', this.onUpdateTime);
  }


  destroy() {

    // console.log("VideoPlayback::destroy");
    this.revert();
    super.destroy();
  }

}


// export default Video;
