// Compiled by ClojureScript 0.0-3058 {}
goog.provide('clojure.browser.repl');
goog.require('cljs.core');
goog.require('cljs.repl');
goog.require('clojure.browser.event');
goog.require('clojure.browser.net');
goog.require('goog.labs.userAgent.browser');
goog.require('goog.dom');
clojure.browser.repl.xpc_connection = cljs.core.atom.call(null,null);
clojure.browser.repl.repl_print = (function clojure$browser$repl$repl_print(data){
var temp__4124__auto__ = cljs.core.deref.call(null,clojure.browser.repl.xpc_connection);
if(cljs.core.truth_(temp__4124__auto__)){
var conn = temp__4124__auto__;
return clojure.browser.net.transmit.call(null,conn,new cljs.core.Keyword(null,"print","print",1299562414),cljs.core.pr_str.call(null,data));
} else {
return null;
}
});
clojure.browser.repl.get_ua_product = (function clojure$browser$repl$get_ua_product(){
if(cljs.core.truth_(goog.labs.userAgent.browser.isSafari())){
return new cljs.core.Keyword(null,"safari","safari",497115653);
} else {
if(cljs.core.truth_(goog.labs.userAgent.browser.isChrome())){
return new cljs.core.Keyword(null,"chrome","chrome",1718738387);
} else {
if(cljs.core.truth_(goog.labs.userAgent.browser.isFirefox())){
return new cljs.core.Keyword(null,"firefox","firefox",1283768880);
} else {
if(cljs.core.truth_(goog.labs.userAgent.browser.isIE())){
return new cljs.core.Keyword(null,"ie","ie",2038473780);
} else {
return null;
}
}
}
}
});
/**
 * Process a single block of JavaScript received from the server
 */
clojure.browser.repl.evaluate_javascript = (function clojure$browser$repl$evaluate_javascript(conn,block){
var result = (function (){try{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.Keyword(null,"value","value",305978217),[cljs.core.str(eval(block))].join('')], null);
}catch (e12582){var e = e12582;
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),clojure.browser.repl.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),[cljs.core.str(e)].join(''),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),(cljs.core.truth_(e.hasOwnProperty("stack"))?e.stack:"No stacktrace available.")], null);
}})();
return cljs.core.pr_str.call(null,result);
});
clojure.browser.repl.send_result = (function clojure$browser$repl$send_result(connection,url,data){
return clojure.browser.net.transmit.call(null,connection,url,"POST",data,null,(0));
});
/**
 * Send data to be printed in the REPL. If there is an error, try again
 * up to 10 times.
 */
clojure.browser.repl.send_print = (function() {
var clojure$browser$repl$send_print = null;
var clojure$browser$repl$send_print__2 = (function (url,data){
return clojure$browser$repl$send_print.call(null,url,data,(0));
});
var clojure$browser$repl$send_print__3 = (function (url,data,n){
var conn = clojure.browser.net.xhr_connection.call(null);
clojure.browser.event.listen.call(null,conn,new cljs.core.Keyword(null,"error","error",-978969032),((function (conn){
return (function (_){
if((n < (10))){
return clojure$browser$repl$send_print.call(null,url,data,(n + (1)));
} else {
return console.log([cljs.core.str("Could not send "),cljs.core.str(data),cljs.core.str(" after "),cljs.core.str(n),cljs.core.str(" attempts.")].join(''));
}
});})(conn))
);

return clojure.browser.net.transmit.call(null,conn,url,"POST",data,null,(0));
});
clojure$browser$repl$send_print = function(url,data,n){
switch(arguments.length){
case 2:
return clojure$browser$repl$send_print__2.call(this,url,data);
case 3:
return clojure$browser$repl$send_print__3.call(this,url,data,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
clojure$browser$repl$send_print.cljs$core$IFn$_invoke$arity$2 = clojure$browser$repl$send_print__2;
clojure$browser$repl$send_print.cljs$core$IFn$_invoke$arity$3 = clojure$browser$repl$send_print__3;
return clojure$browser$repl$send_print;
})()
;
clojure.browser.repl.order = cljs.core.atom.call(null,(0));
clojure.browser.repl.wrap_message = (function clojure$browser$repl$wrap_message(t,data){
return cljs.core.pr_str.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),t,new cljs.core.Keyword(null,"content","content",15833224),data,new cljs.core.Keyword(null,"order","order",-1254677256),cljs.core.swap_BANG_.call(null,clojure.browser.repl.order,cljs.core.inc)], null));
});
/**
 * Start the REPL server connection.
 */
clojure.browser.repl.start_evaluator = (function clojure$browser$repl$start_evaluator(url){
var temp__4124__auto__ = clojure.browser.net.xpc_connection.call(null);
if(cljs.core.truth_(temp__4124__auto__)){
var repl_connection = temp__4124__auto__;
var connection = clojure.browser.net.xhr_connection.call(null);
clojure.browser.event.listen.call(null,connection,new cljs.core.Keyword(null,"success","success",1890645906),((function (connection,repl_connection,temp__4124__auto__){
return (function (e){
return clojure.browser.net.transmit.call(null,repl_connection,new cljs.core.Keyword(null,"evaluate-javascript","evaluate-javascript",-315749780),e.currentTarget.getResponseText(cljs.core.List.EMPTY));
});})(connection,repl_connection,temp__4124__auto__))
);

clojure.browser.net.register_service.call(null,repl_connection,new cljs.core.Keyword(null,"send-result","send-result",35388249),((function (connection,repl_connection,temp__4124__auto__){
return (function (data){
return clojure.browser.repl.send_result.call(null,connection,url,clojure.browser.repl.wrap_message.call(null,new cljs.core.Keyword(null,"result","result",1415092211),data));
});})(connection,repl_connection,temp__4124__auto__))
);

clojure.browser.net.register_service.call(null,repl_connection,new cljs.core.Keyword(null,"print","print",1299562414),((function (connection,repl_connection,temp__4124__auto__){
return (function (data){
return clojure.browser.repl.send_print.call(null,url,clojure.browser.repl.wrap_message.call(null,new cljs.core.Keyword(null,"print","print",1299562414),data));
});})(connection,repl_connection,temp__4124__auto__))
);

clojure.browser.net.connect.call(null,repl_connection,cljs.core.constantly.call(null,null));

return setTimeout(((function (connection,repl_connection,temp__4124__auto__){
return (function (){
return clojure.browser.repl.send_result.call(null,connection,url,clojure.browser.repl.wrap_message.call(null,new cljs.core.Keyword(null,"ready","ready",1086465795),"ready"));
});})(connection,repl_connection,temp__4124__auto__))
,(50));
} else {
return alert("No 'xpc' param provided to child iframe.");
}
});
/**
 * Connects to a REPL server from an HTML document. After the
 * connection is made, the REPL will evaluate forms in the context of
 * the document that called this function.
 */
clojure.browser.repl.connect = (function clojure$browser$repl$connect(repl_server_url){
var repl_connection = clojure.browser.net.xpc_connection.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"peer_uri","peer_uri",910305997),repl_server_url], null));
cljs.core.swap_BANG_.call(null,clojure.browser.repl.xpc_connection,cljs.core.constantly.call(null,repl_connection));

clojure.browser.net.register_service.call(null,repl_connection,new cljs.core.Keyword(null,"evaluate-javascript","evaluate-javascript",-315749780),((function (repl_connection){
return (function (js){
return clojure.browser.net.transmit.call(null,repl_connection,new cljs.core.Keyword(null,"send-result","send-result",35388249),clojure.browser.repl.evaluate_javascript.call(null,repl_connection,js));
});})(repl_connection))
);

clojure.browser.net.connect.call(null,repl_connection,cljs.core.constantly.call(null,null),((function (repl_connection){
return (function (iframe){
return iframe.style.display = "none";
});})(repl_connection))
);

if(cljs.core.truth_(COMPILED)){
} else {
goog.require__ = goog.require;

goog.isProvided_ = ((function (repl_connection){
return (function (name){
return false;
});})(repl_connection))
;

goog.writeScriptTag_ = ((function (repl_connection){
return (function (src,opt_sourceText){
return document.body.appendChild((function (){var script = document.createElement("script");
var script__$1 = (function (){var G__12586 = script;
(G__12586["type"] = "text/javascript");

return G__12586;
})();
var script__$2 = (((opt_sourceText == null))?(function (){var G__12587 = script__$1;
(G__12587["src"] = src);

return G__12587;
})():(function (){var G__12588 = script__$1;
goog.dom.setTextContext(G__12588,opt_sourceText);

return G__12588;
})());
return script__$2;
})());
});})(repl_connection))
;

goog.require = ((function (repl_connection){
return (function (src,reload){
if(cljs.core._EQ_.call(null,reload,"reload-all")){
goog.cljsReloadAll_ = true;
} else {
}

var reload_QMARK_ = (function (){var or__4020__auto__ = reload;
if(cljs.core.truth_(or__4020__auto__)){
return or__4020__auto__;
} else {
return goog.cljsReloadAll__;
}
})();
if(cljs.core.truth_(reload_QMARK_)){
var path_12589 = (goog.dependencies_.nameToPath[src]);
delete goog.dependencies_.visited[path_12589];

delete goog.dependencies_.written[[cljs.core.str(goog.basePath),cljs.core.str(path_12589)].join('')];
} else {
}

var ret = goog.require__(src);
if(cljs.core._EQ_.call(null,reload,"reload-all")){
goog.cljsReloadAll_ = false;
} else {
}

return ret;
});})(repl_connection))
;
}

return repl_connection;
});