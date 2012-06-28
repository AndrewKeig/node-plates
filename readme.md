# node-plates a node.js boilerplate

node-plates is a node.js boilerplate using express, socket.io, mongooose, jquery.mobile & html 5 mobile/web application.

## Installation

    $ npm install node-plates



## Usage

    $ node server.js


## Dependencies

    Requires mongoDb/mongoose in order to support article content.

## More here

http://airasoul.blogspot.co.uk/search/label/node.plates



## Current setup includes

<ul>
<li><a href="http://airasoul.blogspot.co.uk/2012/03/nodeplates-cascading-configuration.html">Environment cascading configuration files using konphyg</a></li>
<li>Express; with some best practices in place such as: </li>
<ul>
<li><a href="http://airasoul.blogspot.co.uk/2012/03/nodeplates-configuring-error-handlers.html">Error handling with error middleware</a></li>
<li><a href="http://airasoul.blogspot.co.uk/2012/03/nodeplates-seperate-routes-into-modules.html">Routes seperated into modules and exported</a></li>
<li>Route middleware</li>
<li>Express production configuration</li>
</ul>
<li><a href="http://airasoul.blogspot.co.uk/2012/03/nodejs-boilerplate-configuring-session.html">Configuring session stores using konphyg</a>; configured for:
<ul>
  <li>In memory configuration</li>
  <li>Mongo</li>
  <li>Redis</li>
  <li>Couch</li>
  <li>Memcache</li>
</ul>

<li><a href="http://airasoul.blogspot.co.uk/2012/05/nodejs-boilerplate-client-side.html">Supporting multiple view engines using consolidate.js</a></li>

<li><a href="http://airasoul.blogspot.co.uk/2012/05/nodejs-boilerplate-client-side.html">Templating using dust.js</a></li>
<ul>
<li>Server side templating using dust.js</li>
<li>Client side templating using dust.js; with pre-compilation or client side compilation</li>
</ul>

<li><a href="http://airasoul.blogspot.co.uk/2012/05/nodejs-boilerplate-client-side.html">Content Negotiation</a></li>

<li>JQuery Mobile template</li>
<li>Html5 boilerplate template</li>
<li>Backbone.js enabled</li>

<li>Socket.io</li>
<ul>
<li>Socket.io handshake with express using configurable sessions</li>
<li>Socket.io production configuration</li>
</ul>

<li><a href="http://airasoul.blogspot.co.uk/2012/06/nodejs-boilerplate-ssltls-with-express.html">Forms authentication via SSL TLS for secure login/my account pages</a></li>
<ul>
<li>express.js enabled</li>
<li>socket.io enabled</li>
</ul>


<li>Article content via mongoDb and mongoose</li>

A working example of articles can be seen on the node-plates homepage; articles added here will be displayed as a list on the home page.
Our schema is very simple:

    var article = new Schema({
        author          : ObjectId
        , title         : String
        , body          : String
        , date          : Date
        , article_type  : String
    });

</ul>
