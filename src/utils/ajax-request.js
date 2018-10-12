import {EventDispatcher} from './event-dispatcher';

export class AjaxRequest extends EventDispatcher {

	constructor(url) {

    super();
		
		this.onLoadComplete = this.onLoadComplete.bind(this);
		this.onProgress = this.onProgress.bind(this);
		
    this.request;
    this.requestFormat = 'application/x-www-form-urlencoded'; //application/json
    this.progress = 0;

		this.url = url;
		this.requestData = new Object();
    this.requestType = 'GET';

	}

  getURL() {
    return this.url;
  }

  load() {

    // Regular HTTP request
    this.request = new XMLHttpRequest();

    // Listen for async request state change
    this.request.onreadystatechange = this.onLoadComplete;
    this.request.onprogress = this.onProgress;
    // this.request.addEventListener("progress", this.onProgress);

    var url = this.url;
    var requestDataString = '';

    this.request.open(this.requestType, url, true);
    this.request.setRequestHeader('Content-Type', this.requestFormat); // 'application/x-www-form-urlencoded'

    if (this.requestFormat === 'application/x-www-form-urlencoded') {
      this.request.send(requestDataString);
    } else if (this.requestFormat === 'application/json') {
      this.request.send(JSON.stringify(this.requestData));
    }
  }


  kill() {
    this.request.onreadystatechange = null;
    this.request.onprogress = null;
    // this.request.removeEventListener("progress", this.onProgress);
  }

  destroy() {

    this.kill();
    this.url = null;
    this.requestData = null;
    this.requestType = null;

  }


  onProgress(event) {
    if (event.lengthComputable === true) {
      this.progress = event.loaded / event.total;
      this.dispatchEvent({type:'progress', target:this});
    }
  }


  onLoadComplete(e) {

    if (this.request.readyState === 4) {

      if (this.request.status >= 200 && this.request.status < 400) {
				
        // Store html response
        this.htmlResponse = this.request.responseText;

        // Clear loader
        this.request.onreadystatechange = null;
        this.request.onprogress = null;
        // this.request.removeEventListener('progress', this.onProgress);

        // Dispatch event 'loaded' event
        this.dispatchEvent({type:'loaded', target:this});

      } else if (this.request.status > 400 || this.request.status === 0) {
        this.dispatchEvent({type:'error', target:this});
      }
    }
  }


}

// export default AjaxRequest;
