self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open("mysite-static-v1").then(function(cache) {
			return cache.addAll([
				"/Piecework-Manager.5d59abf1.css"
			]);
		})
	);
});
