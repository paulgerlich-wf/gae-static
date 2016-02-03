React = require('react');
MovieOrganizer = require('../layout/AppShell').MovieOrganizer;

var IndexPage = React.createClass({
    render: function() {
        return (
            <MovieOrganizer />
        );
    }
});

module.exports = {
    IndexPage: IndexPage
};