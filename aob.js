class Bullshit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slide: 0,
      countdownCount: 5,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.countDown(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeSlide() {
    this.setState(prevState => ({
      ...prevState,
      slide: prevState.slide + 1,
    }));
  }

  countDown() {
    this.setState(prevState => ({
      ...prevState,
      countdownCount: prevState.countdownCount - 1,
    }));

    if (this.state.countdownCount <= 0) {
      clearInterval(this.interval);
      this.changeSlide();
      this.interval = setInterval(() => this.changeSlide(), 20 * 1000);
    }
  }

  render() {
    return (
      <div>
        <Image slide={this.state.slide} />;
        <Countdown count={this.state.countdownCount} />
      </div>
    );
  }
}

class Countdown extends React.Component {
  render() {
    if (this.props.count <= 0) {
      return <div></div>;
    }

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#333',
          color: '#ccc',
          zIndex: this.props.count === 0 ? 0 : 25,
        }}
      >
        <span
          style={{
            top: '45%',
            left: '49%',
            position: 'absolute',
            fontSize: '100px',
          }}
        >
          {this.props.count}
        </span>
      </div>
    );
  }
}

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc1: null,
      imageSrc2: null,
    };
    this.preloadSlide();
  }

  preloadSlide() {
    fetch(
      `https://picsum.photos/${window.innerWidth}/${window.outerHeight}`,
      {
        method: 'GET',
        redirect: 'follow',
      }
    )
      .then(response => {
        if (this.props.slide % 2 === 0) {
          this.setState(prevState => ({
            ...prevState,
            imageSrc1: response.url,
          }));
        } else {
          this.setState(prevState => ({
            ...prevState,
            imageSrc2: response.url,
          }));
        }
      })
      .catch(function(err) {
        console.info(err + ' url: ' + url);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slide !== this.props.slide) {
      this.preloadSlide();
    }
  }

  render() {
    return (
      <div>
        <img
          src={this.state.imageSrc1}
          style={{
            position: 'absolute',
            left: this.props.slide % 2 === 0 ? -10000 : 0,
          }}
        />
        <img
          src={this.state.imageSrc2}
          style={{
            position: 'absolute',
            left: this.props.slide % 2 === 0 ? 0 : -10000,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            height: '20px',
            minWidth: '50px',
            backgroundColor: 'white',
            zIndex: 21,
            border: '1px solid #ccc',
            padding: '3px',
            textAlign: 'center',
          }}
        >
          {this.props.slide}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Bullshit />, document.querySelector('#container'));
