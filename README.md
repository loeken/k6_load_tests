# load tests with k6

run 10 virtual users for 10seconds
```
k6 run --vus 10 --duration 10s test1.js
```

same as above but looking at the returning html and run a query on all assets
```
k6 run --vus 10 --duration 10s test3.js
```

run a post on a login form
```
k6 run --vus 10 --duration 10s test4.js
```

a test that slowly increases from 0 to 10000 virtual users lasts 2 minutes total
```
k6 run  test4.js
```

