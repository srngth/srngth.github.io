import{$ as X,A as B,B as O,E as K,G as Z,H as M,K as $,L as G,M as H,S as A,U as P,V as q,W as z,X as Y,Y as J,Z as Q,a as D,aa as ee,ba as te,c as N,d as E,e as F,f as l,g as U,h as y,i as I,j as S,k as h,ka as re,l as v,m as u,n as W,o as j,p as m,q as L,r as T,t as V,u as C,w as x,y as _}from"./chunk-UTOE5QDH.js";import"./chunk-L222AEIJ.js";import"./chunk-DFNAMILR.js";import"./chunk-YTQGYNLW.js";import"./chunk-3JATT76J.js";import"./chunk-F7XBNY6P.js";import"./chunk-JX3TYZ34.js";import"./chunk-RUY5SX76.js";import"./chunk-NIOQNOHM.js";import"./chunk-4U6PRYVA.js";import"./chunk-XODSA4YU.js";import"./chunk-JWIEPCRG.js";import"./chunk-QPVVTFFW.js";import"./chunk-J6ICYO4L.js";import"./chunk-LF5XB4YN.js";import{a as k,e as f}from"./chunk-RW4GY4BD.js";var ne=[{path:"",loadChildren:()=>import("./chunk-HSWF3QNC.js").then(r=>r.routes)}];var se=(()=>{let e=class e{constructor(){}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=K({type:e,selectors:[["app-root"]],decls:2,vars:0,template:function(n,i){n&1&&($(0,"ion-app"),H(1,"ion-router-outlet"),G())},dependencies:[te,ee],encapsulation:2});let r=e;return r})();var b="Service workers are disabled or not supported by this browser";function ce(r){return y(()=>F(new Error(r)))}var g=class{serviceWorker;worker;registration;events;constructor(e){if(this.serviceWorker=e,!e)this.worker=this.events=this.registration=ce(b);else{let t=I(e,"controllerchange").pipe(l(()=>e.controller)),n=y(()=>E(e.controller)),i=U(n,t);this.worker=i.pipe(v(d=>!!d)),this.registration=this.worker.pipe(m(()=>e.getRegistration()));let c=I(e,"message").pipe(l(d=>d.data)).pipe(v(d=>d&&d.type)).pipe(j());c.connect(),this.events=c}}postMessage(e,s){return this.worker.pipe(u(1),L(t=>{t.postMessage(k({action:e},s))})).toPromise().then(()=>{})}postMessageWithOperation(e,s,t){let n=this.waitForOperationCompleted(t),i=this.postMessage(e,s);return Promise.all([i,n]).then(([,a])=>a)}generateNonce(){return Math.round(Math.random()*1e7)}eventsOfType(e){let s;return typeof e=="string"?s=t=>t.type===e:s=t=>e.includes(t.type),this.events.pipe(v(s))}nextEventOfType(e){return this.eventsOfType(e).pipe(u(1))}waitForOperationCompleted(e){return this.eventsOfType("OPERATION_COMPLETED").pipe(v(s=>s.nonce===e),u(1),l(s=>{if(s.result!==void 0)return s.result;throw new Error(s.error)})).toPromise()}get isEnabled(){return!!this.serviceWorker}},pe=(()=>{let e=class e{sw;messages;notificationClicks;subscription;get isEnabled(){return this.sw.isEnabled}pushManager=null;subscriptionChanges=new D;constructor(t){if(this.sw=t,!t.isEnabled){this.messages=h,this.notificationClicks=h,this.subscription=h;return}this.messages=this.sw.eventsOfType("PUSH").pipe(l(i=>i.data)),this.notificationClicks=this.sw.eventsOfType("NOTIFICATION_CLICK").pipe(l(i=>i.data)),this.pushManager=this.sw.registration.pipe(l(i=>i.pushManager));let n=this.pushManager.pipe(m(i=>i.getSubscription()));this.subscription=S(n,this.subscriptionChanges)}requestSubscription(t){if(!this.sw.isEnabled||this.pushManager===null)return Promise.reject(new Error(b));let n={userVisibleOnly:!0},i=this.decodeBase64(t.serverPublicKey.replace(/_/g,"/").replace(/-/g,"+")),a=new Uint8Array(new ArrayBuffer(i.length));for(let o=0;o<i.length;o++)a[o]=i.charCodeAt(o);return n.applicationServerKey=a,this.pushManager.pipe(m(o=>o.subscribe(n)),u(1)).toPromise().then(o=>(this.subscriptionChanges.next(o),o))}unsubscribe(){if(!this.sw.isEnabled)return Promise.reject(new Error(b));let t=n=>{if(n===null)throw new Error("Not subscribed to push notifications.");return n.unsubscribe().then(i=>{if(!i)throw new Error("Unsubscribe failed!");this.subscriptionChanges.next(null)})};return this.subscription.pipe(u(1),m(t)).toPromise()}decodeBase64(t){return atob(t)}};f(e,"\u0275fac",function(n){return new(n||e)(C(g))}),f(e,"\u0275prov",T({token:e,factory:e.\u0275fac}));let r=e;return r})(),le=(()=>{let e=class e{sw;versionUpdates;unrecoverable;get isEnabled(){return this.sw.isEnabled}constructor(t){if(this.sw=t,!t.isEnabled){this.versionUpdates=h,this.unrecoverable=h;return}this.versionUpdates=this.sw.eventsOfType(["VERSION_DETECTED","VERSION_INSTALLATION_FAILED","VERSION_READY","NO_NEW_VERSION_DETECTED"]),this.unrecoverable=this.sw.eventsOfType("UNRECOVERABLE_STATE")}checkForUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(b));let t=this.sw.generateNonce();return this.sw.postMessageWithOperation("CHECK_FOR_UPDATES",{nonce:t},t)}activateUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(b));let t=this.sw.generateNonce();return this.sw.postMessageWithOperation("ACTIVATE_UPDATE",{nonce:t},t)}};f(e,"\u0275fac",function(n){return new(n||e)(C(g))}),f(e,"\u0275prov",T({token:e,factory:e.\u0275fac}));let r=e;return r})();var ie=new V("");function ue(r,e,s,t){return()=>{if(!(P(t)&&"serviceWorker"in navigator&&s.enabled!==!1))return;let n=r.get(B),i=r.get(M);n.runOutsideAngular(()=>{let o=navigator.serviceWorker,p=()=>{var c;return(c=o.controller)==null?void 0:c.postMessage({action:"INITIALIZE"})};o.addEventListener("controllerchange",p),i.onDestroy(()=>{o.removeEventListener("controllerchange",p)})});let a;if(typeof s.registrationStrategy=="function")a=s.registrationStrategy();else{let[o,...p]=(s.registrationStrategy||"registerWhenStable:30000").split(":");switch(o){case"registerImmediately":a=E(null);break;case"registerWithDelay":a=oe(+p[0]||0);break;case"registerWhenStable":let c=N(r.get(M).whenStable());a=p[0]?S(c,oe(+p[0])):c;break;default:throw new Error(`Unknown ServiceWorker registration strategy: ${s.registrationStrategy}`)}}n.runOutsideAngular(()=>a.pipe(u(1)).subscribe(()=>navigator.serviceWorker.register(e,{scope:s.scope}).catch(o=>console.error("Service worker registration failed with:",o))))}}function oe(r){return E(null).pipe(W(r))}function de(r,e){return new g(P(e)&&r.enabled!==!1?navigator.serviceWorker:void 0)}var w=class{enabled;scope;registrationStrategy};function R(r,e={}){return x([pe,le,{provide:ie,useValue:r},{provide:w,useValue:e},{provide:g,useFactory:de,deps:[w,O]},{provide:Z,useFactory:ue,deps:[_,ie,w,O],multi:!0}])}q(se,{providers:[{provide:z,useClass:X},re(),J(ne,Q(Y)),R("ngsw-worker.js",{enabled:!A(),registrationStrategy:"registerWhenStable:30000"}),R("ngsw-worker.js",{enabled:!A(),registrationStrategy:"registerWhenStable:30000"})]});
