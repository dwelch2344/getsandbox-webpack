!function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return"Hello, "+e+"!"};t.getName=function(){return"Dave"}},function(e,t,n){"use strict";var r,s=n(0),u=(r=s)&&r.__esModule?r:{default:r};Sandbox.define("/hello","get",function(e,t){var n=(0,u.default)((0,s.getName)());t.json({greeting:n})}),Sandbox.define("/users","POST",function(e,t){return state.users=state.users||[],state.users.push(e.body),t.json({status:"ok"})}),Sandbox.define("/users","GET",function(e,t){return state.users=state.users||[],t.json(state.users)}),Sandbox.define("/users/{username}","GET",function(e,t){state.users=state.users||[];var n=e.params.username;console.log("Getting user "+n+" details");var r=_.find(state.users,{username:n});return t.json(r)})}]);
//# sourceMappingURL=main.js.map