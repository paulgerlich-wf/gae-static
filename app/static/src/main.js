
var React = require('react');
var ReactDom = require('react-dom');

var IndexPage = require('./pages/DemoPages').IndexPage;

var mountNode = document.getElementById('react_mount_node');
ReactDom.render(<IndexPage />, mountNode);