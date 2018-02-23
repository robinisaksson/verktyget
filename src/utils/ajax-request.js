import EventDispatcher from './event-dispatcher';

export class AjaxRequest extends EventDispatcher {

  // public static TYPE_GET:string = "GET";
  // public static TYPE_POST:string = "POST";

	constructor(url) {

    super();

    this.request; //:XMLHttpRequest;
    this.requestFormat = "application/x-www-form-urlencoded"; //application/json
    this.progress = 0;

		this.url = url;
		this.requestData = new Object();
    this.requestType = 'GET';

	}

  getURL() {
    return this.url;
  }

  load() {

    console.log('Load: ', this.url);

    // regular HTTP request
    this.request = new XMLHttpRequest();

    // listen for async request state change
    this.request.onreadystatechange = this.onLoadCompleteHandler.bind(this);
    this.request.onprogress = this.onProgressHandler.bind(this);
    // this.onProgressHandler = this.onProgressHandler.bind(this);
    // this.request.addEventListener("progress", this.onProgressHandler);

    var url = this.url;
    var requestDataString = ''; //URLUtility.URLEncodeObject(this.requestData);

    // if GET
    // if(this.requestType === 'GET') {
    //   //each variable has to be encodeURIComponent(value)
    //   url += (url.indexOf("?") === -1 ? "?" : "&")+requestDataString;
    //   requestDataString = null;
    // }

    this.request.open(this.requestType, url, true);
    this.request.setRequestHeader("Content-Type", this.requestFormat);//"application/x-www-form-urlencoded");

    if (this.requestFormat === "application/x-www-form-urlencoded") {
      this.request.send(requestDataString);
    } else if (this.requestFormat === "application/json") {
      this.request.send(JSON.stringify(this.requestData));
    }
  }


  kill() {
    this.request.onreadystatechange = null;
    this.request.onprogress = null;
    // this.request.removeEventListener("progress", this.onProgressHandler);
  }

  destroy() {

    this.kill();
    this.url = null;
    this.requestData = null;
    this.requestType = null;

  }


  onProgressHandler(event) {
    if (event.lengthComputable === true) {
      this.progress = event.loaded / event.total;
      this.dispatchEvent({type:'progress', target:this});
    }
  }


  onLoadCompleteHandler(e) {

    if (this.request.readyState === 4) {

      if (this.request.status >= 200 && this.request.status < 400) {

        // Store html response
        this.htmlResponse = this.request.responseText;

        // Clear loader
        this.request.onreadystatechange = null;
        this.request.onprogress = null;
        // this.request.removeEventListener('progress', this.onProgressHandlerBind);

        // Dispatch event, this must be the last call
        this.dispatchEvent({type:'complete', target:this});

      } else if (this.request.status > 400 || this.request.status === 0) {
          // error...

          this.dispatchEvent({type:'error', target:this});

      }
    }
  }

  onCompleteHandler(e) {
    // to be overwritten by the sub class
    console.log("on complete!");
    console.log(e);
  }

}

export default AjaxRequest;
