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