import {EventDispatcher} from './event-dispatcher';

export const URLManager = {


	// querySelector
	Init() {
		this._usePopState = true;
		this._root = '';
		this._path = '';
		this._historyLength = window.history.length;
		this._eventDispatcher = new EventDispatcher();


		URLManager._path = URLManager.GetPathFromURL(URLManager.GetURL());
		window.addEventListener('popstate', URLManager.OnUrlChanged);

		return this;
	},

	// EVENTS
	OnUrlChanged(e) {
		URLManager.SetPath(URLManager.GetURL());
		URLManager.FireHistoryChange();
	},

	FireHistoryChange() {
		URLManager._eventDispatcher.dispatchEvent({type: 'onUrlChange', target: this });
	},

	// ---------------------
	// Setters
	// ---------------------
	SetRootPath(root) {
		URLManager._root = root;
	},

	SetPathAt(level, path) {
		if (URLManager.GetPathList()[level] !== path) {
			var list = URLManager.GetPathList() ||  [];

			list[level] = path;

			URLManager.SetPath('/' + list.join('/'));

			return true;
		}

		return false;
	},

	SetPath(url) {
		URLManager._path = URLManager.GetPathFromURL(url);
	},

	// ---------------------
	// Getters
	// ---------------------
	GetRootPath() {
		return URLManager._root;
	},

	GetPath() {
		return URLManager._path;
	},

	GetPathList() {
		var path = URLManager._path;
		if (path.charAt(0) === "/") {
			path = path.slice(1);
		}
		return path.split('/');
		/*.filter(URLManager._FilterPath);*/
	},
	GetPathAt(index) {
		return URLManager.GetPathList()[index];
	},

	GetURL() {
		return window.location.href;
	},

	GetHistoryLength() {
		return URLManager._historyLength;
	},

	GetPathFromURL(url) {
		// var regExp, hash = /(?:#)[^\s]+/g;
		// 
		// regExp = url.match(hash);
		// 
		// // return hash if it exists (high priority)
		// if (regExp !== null) {
		// 	return regExp[0].slice(1);
		// }

		var pathname = /[^?\s]+/g;

		// remove root path if it exists
		url = url.replace(URLManager._root, '');
		// remove host pattern (https?://host:port?/)
		url = url.replace(/^https?:\/\/[^\s\/]+/, '');

		regExp = url.match(pathname);

		// otherwise return pathname
		if (regExp !== null) {
			return regExp[0];
		}

		return "";
	},

	// ---------------------
	// Actions
	// ---------------------
	GoToPathAtLevel(level, path) {
		if (URLManager.SetPathAt(level, path) === true) {
			URLManager.Perform();
		}
	},

	GoToURL(url, newTab = false) {
		// Is a new tab or is an absolute URL but does not have the same origin. (Is not the same domain)
		if (newTab === true || (URLManager.IsAbsolute(url) === true && url.indexOf(location.origin) !== -1)) {
			window.open(url, (newTab === true) ? undefined : '_self');
		} else {
			URLManager.SetPath(url);
			URLManager.Perform();
		}
	},

	Perform() {
		window.history.pushState({
			historyNum: URLManager._historyLength++
		}, URLManager.GetPath(), URLManager.GetPath());
		URLManager.FireHistoryChange();

		// if (URLManager._usePopState === true) {
		//     window.history.pushState({ historyNum: URLManager._historyLength++ }, URLManager.GetPath(), URLManager.GetPath());
		//     URLManager.FireHistoryChange();
		// } else {
		//     window.location.hash = URLManager.GetPath().replace(/^\/+/, '/');
		// }
	},

	PerformSilent() {
		window.history.pushState({
			historyNum: URLManager._historyLength++
		}, URLManager.GetPath(), URLManager.GetPath());
		// if (URLManager._usePopState === true) {
		//     window.history.pushState({ historyNum: URLManager._historyLength++ }, URLManager.GetPath(), URLManager.GetPath());
		// } else {
		//     window.location.hash = URLManager.GetPath().replace(/^\/+/, '/');
		// }
	},

	/**
	 * Returns wether the URL is absolute or not(relaitve).
	 *
	 * @param {String}    url    The url path like 'http://www.hello.com'
	 * @returns {Boolean}        If the URL is absolute true is returned, if not false is returned.
	 */
	IsAbsolute(url) {
		var r = new RegExp('^(?:[a-z]+:)?//', 'i');
		return r.test(url);
	},


	// --------------------------------------------------------
	//                      Event Methods
	// --------------------------------------------------------

	addEventListener(type, listener) {
		URLManager._eventDispatcher.addEventListener(type, listener);
	},

	removeEventListener(type, listener) {
		URLManager._eventDispatcher.removeEventListener(type, listener);
	},

	dispatchEvent(event) {
		URLManager._eventDispatcher.dispatchEvent(event);
	},

}

// export default URLManager;
