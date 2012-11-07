# fluent-time.js
fluent time works as a wrapper around `Date`, `setTimeout` and `setInterval` and aims to provide a simpler api for them.

### intervals

```javascript
// runs the provided function every 5 minutes, and provides how many times it has run so far.
every(5).minutes(function(times) {
  
});

// if the code takes longer than than the interval it will run the task as fast 
// as it can.
every(5).seconds(function() {
  // something that takes longer than 5 seconds...
});
```
### timeouts

```javascript
// runs the provided function after 10 seconds
after(10).seconds(function() {
  
});
```
## License 

(The MIT License)

Copyright (c) 2011 Markus Ullmark &lt;ullmark@gmail.com&gt;

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
