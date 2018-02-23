// UTILS
import EventDispatcher from './event-dispatcher';

class YoutubePlayer extends EventDispatcher {
  
  constructor(id, options) {
    
    super();
    
    this.iframe = document.createElement("iframe");
    this.videoId = id;
    this.iframeID = Math.floor(Math.random() * 10000)
    this.volume = 0;
    this.isPlaying = false;
    
    // Bind event
    this.handleMessage = this.handleMessage.bind(this);
    
    // Merge options
    var stdOptions = {
      autohide: 2,
      autoplay: 0,
      controls: 1,
      disablekb: 0,
      enablejsapi: 1,
      fs: 1,
      iv_load_policy: 1,
      loop: 0,
      rel: 1,
      showinfo: 1,
      wmode: "transparent",
      list: "",
      listType: ""
    }
    this.options = Object.assign(stdOptions, options);
    // console.log("options: ", this.options);
    
    // Create player options string
    var key, paramStr = "";
    for (var key in this.options) {
      if (this.options.hasOwnProperty(key)) {
        // console.log("iframe:     " + key + " -> " + this.options[key]);
        paramStr += key+"="+this.options[key]+"&";
      }
    }
    
    
    this.url = "https://www.youtube.com/embed/"+this.videoId+"?"+paramStr;
    this.iframe.setAttribute("frameborder", "0");
    
    if (this.options.fs === 1) {
      this.iframe.setAttribute("allowfullscreen", "true");
      this.iframe.setAttribute("mozallowfullscreen", "true");
      this.iframe.setAttribute("webkitallowfullscreen", "true");
    }
    
  }
  
  execute() {
    window.addEventListener("message", this.handleMessage);
    this.iframe.setAttribute("src", this.url);
    
    // The poller is a task running through a repetitive timer that send a "listening" message
    // to the local iframe until it returns a ready state
    // That is a specification from Youtube iframe post message API
    this.poller = setInterval(function() {
      this.send("listening")
    }.bind(this), 250);
  }
  
  
  
  /*
  That is where we handle messages from the iframe
  Youtube Player state are defined by a single digit
  (see API)
  0: Stop
  1: Play
  2: Pause
  3: Buffering
  5: Cueing
  Those states are attached to the property data.info.playerState
  
  Only the ready state is sent through data.event
  
  It is very important to know that the handle message is dispatched everytime that an iframe
  if the page will change its state so we have to retrieve the right event according to the right iframe, that
  is whay data.id is made for, to compare the id of the event with the local id, if it matches, then its good
  */
  
  
  handleMessage(event) {
    //console.log("handleMessage", event);
    
    var data = JSON.parse(event.data);
    
    if (data.id !== this.iframeID) {
      return
    }
    
    let events = ["stop", "play", "pause", "buffering", null, "cueing"]
    let state = (data.event === "onReady" && "ready") || (data.info || {}).playerState;
    
    
    if (typeof state !== "undefined" && state !== -1) {
      //console.log("iframe trigger: " + state);
      
      if (state === "ready") {
        clearInterval(this.poller);
        this.dispatchEvent({type:'complete', target:this});
      }
      // Ended
      else if (state === 0) {
        // console.log("ended");
        this.dispatchEvent({type:'ended', target:this});
      }
      // Playing
      else if (state === 1) {
        //console.log("Playing");
        this.isPlaying = true;
        this.dispatchEvent({type:'play', target:this});
      }
      // Pause
      else if (state === 2) {
        // console.log("Pause");
        this.dispatchEvent({type:'pause', target:this});
      }
      // Buggering
      else if (state === 3) {
        // console.log("Buffering");
        this.dispatchEvent({type:'buffering', target:this});
      }
      // Cueing
      else if (state === 5) {
        // console.log("Cueing");
        this.dispatchEvent({type:'cueing', target:this});
      }
    }
    
    // this.duration = (data.info || {}).duration || this.duration;
    // this.currentTime = (data.info || {}).currentTime || this.currentTime;
    
    // var completePercent = Math.round((this.currentTime/this.duration)*100); //calculate % complete
    // if (completePercent !== NaN && completePercent > 94) {
    // 	console.log("completePercent: "+completePercent);
    // 	this.pause();
    // }
  }
  
  
  send(action, fn, args) {
    
    let message = {};
    
    message.event = action
    if (fn!== undefined) {
      message.func = fn
    }
    message.id = this.iframeID
    message.args = args || []
    
    
    //this.dispatch(message);
    if (typeof this.iframe !== "undefined" && !!this.iframe.contentWindow === true) {
      //console.log("postMessage");
      this.iframe.contentWindow.postMessage(JSON.stringify(message), "*");
    }
  }
  
  
  
  // Actions
  play () {
    this.send("command", "playVideo");
  }
  
  pause() {
    this.send("command", "pauseVideo")
    this.isPlaying = false;
  }
  
  stop() {
    this.send("command", "stopVideo")
    this.isPlaying = false;
  }
  
  seekTo(time) {
    this.send("command", "seekTo", [time])
  }
  
  
  // Setters
  setVolume(volume) {
    this.send("command", "setVolume", [volume])
  }
  
  // Getters
  getVolume() {
    return this.volume;
  }
}
export default YoutubePlayer;
