import React, {Component, PropTypes} from 'react';
import URL from 'url';

export default class BackgroundImage extends Component {

  static propTypes = {
    lazy: PropTypes.bool,
    proxy: PropTypes.bool,
    src: PropTypes.string,
    className: PropTypes.string,
    options: PropTypes.object,
  }

  static defaultProps = {
    lazy: false,
    proxy: false,
    src: '',
    className: '',
    options: {},
  }

  constructor(props) {
    super(props);
    this.state = {load: !props.lazy};
  }

  load(sw: boolean) {
    this.setState({load: sw});
  }

  render() {
    const {src, proxy, className, options} = this.props;
    const load = this.state.load || !this.props.lazy;
    let url = '';
    if (src && load) {
      if (proxy) {
        url = URL.format({
          pathname: '/api/imageProxy/',
          query: {
            src,
            ...options,
          },
        });
        console.log(url);
      }
      else url = src;
    }
    return <div className={className} style={{backgroundImage: `url(${url})`}}></div>;
  }
}