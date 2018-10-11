import {EventDispatcher} from './event-dispatcher';

export class ImageLoader extends EventDispatcher {

  constructor(url, sizes = undefined) {
		
		super();
    
    this.onLoadComplete = this.onLoadComplete.bind(this);
    this.onLoadError = this.onLoadError.bind(this);
    this.onLoadError = this.onLoadError.bind(this);
    
    this.image; // ImageNode
    this.url; // URL to load
    this.urls = Array.isArray(url) ? url : [url]; // string OR array - 'image.jpg' OR ['small.jpg', 'medium.jpg', 'large.jpg']
    this.sizes = sizes; // [767, 1024, 1280]
    
    if (this.urls.length > 1 && this.urls.length !== this.sizes.length) {
      console.log('Warning, please check that amount of URLs match amount of Sizes');
    }
	}
  
  execute(containerWidth = 0) {
    
    // No sizes, use first url
    if (this.sizes === undefined) {
      urlToLoad = this.urls[0];
    }
    // Mutiple sizes
    else {
      var i, url, urlToLoad;
      for (i = 0; url = this.urls[i]; i++) {
        if (containerWidth < this.sizes[i]) {
          urlToLoad = url;
          break;
        }
      }
      // conatinerWidth is larger than image size
      if (urlToLoad === undefined) {
        // console.log('Warning, image might be low-res. Node width: ', containerWidth, '  Image width: ', this.sizes[this.sizes.length-1]);
        urlToLoad = this.urls[this.sizes.length-1];
      }
    }
    
    if (this.url !== urlToLoad) {
      
      // this.imageLoader.setUrl(this.url);
      if (this.image !== undefined) {
        this.removeEventListeners();
      }
      this.url = urlToLoad;
      
      // this.imageLoader.execute();
      this.image = new Image();

      this.image.addEventListener("load", this.onLoadComplete);
      this.image.addEventListener("abort", this.onLoadError);
      this.image.addEventListener("error", this.onLoadError);// for now just use the same event handler for abort, what ever abort is?..

      // Starts loading
      this.image.src = this.url;
    }
  }

  updateSize(containerWidth = 0) {
    this.execute(containerWidth, false);
  }

  removeEventListeners() {
		
    this.image.removeEventListener("load", this.onLoadComplete);
    this.image.removeEventListener("abort", this.onLoadError);
    this.image.removeEventListener("error", this.onLoadError);
  }

	onLoadComplete(event) {

    this.removeEventListeners();
    this.dispatchEvent({type: 'complete', target: this});
	}

  onLoadError(event) {

    this.cancelLoading();
    console.log("image failed to load ", event);
    // throw new Error("Image failed to load.");

    this.dispatchEvent({type: 'error', target:this});
  }

  cancelLoading() {

    this.removeEventListeners();
		
    this.image.src = "";
    this.image.removeAttribute("src");
    this.image = undefined;
  }
  
  destroy() {

    if (this.image !== null) {
      this.cancelLoading();
      this.url = undefined;
      this.urls = undefined;
      this.sizes = undefined;
    }
  }
}

export default ImageLoader;
