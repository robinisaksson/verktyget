// import {EventDispatcher} from './event-dispatcher';
// 
// export class ImageLoader extends EventDispatcher {
// 
// 	constructor(url) {
// 		super();
// 		this.url = url;
//     this.imageNode; // HTMLImageElement;
// 
//     this.onLoadCompleteHandler = this.onLoadCompleteHandler.bind(this);
//     this.onLoadErrorHandler = this.onLoadErrorHandler.bind(this);
//     this.onLoadErrorHandler = this.onLoadErrorHandler.bind(this);
// 	}
// 
//   setUrl(url) {
//     if (this.imageNode !== undefined) {
//       this.removeEventListeners();
//     }
//     this.url = url;
//   }
// 
//   execute() {
// 
//     // create img obj
//     this.imageNode = new Image();
// 
//     // success handler
//     this.imageNode.addEventListener("load", this.onLoadCompleteHandler);
//     this.imageNode.addEventListener("abort", this.onLoadErrorHandler);
//     this.imageNode.addEventListener("error", this.onLoadErrorHandler);// for now just use the same event handler for abort, what ever abort is?..
// 
//     // set source - starts loading
//     this.imageNode.src = this.url;
//   }
// 
// 
// 
//   removeEventListeners() {
// 
//     this.imageNode.removeEventListener("load", this.onLoadCompleteHandler);
//     this.imageNode.removeEventListener("abort", this.onLoadErrorHandler);
//     this.imageNode.removeEventListener("error", this.onLoadErrorHandler);
//   }
// 
// 
// 
//     // onLoadCompleteHandlerBind = this.onLoadCompleteHandler.bind(this);
// 	onLoadCompleteHandler(event) {
// 
//     this.removeEventListeners();
// 
//     //this.image = e.target;
// 
//     // Dispatch event, this must be the last call
//     this.dispatchEvent({type: 'complete', target:this.imageNode});
// 	}
// 
//   // onLoadErrorHandlerBind = this.onLoadErrorHandler.bind(this);
//   onLoadErrorHandler(event) {
// 
//     this.cancelLoading();
// 
//     console.log("image failed to load!");
//     console.log(event);
//     // throw new Error("Image failed to load.");
// 
//     // Dispatch event, this must be the last call
//     this.dispatchEvent({type: 'error', target:this});
// 
//   }
// 
//   cancelLoading() {
// 
//     this.removeEventListeners();
// 
//     // Cancel loading..
//     this.imageNode.src = "";
//     this.imageNode.removeAttribute("src");
//     this.imageNode = null;
//   }
// 
//   destroy() {
// 
//     if (this.imageNode !== null) {
//       this.cancelLoading();
//       this.url = null;
//     }
//   }
// }
// 
// // export default ImageLoader;
