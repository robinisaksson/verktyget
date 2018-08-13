import {DeviceInfo} from './device-info';
import {VideoLoader} from './video-loader';
import {EventDispatcher} from './event-dispatcher';

export class ResponsiveVideoLoader extends EventDispatcher {

  constructor(urls, sizes) {

    super();

    // BIND
    this.onVideoComplete = this.onVideoComplete.bind(this);

    // SIZE
    this.size = DeviceInfo.GetSize();
    this.urls = urls; // ['small.jpg', 'medium.jpg', 'large.jpg']
    this.sizes = sizes; // [767, 1024, 1280]

    if (this.urls.length !== this.sizes.length) {
      console.log('! Amount of Urls does not match amount of Sizes');
    }
    //
    // var l = url.length;
    // this.baseUrl = url.slice(0,l-4); // all except extension
    // this.format = url.substr(l-3); // last 3 characters
    //
    // // Order is important -> from BIG to SMALL!
    // if(mediaQueries === undefined) {
    //   this.mediaQueries = {
    //     'small': 767,
    //   }
    // } else {
    //   this.mediaQueries = mediaQueries;
    // }
    // // console.log('mediaQueries: ', this.mediaQueries);

    // LOADER
    this.videoLoader = new VideoLoader();
    this.videoLoader.addEventListener('complete', this.onVideoComplete)
  }

  getHTML() {
    return this.videoLoader.getHTML();
  }

  execute(containerWidth = 0, firstLoad = true) {

    // var devicePixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
    // var containerWidthRetina = containerWidth*devicePixelRatio;

    if (containerWidth === 0) {
			console.log('containerWidth is 0. Stop execute');
			return;
		}
		
    var i, url, newUrl;
    for (i = 0; url = this.urls[i]; i++) {
      if (containerWidth < this.sizes[i]) {
        newUrl = url;
        break;
      }
    }
    if (newUrl === undefined) {
      // console.log('Warning, image might be low-res. Node width: ', mediaWidth, '  Image width: ', this.sizes[this.sizes.length-1]);
			// console.log('newUrl === undefined');
      newUrl = this.urls[this.sizes.length-1];
    }
    
    if (this.url !== newUrl || firstLoad === true) {
      this.url = newUrl;
			console.log('Load video: ', url);
      this.videoLoader.setUrl(this.url);
      this.videoLoader.execute();
    }

  }

  onVideoComplete(event) {
    // Dispatch event
    // console.log(event.target.videoNode);
    this.video = event.target.videoNode;
    this.dispatchEvent({type:'complete', target:this});
  }


  updateSize(containerWidth) {
    
    // this.size = DeviceInfo.GetSize();
		
    this.execute(containerWidth, false);
  }
  
  destroy() {
    
  }
}

// export default ResponsiveVideoLoader;
