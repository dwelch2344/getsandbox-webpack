Sandbox-Webpack
====================

Run [Sandbox](http://www.getsandbox.com) locally, writing your code in ES6+. Woot!

Spin things up with `docker-compose up` or the following: 

```
docker run --name sandbox \
           -p 8080:8080 \
           -v $(pwd):/sandbox \
           deardooley/getsandbox
```

Then run `npm run watch`