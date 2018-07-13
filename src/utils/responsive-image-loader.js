import {DeviceInfo} from "./device-info";
import {EventDispatcher} from './event-dispatcher';
import {ImageLoader} from './image-loader';


export class ResponsiveImageLoader extends EventDispatcher {

  constructor(urls, sizes) {

    super();
    this.onResponsiveImageLoaded = this.onResponsiveImageLoaded.bind(this);

    this.size = DeviceInfo.GetSize();
    this.urls = urls; // ['small.jpg', 'medium.jpg', 'large.jpg']
    this.sizes = sizes; // [767, 1024, 1280]

    if (this.urls.length !== this.sizes.length) {
      console.log('! Amount of Urls does not match amount of Sizes');
    }

    this.imageLoader = new ImageLoader();
    this.imageLoader.addEventListener('complete', this.onResponsiveImageLoaded);
  }

  //
  // urls = ['1.jpg', '2.jpg', '3.jpg']
  // sizes = [767, 1024, 1280]

  execute(containerWidth, firstLoad = true) {


    var devicePixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1; // TODO Check older browsers
    var mediaWidth = (containerWidth === undefined) ? this.size.x : containerWidth*devicePixelRatio; // Fallback to screen size

    var i, url, newUrl;
    for (i = 0; url = this.urls[i]; i++) {
      if (mediaWidth < this.sizes[i]) {
        newUrl = url;
        break;
      }
    }
    if (newUrl === undefined) {
      // console.log('Warning, image might be low-res. Node width: ', mediaWidth, '  Image width: ', this.sizes[this.sizes.length-1]);
      
      newUrl = this.urls[this.sizes.length-1];
    }
    // console.log(newUrl);
    if (this.url !== newUrl || firstLoad === true) {
      this.url = newUrl;
      this.imageLoader.setUrl(this.url);
      this.imageLoader.execute();
			// console.log('LOAD NEW URL: ', url);
    }
  }


  onResponsiveImageLoaded (event) {
    // this.image = event.target;
    // console.log('DISPATCH COMPLETE');
    this.dispatchEvent({type: 'complete', target: event.target});
  }


  updateSize(containerWidth) {
    this.execute(containerWidth, false);
  }

  destroy() {
		this.imageLoader.destroy();
    
    this.imageLoader.removeEventListener('complete')
    this.imageLoader = null;
 }

}
// export default ResponsiveImageLoader;
