# fluent-time.js
fluent time works as a wrapper around `Date`, `setTimeout` and `setInterval` and aims to provide a simpler api for them.

## installation
#### node.js
```
npm install fluent-time
```

#### clientside
download and include `fluent-time.js` or `fluent-time.min.js`.

## accessing the api.
we don't want to pollute your global/module scope without asking, but it gives the best looking fluent code. So you can do it yourself, like this;

#### node.js
```javascript
var every = require('fluent-time').every;
```
#### clientside
```javascript
var every = FluentTime.every;
```

## intervals

```javascript
every(5).seconds(function() {
  // code...
});

every(4).hours().and(2).minutes(function() {
  // code...
});
```

```javascript
// runs the provided function every 5 minutes, skips the second time
every(5).minutes(function(times, interval) {
  if (times === 2) {
    interval.cancelNext();
  }

  else if (times === 10) {
    interval.cancel();
  }
});
```

```javascript
// next time the function runs can be retrieved
var interval = every(2).days(function(times, interval) {
  console.log(interval.nextTime()); // => Date object representing next execution.
});

interval.nextTime(); // => Date object representing next execution.
```

## timeouts

```javascript
// runs the provided function after 10 seconds
after(10).seconds(function() {
  
});
```
## License 

(The MIT License)

Copyright (c) 2011 Markus Ullmark

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
