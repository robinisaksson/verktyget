import {EventDispatcher} from './event-dispatcher';


function URLEncodeObject(o) {
	var p = [];
	for(var i in o) {
		p.push(i+"="+encodeURIComponent(o[i]));
	}
	return p.join("&");
}

var callbackCount = 0;


export class JSONPRequest extends EventDispatcher {

	constructor(url, data, callbackPropertyName) {

		super();

		this.onJSONPComplete = this.onJSONPComplete.bind(this);

		callbackPropertyName = callbackPropertyName || 'callback';

		var seperator = "?";
		if(url.indexOf("?") > -1) {
			seperator = "&";
		}

		var callbackValue = "JSONP"+callbackCount++;
		window[callbackValue] = this.onJSONPComplete;
		data[callbackPropertyName] = callbackValue;

		this.url = url+seperator+URLEncodeObject(data);

	}



	getURL() {
		return this.url;
	}


	load() {

		// create script tag
		this.scriptElement = document.createElement("script");
		this.scriptElement.type = "text/javascript";
		this.scriptElement.src = this.url;

		document.getElementsByTagName("head")[0].appendChild(this.scriptElement);
	}


	onJSONPComplete(data) {

		this.data = data;
		this.dispatchEvent({type:'complete', target:this});

	}

}

// export default JSONPRequest;
