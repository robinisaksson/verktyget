

export class EventDispatcher {
  
  constructor() {
    this.__listeners = {};    
  }
  
  
  /**
  * @param type {string} Name of the event.
  * @param listener {Function} Callback function.
  */
  addEventListener( type, listener ) {
    
    if ( this.__listeners[ type ] === undefined ) {
      this.__listeners[ type ] = [];
    }
    
    if ( this.__listeners[type].indexOf( listener ) === -1 ) {
      this.__listeners[type].push( listener );
    }
    
  }
  
  
  // hasEventListener( type, listener) {
  // 	return ( this.__listeners[ type ] !== undefined && this.__listeners[ type ].indexOf( listener ) !== - 1 );
  // }
  
  
  removeEventListener (type, listener) {
    
    var listenerArray = this.__listeners[ type ];
    
    if (listenerArray !== undefined) {
      
      var index = listenerArray.indexOf( listener );
      
      if ( index !== -1 ) {
        listenerArray.splice( index, 1 );
      }
      
    } else {
      throw new Error("You cant remove events from a element that already has been destroyed.");
    }
    
  }
  
  
  
  /*
  * Dispatches an event based on a event object.
  * this.dispatchEvent( {type: "onUrlChanged"} );
  * this.dispatchEvent( {type: "onUrlChanged", target: this} );
  * this.dispatchEvent( {type: "onUrlChanged", foo: "Bar"} );
  */
  dispatchEvent (event) {
    
    var listenerArray = this.__listeners[event.type];
    
    if ( listenerArray !== undefined ) { //NOTICE: This may not work in IE8
      
      //event.target = this;// bad approach..
      var arrayCopy = [];
      var len = listenerArray.length;
      var i = 0;
      
      // creates a copy, to avoid issues if a event listener removes or attaches new event listeners.
      while (i < len) {
        arrayCopy[i] = listenerArray[i];
        ++i;
      }
      
      // sets to 0 for another loop.
      i = 0;
      while (i < len) {
        arrayCopy[i](event);
        ++i;
      }
    }
    
  }
  
  destroy () {
    this.__listeners = null;
  }
  
}
