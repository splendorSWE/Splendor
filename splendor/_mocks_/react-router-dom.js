const React = require('react');
module.exports = {
  Link: ({ children, ...props }) => React.createElement('div', props, children)
};
