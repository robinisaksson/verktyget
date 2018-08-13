
import {EventDispatcher} from './event-dispatcher';
import {DeviceInfo} from './device-info';

export class VideoLoader extends EventDispatcher {

  constructor(url) {

    super();
    
    // Bind
    this.onMetaDataComplete = this.onMetaDataComplete.bind(this);
    this.onLoadComplete = this.onLoadComplete.bind(this);
    this.onLoadError = this.onLoadError.bind(this);
    // this.onLoadProgress = this.onLoadProgress.bind(this);


    if (url !== undefined) {
      this.url = url;
    }
    
    this.videoNode = document.createElement("video");

    // Events
    this.videoNode.addEventListener("loadedmetadata", this.onMetaDataComplete); // can play the whole video (if download speed is constant)
    this.videoNode.addEventListener("error", this.onLoadError); // on Error
    
    // TODO - implement this solution instead: https://stackoverflow.com/questions/5138077/html5-video-file-loading-complete-event
    // this.videoNode.addEventListener("progress", this.onLoadProgress);
    
    // Autoplay option?
    // this.autoPlayOnMobile = true;
    // // Add attribute for mobile auto-play
    // if (this.autoPlayOnMobile === true && DeviceInfo.IsMobile() === true) {
    //   this.videoNode.setAttribute('muted'); // No value required
    //   this.videoNode.setAttribute('playsinline');
    //   this.videoNode.setAttribute('webkit-playsinline');
    // }
    
  }

  getHTML() {
    return this.videoNode;
  }

  setUrl(url) {
    this.url = url;
  }

  execute() {
    if (this.url === undefined) {
      console.log('no video url');
      return;
    }

    // Listen, set src, load
    this.videoNode.addEventListener("canplaythrough", this.onLoadComplete); // can play the whole video (if download speed is constant)
    this.videoNode.src = this.url; // set source
    this.videoNode.load(); // starts loading
  }

  
  // onLoadProgress(event) {
  // 
  //   if (this.videoNode.buffered.length !== 0) {
  //     var endTime = this.videoNode.buffered.end(0);
  //     var currentProgress = ((endTime / this.videoNode.duration) * 100);
  // 
  //     this.dispatchEvent({type:"progress", target: currentProgress});
  //   }
  // }

  onMetaDataComplete(event) {
    this.dispatchEvent({type:"loadedmetadata", target:this});
  }

  onLoadComplete(event) {

    this.videoNode.removeEventListener("canplaythrough", this.onLoadComplete);
    
    this.dispatchEvent({type:'complete', target:this});
  }

  onLoadError(event) {

    // TODO: ios7 fails here.
    console.log("Video failed to load. ", event);

    this.destroy();

    this.dispatchEvent({type:'Error', target:this});
  }

  

  destroy() {

    
    // Since the task is done when CanPlayThrough is fired, then we need cancel the loading at this point..
    if (this.videoNode !== undefined) {

      // Cancel loading..
      this.videoNode.pause();
      this.videoNode.src = "";
      this.videoNode.load();
      this.videoNode.removeAttribute("src");
      this.videoNode = undefined;
    }
    
    this.videoNode.removeEventListener("loadedmetadata", this.onMetaDataComplete);
    this.videoNode.removeEventListener("canplaythrough", this.onLoadComplete);
    this.videoNode.removeEventListener("error", this.onLoadError);
    // this.videoNode.removeEventListener("progress", this.onLoadProgress);

    this.url = null;
  }
}
