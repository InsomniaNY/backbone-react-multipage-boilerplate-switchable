"use strict";
/*! rc_header_v1.js */
var rc = {};

"use strict";
/*! dc_header_v1.js */
var dc = {};

'use strict';
/*! home/home.jsx */
rc.homePageComponent = React.createClass({
    displayName: 'homePageComponent',
    render: function render() {
        console.log(this.constructor.displayName + ' render()');
        return React.createElement(
            'div',
            { id: 'homepage' },
            React.createElement('img', { src: SiteConfig.assetsDirectory + 'images/homepage/ghostshell.jpg' }),
            React.createElement(
                'p',
                null,
                'This is a basic page. The jsx and css for this page level component is stored in ',
                React.createElement(
                    'span',
                    { className: 'codestyle' },
                    '/public/jsx-pages'
                )
            ),
            React.createElement(
                'p',
                null,
                'Note that when I reference the url the first fragment after the # is called the page fragment. Subsequent fragments are called 0, 1, 2 etc.',
                React.createElement('br', null),
                React.createElement(
                    'span',
                    { className: 'codestyle' },
                    '#/pageFragment/fragment0/fragment1/fragment2'
                ),
                React.createElement('br', null),
                'Below are links and summaries of the other pages in the boilerplate.'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/exmachina' },
                    'Ex Machina'
                ),
                ' - here is an example showing how during runtime we can switch back to a jQuery rendered backbone view page.'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/gameofthrones' },
                    'The Game of Thrones Page'
                ),
                ' - here is an example showing how css can completely break away from the css pattern discussed on the home page. It also shows an extra render panel.'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/dexter' },
                    'Dexter and True Blood'
                ),
                ' - here you can see how a child component is shared across multiple pages.'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/walkingdead' },
                    'Walking Dead Page'
                ),
                ' - an example showing how to combine deeplinks with pulling data from the config. The browsers back button works with the deeplinks.'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/hungergames' },
                    'Hunger Games Page'
                ),
                ' - demonstrates how the component can impose its own local Model onto',
                React.createElement(
                    'span',
                    { className: 'codestyle' },
                    'this.state'
                )
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/hannibal' },
                    'Hannibal and Breaking Bad'
                ),
                ' - here is an example showing how a child component shared across different pages can have different configurations.'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/firefly' },
                    'Firefly'
                ),
                ' - this page has two sibling components that communicate to each other using event architecture. The event dispatcher is named grandCentral.'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/madmax' },
                    'Mad Max'
                ),
                ' - this page gives an example of how to use the image loader component in conjunction with the BBPreload library.'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/inception' },
                    'Inception'
                ),
                ' - the inception page demonstrates how we can use ES6 notion in our JSX'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/anime' },
                    'Anime'
                ),
                ' - The anime page is a demonstration of how to have event driven modals that can be deep linkable.'
            ),
            React.createElement(
                'p',
                null,
                React.createElement(
                    'a',
                    { className: 'pagetitle', href: '#/jessicajones' },
                    'Jessica Jones'
                ),
                ' - Example of a component remembering state after navigating away. Also bubbled events.'
            )
        );
    }
});
"use strict";
/*! header/header.jsx */
rc.header = React.createClass({
    displayName: "header",
    render: function render() {
        return React.createElement(
            "h2",
            null,
            "Backbone Multipage Boilerplate"
        );
    }
});
'use strict';
/*! loader/loader.jsx */
rc.loader = React.createClass({
    displayName: 'loader',
    stack: [],
    getInitialState: function getInitialState() {
        return {
            show: false
        };
    },
    componentDidMount: function componentDidMount(currentPage) {
        var self = this;
        grandCentral.off('loaderStart').on('loaderStart', function (uniqueString) {
            if ($.inArray(uniqueString, self.stack) == -1) {
                console.log('loaderStart(' + uniqueString + ')');
                self.stack.push(uniqueString);
                self.setState({ show: true });
            }
        });
        grandCentral.off('loaderEnd').on('loaderEnd', function (uniqueString) {
            var i = $.inArray(uniqueString, self.stack);
            if (i > -1) {
                self.stack.splice(i, 1);
                console.log('loaderEnd(' + uniqueString + ')');
            }
            if (self.stack.length === 0) {
                self.setState({ show: false });
            }
        });
    },
    reset: function reset() {
        this.stack = [];
        this.setState({ show: false });
    },
    render: function render() {
        var classes = this.state.show ? 'active' : '';
        return React.createElement(
            'div',
            { id: 'loader', className: classes },
            React.createElement(
                'div',
                { className: 'loadingmessage' },
                React.createElement('img', { className: 'spinner', src: SiteConfig.assetsDirectory + 'images/ui/spinner.gif' })
            )
        );
    }
});
'use strict';
/*! mainmodal/mainmodal.jsx */
rc.mainmodal = React.createClass({
    displayName: 'mainmodal',
    getInitialState: function getInitialState() {
        return {
            show: false,
            whichTemplate: ''
        };
    },
    componentDidMount: function componentDidMount() {
        var self = this;
        grandCentral.off('modalHide').on('modalHide', function () {
            self.setState({ show: false, whichTemplate: '' });
        });
        grandCentral.off('modalShow').on('modalShow', function (payLoad) {
            self.setState({ show: true, whichTemplate: payLoad });
        });
    },
    handleModalClose: function handleModalClose() {
        grandCentral.trigger('modalHide');
        if (app.status.currentFragString) {
            if (app.status.currentFragString.indexOf('modalShow-') > -1) {
                var newURL = '#/' + app.status.currentRoute;
                var stringToRemove = 'modalShow-' + this.state.whichTemplate;
                console.log('removing ' + stringToRemove + 'from the URL');
                newURL = newURL.replace('/' + stringToRemove, '');
                newURL = newURL.replace(stringToRemove + '/', '');
                newURL = newURL.replace(stringToRemove, '');
                app.navigate(newURL);
            }
        }
    },
    render: function render() {
        console.log(this.constructor.displayName + ' render()');
        var self = this;
        var classes = this.state.show ? 'absolutewrapper active' : 'absolutewrapper ';
        var outputArray = [];
        switch (this.state.whichTemplate) {
            case 'attackontitanModal':
                outputArray.push(React.createElement(rc.attackontitanModal, null));break;
            case 'deathnoteModal':
                outputArray.push(React.createElement(rc.deathnoteModal, null));break;
        }
        return React.createElement(
            'div',
            { className: classes },
            React.createElement(
                'div',
                { className: 'greybacking' },
                React.createElement(
                    'div',
                    { className: 'modalwrapper' },
                    React.createElement(
                        'div',
                        { className: 'modalCloseButtonWrapper' },
                        React.createElement(
                            'div',
                            { className: 'modalCloseButton', onClick: self.handleModalClose },
                            React.createElement('img', { src: SiteConfig.assetsDirectory + 'images/ui/modal-close-btn.png' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modalContentsWrapper' },
                        outputArray
                    )
                )
            )
        );
    }
});
'use strict';
/*! nav/nav.jsx */
rc.nav = React.createClass({
	displayName: 'nav',
	getInitialState: function getInitialState() {
		return {
			currentPage: ''
		};
	},
	componentDidMount: function componentDidMount() {
		var self = this;
		grandCentral.off('pagechange').on('pagechange', function (data) {
			self.setState({
				currentPage: data.currentPage
			});
		});
	},
	getClassNameWithActive: function getClassNameWithActive(arg) {
		var className = 'navitem';
		if (arg == this.state.currentPage) {
			className = className + ' active';
		}
		return className;
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'a',
				{ className: this.getClassNameWithActive('home'), href: '#' },
				'Home'
			),
			React.createElement(
				'a',
				{ className: this.getClassNameWithActive('exmachina'), href: '#/exmachina' },
				'Ex Machina'
			),
			React.createElement(
				'a',
				{ className: this.getClassNameWithActive('gameofthrones'), href: '#/gameofthrones' },
				'Game Of Thrones'
			),
			React.createElement(
				'a',
				{ className: this.getClassNameWithActive('trueblood'), href: '#/trueblood' },
				'True Blood'
			),
			React.createElement(
				'a',
				{ className: this.getClassNameWithActive('dexter'), href: '#/dexter' },
				'Dexter'
			),
			React.createElement(
				'a',
				{ className: this.getClassNameWithActive('walkingdead'), href: '#/walkingdead' },
				'Walking Dead'
			),
			React.createElement(
				'a',
				{ className: this.getClassNameWithActive('hungergames'), href: '#/hungergames' },
				'Hunger Games'
			),
			React.createElement(
				'a',
				{ className: this.getClassNameWithActive('hannibal'), href: '#/hannibal' },
				'Hannibal'
			),
			React.createElement(
				'a',
				{ className: this.getClassNameWithActive('breakingbad'), href: '#/breakingbad' },
				'Breaking Bad'
			),
			React.createElement(
				'a',
				{ className: this.getClassNameWithActive('firefly'), href: '#/firefly' },
				'Firefly'
			),
			React.createElement(
				'a',
				{ className: this.getClassNameWithActive('madmax'), href: '#/madmax' },
				'Mad Max'
			),
			React.createElement(
				'a',
				{ className: this.getClassNameWithActive('inception'), href: '#/inception' },
				'Inception'
			),
			React.createElement(
				'a',
				{ className: this.getClassNameWithActive('anime'), href: '#/anime' },
				'Anime'
			),
			React.createElement(
				'a',
				{ className: this.getClassNameWithActive('jessicajones'), href: '#/jessicajones' },
				'Jessica Jones'
			)
		);
	}
});