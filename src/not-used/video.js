
import EventDispatcher from './event-dispatcher';
import DOM from './dom';
import DeviceInfo from './device-info';
import VideoLoader from './video-loader';
import ResponsiveVideoLoader from './responsive-video-loader';
import ImageLoader from './image-loader';


export class Video extends EventDispatcher {


  constructor(node, urls, sizes, options) {

    super();
    /*
    node = outer container div
    urls = [small.mp4, medium.mp4, large.mp4]
    sizes = [320, 720, 1280]
    options = {
      autoplay:true,
      loop:true,
      videoAspect: 16/9,
      size: 'cover' || 'contain '
    }
    */
    this.onVideoLoaded = this.onVideoLoaded.bind(this);
    this.onCoverLoaded = this.onCoverLoaded.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onVideoEnded = this.onVideoEnded.bind(this);
    this.onUpdateTime = this.onUpdateTime.bind(this);


    this.size = DeviceInfo.GetSize();
    this.urls = urls; // ['small.jpg', 'medium.jpg', 'large.jpg']
    this.sizes = sizes; // [767, 1024, 1280]
    this.node = node;
    this.width = this.node.offsetWidth;
    
    if (this.urls.length !== this.sizes.length) {
      console.log('! Amount of Urls does not match amount of Sizes');
    }

    // Options are used to tell where detection should START & STOP
    this.options = {
      autoplay: true,
      loop: true,
      videoAspect: 16/9,
      containerAspect: this.node.offsetWidth/this.node.offsetHeight, // this.size.x/this.size.y,
      size: 'cover', // cover, contain
      volume: 0,
    }
		this.options = Object.assign(this.options, options); // Merge

    // Video loader
    this.videoLoader = new ResponsiveVideoLoader(this.urls, this.sizes);
    this.videoLoader.addEventListener('complete', this.onVideoLoaded);

    // bajs
    // window.requestAnimationFrame(this.setSize);
    // this.setSize()
  }


  execute(nodeWidth, firstLoad = true) {

    // Add video
    this.videoNode = this.videoLoader.getHTML();
    this.videoLoader.execute(this.videoNode.offsetWidth);

    this.videoNode.volume = this.options.volume;
    if (this.options.loop === true) this.videoNode.loop = true;
    if (this.autoplay === true) this.videoNode.autoplay = true;

    this.videoNode.addEventListener('play', this.onPlay);
    this.videoNode.addEventListener('pause', this.onPause);
    this.videoNode.addEventListener('ended', this.onVideoEnded);
    this.videoNode.addEventListener('timeupdate', this.onUpdateTime);
  }

  setCover(urls, sizes) {
    
    console.log('SetCover function not ');
    // this.coverUrl = url;
    //
    // // Cover
    // this.coverNode = DOM.Create('div', {"class":'video-cover'});
    // DOM.Style(this.coverNode, {width:this.width+'px', height:this.height+'px'});
    //
    // this.imageLoader = new ImageLoader(this.coverUrl);
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

    this.autoplay = true;
    if (this.videoNode !== undefined) {
      this.videoNode.autoplay = true;
    }
  }

  setLoop(isLooping) {
    this.isLooping = isLooping;
    if (this.videoNode !== undefined) {
      this.videoNode.loop = isLooping;
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
    this.volume = volume;
    if (this.videoNode !== undefined) {
      this.videoNode.volume = volume;
    }
  }
  getVolume() {
    //return this.videoNode.volume;
    return this.volume;
  }
  toggleVolume() {

    if (this.getVolume() > 0) {
      // mute
      this.setVolume(0);
    } else {
      // unmute
      this.setVolume(this.volume); // same as before muting?
    }
  }


  setVideoSize(size) {
    this.options.size = size;
    this.setSize();
  }



  setSize() {

    this.size = DeviceInfo.GetSize();
    // this.isMobile = this.size.x < 767 ? true : false;
    var width = this.node.offsetWidth;
    var height = this.node.offsetHeight;
    var as = width/height;

    // Portrait
    if (as > this.options.videoAspect && this.options.size === 'conatain' || as < this.options.videoAspect && this.options.size === 'cover') {
      var marginLeft = Math.round(((height*this.options.videoAspect) - width) / 2);
      var width = Math.round(this.options.videoAspect*height); // (16/9)*1080 = 1920
      DOM.Style(this.videoNode, {width: width+'px', height:height+'px', marginLeft:-marginLeft+'px', marginTop:'0px'});
    }
    // Landscape
    else {
      var videoHeight = Math.round(width/this.options.videoAspect); // 1920/(16/9) = 1080
      var marginTop = (height/2) - (videoHeight/2) // videoHeight/2 - window.height/2;
      DOM.Style(this.videoNode, {width: width+'px', height: videoHeight+'px', marginLeft:'0px', marginTop: marginTop+'px'});
    }

    this.videoLoader.setSize(width);

    // if (cover) {
    //   this.imageLoader.updateSize();
    //   DOM.Style(this.coverNode, {width:this.width+'px', height:this.height+'px'});
    // }
  }



  // ------------------ Private functions ---------------------------
  onVideoLoaded(event) {
    console.log('onVideoLoaded ', this.width);
    this.setSize(this.width);
    this.dispatchEvent({type:'complete', target:this});
  }

  onCoverLoaded(event) {
    console.log('onCoverLoaded ');
    DOM.Style(this.coverNode, {backgroundImage: 'url('+this.coverUrl+')'});
    this.dispatchEvent({type:'cover-complete', target:this});
  }


  onVideoEnded() {

    if (this.isLooping === true) {
      //this.seekTo(0);
      //this.play();
      return;
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
