import React from 'react';

class Cropper extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      editingImage: false
    };
  }
  
  componentDidMount() {
    var loaded = true;
    this.cropit = $('#image-cropper').cropit({ 
      imageState: { src: (this.props.image)? this.props.image : this.props.filler },
      imageBackground: true,
      onImageLoaded: () => {
        if (!loaded)
          this.setState({editingImage: true});
        else
          loaded = false;
      }
    });
  }
  
  saveImage() { //Convert to bas64, resize, and then upload
    var image = $(this.cropit).cropit('export', {
      type: 'image/jpeg',
      quality: .9,
      originalSize: false
    });
    this.props.uploadImage(image);
  }
  
  componentWillReceiveProps(nextProps) { 
  }
  
  render() {    
    
    return (
      <div>
        <div style={{height: 250, position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', paddingLeft: 30}}>
            <div id="image-cropper" className="img-responsive">
              <div className="cropit-image-preview-container">
                <div className="cropit-image-preview" style={{width: 200, height: 200}}></div>
              </div>
              <input type="range" style={{width: 200, visibility: (this.state.editingImage)? 'visible': 'hidden'}} id="imageZoom" className="cropit-image-zoom-input" />
              <input type="file" style={{visibility: 'hidden'}} className="cropit-image-input" />
            </div>
          </div>
        </div>
        <div className="row" syle={{paddingTop: 10}} style={{textAlign: 'center'}}>
          <button className="btn btn-default btn-space" onClick={() => $('.cropit-image-input').click()}>Change Picture</button>&nbsp;
          <button className="btn btn-primary" onClick={this.saveImage.bind(this)}>Save Picture</button>
        </div>
      </div>
    );
  }
}

export default Cropper;