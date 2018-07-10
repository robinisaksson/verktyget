import {EventDispatcher} from './event-dispatcher';

export class ImageLoader extends EventDispatcher {

	constructor(url) {
		super();
		this.url = url;
    this.data; // HTMLImageElement;

    this.onLoadCompleteHandler = this.onLoadCompleteHandler.bind(this);
    this.onLoadErrorHandler = this.onLoadErrorHandler.bind(this);
    this.onLoadErrorHandler = this.onLoadErrorHandler.bind(this);
	}

  setUrl(url) {
    if (this.data !== undefined) {
      this.removeEventListeners();
    }
    this.url = url;
  }

  execute() {

    // create img obj
    this.data = new Image();

    // success handler
    this.data.addEventListener("load", this.onLoadCompleteHandler);
    this.data.addEventListener("abort", this.onLoadErrorHandler);
    this.data.addEventListener("error", this.onLoadErrorHandler);// for now just use the same event handler for abort, what ever abort is?..

    // set source - starts loading
    this.data.src = this.url;
  }



  removeEventListeners() {

    this.data.removeEventListener("load", this.onLoadCompleteHandler);
    this.data.removeEventListener("abort", this.onLoadErrorHandler);
    this.data.removeEventListener("error", this.onLoadErrorHandler);
  }



    // onLoadCompleteHandlerBind = this.onLoadCompleteHandler.bind(this);
	onLoadCompleteHandler(event) {

    this.removeEventListeners();
    
    //this.image = e.target;

    // Dispatch event, this must be the last call
    this.dispatchEvent({type: 'complete', target:this});
	}

  // onLoadErrorHandlerBind = this.onLoadErrorHandler.bind(this);
  onLoadErrorHandler(event) {

    this.cancelLoading();

    console.log("image failed to load!");
    console.log(event);
    // throw new Error("Image failed to load.");

    // Dispatch event, this must be the last call
    this.dispatchEvent({type: 'error', target:this});

  }

  cancelLoading() {

    this.removeEventListeners();

    // Cancel loading..
    this.data.src = "";
    this.data.removeAttribute("src");
    this.data = null;
  }

  destroy() {

    if (this.data !== null) {
      this.cancelLoading();
      this.url = null;
    }
  }
}

// export default ImageLoader;
