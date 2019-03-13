import {EventDispatcher} from './event-dispatcher';

export class AjaxRequest extends EventDispatcher {

	constructor(url, options) {

    super();
		
		this.onLoadComplete = this.onLoadComplete.bind(this);
		this.onProgress = this.onProgress.bind(this);
		
    this.progress = 0;
    this.url = url;
    this.request; // XMLHttpRequest
    this.options = {
      format: 'application/x-www-form-urlencoded', // application/json
      data: new Object(),
      type: 'POST', // GET
    }
    
		this.options = Object.assign(this.options, options); // TODO - IE fallback
	}

  getURL() {
    return this.url;
  }

  execute() {

    // Regular HTTP request
    this.request = new XMLHttpRequest();

    // Listen for async request state change
    this.request.onreadystatechange = this.onLoadComplete;
    this.request.onprogress = this.onProgress;
    // this.request.addEventListener("progress", this.onProgress);
    
    this.request.open(this.options.type, this.url, true);
    this.request.setRequestHeader('Content-Type', this.options.format); // 'application/x-www-form-urlencoded' || 'application/json'

    if (this.options.format === 'application/x-www-form-urlencoded') {
			var dataString = this.serializeUrl(this.options.data);
			this.request.send(dataString);
      
    } else if (this.options.format === 'application/json') {
      var dataString = JSON.stringify(this.options.data);
      this.request.send(dataString);
    }
  }

	serializeUrl(obj) {
		var str = [];
		for (var p in obj) {
			if (obj.hasOwnProperty(p)) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		}
		return str.join("&");
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
	
	
  kill() {
    this.request.onreadystatechange = null;
    this.request.onprogress = null;
    // this.request.removeEventListener("progress", this.onProgress);
  }

  destroy() {

    this.kill();
		this.progress = null;
		this.url = null;
		this.options = null;
		this.request = null;
  }

}

// export default AjaxRequest;
