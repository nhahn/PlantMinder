import React from 'react';
import AddPlantStore from '../stores/AddPlantStore'
import AddPlantActions from '../actions/AddPlantActions';
import {assign} from 'underscore';

class AddPlant extends React.Component {

  constructor(props) {
    super(props);
    this.state = AddPlantStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AddPlantStore.listen(this.onChange);
    this.controller = new ScrollMagic.Controller({globalSceneOptions: {
        triggerHook: 0.35
    }});
    var batteryTween = TweenMax.to("#battery1", 1, {className: "+=battery-transition"});
    this.batteryScene = new ScrollMagic.Scene({triggerElement: "#trigger1", duration: "25%", offset: -50})
					   .setTween(batteryTween)
					   //.addIndicators({name: "tween battery"}) // add indicators (requires plugin)
					   .addTo(this.controller);
    var batteryTween2 = TweenMax.to("#battery2", 1, {className: "+=battery-transition"});
    this.batteryScene = new ScrollMagic.Scene({triggerElement: "#trigger1", duration: "25%"})
					   .setTween(batteryTween2)
					   //.addIndicators({name: "tween battery 2"}) // add indicators (requires plugin)
					   .addTo(this.controller);
    this.stickScene = new ScrollMagic.Scene({triggerElement: "#fixed", duration: $('.panel').offset().top - $('#trigger1').offset().top - 200})
						.setPin("#device")
                        //.addIndicators({name: "1 (duration: 300)"})
                        .addTo(this.controller);
    var switchTween = TweenMax.to("#switch", 1, {yPercent: "-92%"});
    this.switchScene = new ScrollMagic.Scene({triggerElement: "#switchTrigger", duration: 80})
					   .setTween(switchTween)
					   //.addIndicators({name: "switch"}) // add indicators (requires plugin)
					   .addTo(this.controller);
    var wifiAnimation = TweenMax.staggerFromTo(".wifiBar", 2, {opacity:0}, {opacity:1, repeat: -1}, 0.2);
    var wifiTween = TweenMax.fromTo(".wifiBar", 2, {display: "none"}, {display: "initial"});
    this.wifiScene = new ScrollMagic.Scene({triggerElement: "#switchTrigger", offset: 80})
                       .setTween(wifiTween)
                       //.addIndicators({name: "wifi loop"}) // add indicators (requires plugin)
                       .addTo(this.controller);
    this.menuScene = new ScrollMagic.Scene({triggerElement: "#menuTrigger"})
					   .setClassToggle("#netDropDown", "showNet")
					   //.addIndicators({name: "menu"}) // add indicators (requires plugin)
					   .addTo(this.controller);
    this.menuWifiScene = new ScrollMagic.Scene({triggerElement: "#menuTrigger", offset: 50})
                       .setClassToggle(".wifiHighlight", "plantWifi")
					   //.addIndicators({name: "menu2"}) // add indicators (requires plugin)
					   .addTo(this.controller);
    this.typing = TweenMax.staggerFromTo(".st3 t", 1, {opacity: 0}, {opacity: 1, ease: Back.easeOut}, 0.2);
    this.wifiPageScene = new ScrollMagic.Scene({triggerElement: "#netTrigger", duration: 50})
                       .setTween(this.typing)
					   //.addIndicators({name: "menu2"}) // add indicators (requires plugin)
					   .addTo(this.controller);
    this.wifiPageShowScene = new ScrollMagic.Scene({triggerElement: "#netTrigger", offset: 50})
                       .setClassToggle(".webPage", "display")
					   //.addIndicators({name: "menu2"}) // add indicators (requires plugin)
					   .addTo(this.controller);
    var plantTween = TweenMax.to("#device", 1, {yPercent: 87, scale: 0.2});
    this.plantScene = new ScrollMagic.Scene({triggerElement: "#plantTrigger", duration: 100, offset: -100})
					   .setTween(plantTween)
					   //.addIndicators({name: "plant the sensor"}) // add indicators (requires plugin)
					   .addTo(this.controller);
  }

  componentWillUnmount() {
    AddPlantStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var sensor = this.state.sensorID.trim();

    if (!sensor || !sensor.match(/[a-z]+-[a-z]+-[a-z]+/)) {
      AddPlantActions.invalidId();
      this.refs.sensorIDField.getDOMNode().focus();
    } else {
      AddPlantActions.associateDevice({router: this.context.router, id: sensor});
    }
  }
  
  render() {
    
    return (
      <div className="container fadeInX animated">
        <div className='row'>
          <div className='col-sm-7 col-sm-offset-1 col-xs-9'>
            <h2 id="title">Adding a New Plant</h2>
            <p>In order to add a sensor to a new plant, you need perform a series of steps to setup the sensor, and then associate it with your account</p>
            <p>Just follow the instructions on this screen, and you will up and runnin in no time!</p>
          </div>
          <div className="col-sm-2 col-xs-3">
            <img src="/img/topPlant.svg" className="img-responsive"/>
          </div>
        </div>
        <hr/>
        <div className='row' id="fixed">
          <div className='col-sm-2 col-sm-offset-1 col-xs-3'>
            <img src="/img/device.svg" className="img-responsive" id="device"/>
          </div>
          <div className='col-xs-9' id="trigger1">
            {/*Battery Animation*/}
            <h4>First, ensure you device is powered up and has a fresh set of batteries</h4>
            <p>If you were having trouble recieving data from your device, it might have just run out of battery!</p>
            <img id="battery1" src="/img/battery.svg" style={{width: "15%"}}/><img id="battery2" src="/img/battery.svg" style={{width: "15%"}}/>
            {/*Switch Animation*/}
            <div className="spacer" style={{minHeight: 100}}></div>
            <h4 id="switchTrigger">Next, turn on your device</h4>
            <p>If you are trying to reset your device, turn it one for about 1 second, and then power it off. When you turn it on again, it should allow you to enter new WiFi settings</p>
             <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                 viewBox="-289 381.3 32 31.7" enable-background="new -289 381.3 32 31.7" style={{width: "16%"}}>
              <path fill="#363942" d="M-261,383.1h-24c-1.1,0-2,0.9-2,2v24c0,1.1,0.9,2,2,2h24c1.1,0,2-0.9,2-2v-24
                  C-259,384-259.9,383.1-261,383.1z"/>
              <rect x="-279" y="387.1" fill="#FFFFFF" width="12" height="20"/>
              <rect x="-277" y="397.1" fill="#363942" width="8" height="8" id="switch"/>
            </svg>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                   viewBox="1 77 462 509.8" enable-background="new 1 77 462 509.8" style={{width: '16%', marginLeft: 40}}>
              <path className="wifiBar" d="M47,365c-17.7,0-32-14.3-32-32c0-17.7,14.3-32,32-32s32,14.3,32,32C79,350.7,64.7,365,47,365z"/>
              <path className="wifiBar" d="M108.6,259.4L88,283.9c29.2,24.5,29.2,73.8,0,98.3l20.5,24.6c21.9-18.3,34.5-45.2,34.5-73.7
                  C143,304.5,130.5,277.6,108.6,259.4z"/>
              <path className="wifiBar" d="M154.4,214.4l-21.5,23.7c26.8,24.2,42.1,58.8,42.1,94.9c0,36.1-15.3,70.6-42,94.8l21.5,23.7C187.9,421.2,207,378.1,207,333
                  C207,287.9,187.8,244.7,154.4,214.4z"/>
              <path className="wifiBar" d="M199.9,169.3l-21.8,23.4C216.8,228.9,239,280,239,333c0,53.8-21.6,103.6-60.9,140.3l21.9,23.4c45.1-42.2,71-101.8,71-163.7
                  C271,271.2,245.1,211.5,199.9,169.3z"/>
              <path className="wifiBar" d="M245.3,124.1l-22,23.2C274.7,196.1,303,262.1,303,333c0,70.9-28.3,136.8-79.6,185.6l22,23.2C303.2,486.9,335,412.7,335,333
                  C335,253.2,303.1,179,245.3,124.1z"/>
              <path className="wifiBar" d="M399,333c0-96.5-38.6-186.6-108.7-253.8l-22.2,23.1C331.9,163.4,367,245.4,367,333c0,87.7-35.1,169.6-98.8,230.7l22.2,23.1
                  C360.4,519.6,399,429.5,399,333z"/>
            </svg>
 
            {/*Network Animation*/}         
            <h4 id="menuTrigger">Connect a computer, phone, or tablet to the <b>PlantMinder</b> WiFi network created by the device</h4>
            <p>It might take a few moments for the WiFi network to appear.</p>

            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                 viewBox="0 0 364.9 282.4" enable-background="new 0 0 364.9 282.4" style={{width: "50%", margin: "auto", display: "block"}}>
              <path fill="#4C6C32" stroke="#000000" stroke-width="3" stroke-miterlimit="10" d="M11.6,265.2c0,6.6,5.4,12,12,12h320
                  c6.6,0,12-5.4,12-12V40.3h-344V265.2z"/>
              <path fill="#FCFCF8" stroke="#000000" stroke-width="3" stroke-miterlimit="10" d="M343.6,10.2h-320c-6.6,0-12,5.4-12,12v18.1h344
                  V22.2C355.6,15.6,350.2,10.2,343.6,10.2z"/>
              <g>
                  <path fill="#010101" d="M103.5,34.5c0,1-0.8,1.9-1.9,1.9c-1,0-1.9-0.8-1.9-1.9s0.8-1.9,1.9-1.9C102.7,32.6,103.5,33.4,103.5,34.5z"
                      />
                  <path fill="#010101" d="M97.3,30.9l1.4,1.2c1.4-1.7,4.3-1.7,5.8,0l1.4-1.2c-1.1-1.3-2.7-2-4.3-2C100,28.8,98.4,29.6,97.3,30.9z"/>
                  <path fill="#010101" d="M94.7,28.2l1.4,1.3c1.4-1.6,3.5-2.5,5.6-2.5s4.1,0.9,5.6,2.5l1.4-1.3c-1.8-2-4.3-3.1-7-3.1
                      C99,25.1,96.4,26.2,94.7,28.2z"/>
                  <path fill="#010101" d="M92,25.5l1.4,1.3c2.1-2.3,5.1-3.6,8.2-3.6c3.2,0,6.1,1.3,8.2,3.6l1.4-1.3c-2.5-2.6-6-4.2-9.6-4.2
                      C98,21.3,94.5,22.8,92,25.5z"/>
                  <path fill="#010101" d="M89.4,22.8l1.4,1.3c2.9-3,6.7-4.7,10.9-4.7c4.2,0,8,1.7,10.9,4.7l1.4-1.3c-3.2-3.4-7.6-5.3-12.3-5.3
                      C96.9,17.6,92.6,19.4,89.4,22.8z"/>
                  <path fill="#010101" d="M101.6,13.8c-5.7,0-11,2.3-14.9,6.4l1.4,1.3c3.6-3.7,8.4-5.8,13.5-5.8c5.1,0,10,2.1,13.5,5.8l1.4-1.3
                      C112.6,16.1,107.3,13.8,101.6,13.8z"/>
              </g>
              <g>
                  <polygon fill="#010101" points="142,21.8 142,28 147.4,28 151.6,32.2 151.6,17.6 147.4,21.8 	"/>
                  <path fill="#010101" d="M157.6,24.9L157.6,24.9L157.6,24.9C157.6,24.9,157.6,24.9,157.6,24.9c0-2.7-0.9-5-2.8-7
                      c-0.7-0.7-1.7,0.4-1,1c1.6,1.7,2.3,3.6,2.4,5.9c0,2.3-0.8,4.2-2.4,5.9c-0.7,0.7,0.4,1.7,1,1C156.6,29.9,157.5,27.6,157.6,24.9
                      L157.6,24.9z"/>
                  <path fill="#010101" d="M161.3,24.9L161.3,24.9L161.3,24.9C161.3,24.9,161.3,24.9,161.3,24.9c-0.1-3.6-1.3-6.9-3.8-9.5
                      c-0.7-0.7-1.7,0.4-1,1c2.2,2.4,3.3,5.2,3.4,8.5c0,3.2-1.1,6.1-3.4,8.5c-0.7,0.7,0.4,1.7,1,1C160,31.8,161.2,28.6,161.3,24.9
                      L161.3,24.9z"/>
                  <path fill="#010101" d="M165,24.9L165,24.9L165,24.9c-0.1-4.6-1.7-8.8-4.8-12.1c-0.7-0.7-1.7,0.4-1,1c2.9,3,4.4,6.9,4.4,11
                      c0,4.2-1.5,8-4.4,11c-0.7,0.7,0.4,1.7,1,1C163.3,33.7,164.9,29.5,165,24.9C165,24.9,165,24.9,165,24.9L165,24.9z"/>
              </g>
              <g>
                  <path fill="#010101" d="M308,18.9h-0.7v-1.7c0-2.1-1.7-3.8-3.8-3.8h-49.7c-2.1,0-3.8,1.7-3.8,3.8v15.5c0,2.1,1.7,3.8,3.8,3.8h49.7
                      c2.1,0,3.8-1.7,3.8-3.8V31h0.7c1.7,0,3.2-1.4,3.2-3.2V22C311.2,20.3,309.8,18.9,308,18.9z M308.7,27.8c0,0.4-0.3,0.6-0.6,0.6h-3.2
                      v4.2c0,0.7-0.6,1.3-1.3,1.3h-49.7c-0.7,0-1.3-0.6-1.3-1.3V17.2c0-0.7,0.6-1.3,1.3-1.3h49.7c0.7,0,1.3,0.6,1.3,1.3v4.2h3.2
                      c0.3,0,0.6,0.3,0.6,0.6L308.7,27.8L308.7,27.8z"/>
                  <path fill="#010101" d="M301.8,17.2h-46.6c-0.7,0-1.3,0.6-1.3,1.3v12.9c0,0.7,0.6,1.3,1.3,1.3h46.6c0.7,0,1.3-0.6,1.3-1.3V18.5
                      C303.1,17.8,302.5,17.2,301.8,17.2z M280.2,27.7l-0.7,0.5l-0.7-2.2L266,30.3l10.8-8.1l0.7-0.5l0.7,2.2l12.7-4.2L280.2,27.7z"/>
              </g>
              <text transform="matrix(1 0 0 1 191.1095 30.8321)" font-size="18.7046px">100%</text>
              <g id="netDropDown">
              <rect x="76.9" y="40.3" fill="#FCFCF8" stroke="#010101" stroke-width="3" stroke-miterlimit="10" width="181.1" height="193.8"/>
              <g>
                  <text transform="matrix(1 0 0 1 92.3267 106.2575)" font-size="15px">GuestNetwork</text>
                  <g>
                      <path fill="#010101" d="M232.8,108c0,0.8-0.6,1.4-1.4,1.4s-1.4-0.6-1.4-1.4c0-0.8,0.6-1.4,1.4-1.4S232.8,107.2,232.8,108z"/>
                      <path fill="#010101" d="M228.1,105.3l1.1,0.9c1.1-1.3,3.3-1.3,4.4,0l1.1-0.9c-0.8-1-2-1.5-3.3-1.5
                          C230.1,103.8,228.9,104.3,228.1,105.3z"/>
                      <path fill="#010101" d="M226.1,103.3l1.1,1c1.1-1.2,2.6-1.9,4.2-1.9s3.1,0.7,4.2,1.9l1.1-1c-1.3-1.5-3.3-2.3-5.3-2.3
                          C229.4,100.9,227.5,101.8,226.1,103.3z"/>
                      <path fill="#010101" d="M224.1,101.2l1,1c1.6-1.7,3.9-2.7,6.2-2.7c2.4,0,4.6,1,6.2,2.7l1-1c-1.9-2-4.5-3.2-7.3-3.2
                          C228.7,98.1,226,99.2,224.1,101.2z"/>
                      <path fill="#010101" d="M222.1,99.2l1,1c2.2-2.3,5.1-3.5,8.2-3.5s6.1,1.3,8.2,3.5l1-1c-2.4-2.6-5.7-4-9.3-4
                          C227.9,95.2,224.6,96.7,222.1,99.2z"/>
                      <path fill="#010101" d="M231.4,92.4c-4.3,0-8.3,1.7-11.3,4.8l1,1c2.7-2.8,6.4-4.4,10.2-4.4c3.9,0,7.5,1.6,10.2,4.4l1-1
                          C239.7,94.1,235.7,92.4,231.4,92.4z"/>
                  </g>
              </g>
              <g>
                  <text transform="matrix(1 0 0 1 92.3265 134.2465)"  font-size="15px">SecureNet</text>
                  <g>
                      <path fill="#010101" d="M232.8,136c0,0.8-0.6,1.4-1.4,1.4s-1.4-0.6-1.4-1.4c0-0.8,0.6-1.4,1.4-1.4S232.8,135.2,232.8,136z"/>
                      <path fill="#010101" d="M228.1,133.3l1.1,0.9c1.1-1.3,3.3-1.3,4.4,0l1.1-0.9c-0.8-1-2-1.5-3.3-1.5
                          C230.1,131.8,228.9,132.3,228.1,133.3z"/>
                      <path fill="#010101" d="M226.1,131.2l1.1,1c1.1-1.2,2.6-1.9,4.2-1.9s3.1,0.7,4.2,1.9l1.1-1c-1.3-1.5-3.3-2.3-5.3-2.3
                          C229.4,128.9,227.5,129.8,226.1,131.2z"/>
                      <path fill="#010101" d="M224.1,129.2l1,1c1.6-1.7,3.9-2.7,6.2-2.7c2.4,0,4.6,1,6.2,2.7l1-1c-1.9-2-4.5-3.2-7.3-3.2
                          C228.7,126.1,226,127.2,224.1,129.2z"/>
                      <path fill="#010101" d="M222.1,127.2l1,1c2.2-2.3,5.1-3.5,8.2-3.5s6.1,1.3,8.2,3.5l1-1c-2.4-2.6-5.7-4-9.3-4
                          C227.9,123.2,224.6,124.6,222.1,127.2z"/>
                      <path fill="#010101" d="M231.4,120.4c-4.3,0-8.3,1.7-11.3,4.8l1,1c2.7-2.8,6.4-4.4,10.2-4.4c3.9,0,7.5,1.6,10.2,4.4l1-1
                          C239.7,122.1,235.7,120.4,231.4,120.4z"/>
                  </g>
                  <path fill="#010101" d="M210.3,127.9v-3.2c0-3.5-2.9-6.4-6.4-6.4s-6.4,2.9-6.4,6.4v3.2h-1.2v11.7h15.1v-11.7H210.3z M199.3,124.8
                      c0-2.6,2.1-4.7,4.7-4.7c2.6,0,4.7,2.1,4.7,4.7v3.2h-9.3V124.8z"/>
              </g>
              <rect x="78.6" y="144.7" fill="#1D75BC" width="177.8" height="26.1" className="wifiHighlight" id="wifiHighlight"/>
              <g className="wifiHighlight">
                  <text transform="matrix(1 0 0 1 92.3265 162.2355)" fill="#010101"  font-size="15px">PlantMinder</text>
                  <g>
                      <path fill="#010101" d="M232.8,164c0,0.8-0.6,1.4-1.4,1.4c-0.8,0-1.4-0.6-1.4-1.4c0-0.8,0.6-1.4,1.4-1.4
                          C232.2,162.6,232.8,163.2,232.8,164z"/>
                      <path fill="#010101" d="M228.1,161.3l1.1,0.9c1.1-1.3,3.3-1.3,4.4,0l1.1-0.9c-0.8-1-2-1.5-3.3-1.5
                          C230.1,159.7,228.9,160.3,228.1,161.3z"/>
                      <path fill="#010101" d="M226.1,159.2l1.1,1c1.1-1.2,2.6-1.9,4.2-1.9c1.6,0,3.1,0.7,4.2,1.9l1.1-1c-1.3-1.5-3.3-2.3-5.3-2.3
                          C229.4,156.9,227.5,157.8,226.1,159.2z"/>
                      <path fill="#010101" d="M224.1,157.2l1,1c1.6-1.7,3.9-2.7,6.2-2.7c2.4,0,4.6,1,6.2,2.7l1-1c-1.9-2-4.5-3.2-7.3-3.2
                          C228.7,154.1,226,155.2,224.1,157.2z"/>
                      <path fill="#010101" d="M222.1,155.2l1,1c2.2-2.3,5.1-3.5,8.2-3.5c3.1,0,6.1,1.3,8.2,3.5l1-1c-2.4-2.6-5.7-4-9.3-4
                          C227.9,151.2,224.6,152.6,222.1,155.2z"/>
                      <path fill="#010101" d="M231.4,148.4c-4.3,0-8.3,1.7-11.3,4.8l1,1c2.7-2.8,6.4-4.4,10.2-4.4c3.9,0,7.5,1.6,10.2,4.4l1-1
                          C239.7,150.1,235.7,148.4,231.4,148.4z"/>
                  </g>
              </g>
              <g>
                  <text transform="matrix(1 0 0 1 92.3264 190.2244)"  font-size="15px">FiosWiFi</text>
                  <g>
                      <path fill="#010101" d="M232.8,192c0,0.8-0.6,1.4-1.4,1.4c-0.8,0-1.4-0.6-1.4-1.4c0-0.8,0.6-1.4,1.4-1.4
                          C232.2,190.6,232.8,191.2,232.8,192z"/>
                      <path fill="#010101" d="M228.1,189.3l1.1,0.9c1.1-1.3,3.3-1.3,4.4,0l1.1-0.9c-0.8-1-2-1.5-3.3-1.5
                          C230.1,187.7,228.9,188.3,228.1,189.3z"/>
                      <path fill="#010101" d="M226.1,187.2l1.1,1c1.1-1.2,2.6-1.9,4.2-1.9c1.6,0,3.1,0.7,4.2,1.9l1.1-1c-1.3-1.5-3.3-2.3-5.3-2.3
                          C229.4,184.9,227.5,185.7,226.1,187.2z"/>
                      <path fill="#010101" d="M224.1,185.2l1,1c1.6-1.7,3.9-2.7,6.2-2.7c2.4,0,4.6,1,6.2,2.7l1-1c-1.9-2-4.5-3.2-7.3-3.2
                          C228.7,182.1,226,183.2,224.1,185.2z"/>
                      <path fill="#010101" d="M222.1,183.2l1,1c2.2-2.3,5.1-3.5,8.2-3.5c3.1,0,6.1,1.3,8.2,3.5l1-1c-2.4-2.6-5.7-4-9.3-4
                          C227.9,179.2,224.6,180.6,222.1,183.2z"/>
                      <path fill="#010101" d="M231.4,176.4c-4.3,0-8.3,1.7-11.3,4.8l1,1c2.7-2.8,6.4-4.4,10.2-4.4c3.9,0,7.5,1.6,10.2,4.4l1-1
                          C239.7,178.1,235.7,176.4,231.4,176.4z"/>
                  </g>
                  <path fill="#010101" d="M210.3,183.9v-3.2c0-3.5-2.9-6.4-6.4-6.4c-3.5,0-6.4,2.9-6.4,6.4v3.2h-1.2v11.7h15.1v-11.7H210.3z
                       M199.3,180.7c0-2.6,2.1-4.7,4.7-4.7c2.6,0,4.7,2.1,4.7,4.7v3.2h-9.3V180.7z"/>
              </g>
              <g>
                  <text transform="matrix(1 0 0 1 92.3265 80.2686)"  font-size="15px">NetworkA</text>
                  <g>
                      <path fill="#010101" d="M232.8,80c0,0.8-0.6,1.4-1.4,1.4S230,80.8,230,80c0-0.8,0.6-1.4,1.4-1.4S232.8,79.3,232.8,80z"/>
                      <path fill="#010101" d="M228.1,77.3l1.1,0.9c1.1-1.3,3.3-1.3,4.4,0l1.1-0.9c-0.8-1-2-1.5-3.3-1.5
                          C230.1,75.8,228.9,76.3,228.1,77.3z"/>
                      <path fill="#010101" d="M226.1,75.3l1.1,1c1.1-1.2,2.6-1.9,4.2-1.9s3.1,0.7,4.2,1.9l1.1-1c-1.3-1.5-3.3-2.3-5.3-2.3
                          C229.4,72.9,227.5,73.8,226.1,75.3z"/>
                      <path fill="#010101" d="M224.1,73.3l1,1c1.6-1.7,3.9-2.7,6.2-2.7c2.4,0,4.6,1,6.2,2.7l1-1c-1.9-2-4.5-3.2-7.3-3.2
                          C228.7,70.1,226,71.2,224.1,73.3z"/>
                      <path fill="#010101" d="M222.1,71.2l1,1c2.2-2.3,5.1-3.5,8.2-3.5s6.1,1.3,8.2,3.5l1-1c-2.4-2.6-5.7-4-9.3-4
                          C227.9,67.3,224.6,68.7,222.1,71.2z"/>
                      <path fill="#010101" d="M231.4,64.4c-4.3,0-8.3,1.7-11.3,4.8l1,1c2.7-2.8,6.4-4.4,10.2-4.4c3.9,0,7.5,1.6,10.2,4.4l1-1
                          C239.7,66.1,235.7,64.4,231.4,64.4z"/>
                  </g>
                  <path fill="#010101" d="M210.3,72v-3.2c0-3.5-2.9-6.4-6.4-6.4s-6.4,2.9-6.4,6.4V72h-1.2v11.7h15.1V72H210.3z M199.3,68.8
                      c0-2.6,2.1-4.7,4.7-4.7c2.6,0,4.7,2.1,4.7,4.7V72h-9.3V68.8z"/>
              </g>
              </g>
            </svg>
            <h4 id="netTrigger">A connection screen should appear on your device, or try to navigate to a URL in your browser</h4>
            <p>A connection screen might take a little while to appear. If entering a URL in the browser, you should automatically be redirected to the device connection page</p>
            <svg version="1.1" id="connectionWindow" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" style={{width: "50%", margin: "auto", display: "block"}} viewBox="-251.9 353.1 93.7 62.3">
              <path className="st0" d="M-250,358c0-1.7,1.3-3,3-3h84c1.7,0,3,1.3,3,3v52c0,1.7-1.3,3-3,3h-84c-1.7,0-3-1.3-3-3V358z"/>
              <path className="st1" d="M-248,364h86v45c0,1.1-0.9,2-2,2h-82c-1.1,0-2-0.9-2-2V364z"/>
              <circle className="st1" cx="-246.5" cy="359.5" r="1.5"/>
              <circle className="st1" cx="-241.5" cy="359.5" r="1.5"/>
              <circle className="st1" cx="-236.5" cy="359.5" r="1.5"/>
              <path className="st1" d="M-231,358c0-0.6,0.4-1,1-1h65c0.6,0,1,0.4,1,1v3c0,0.6-0.4,1-1,1h-65c-0.6,0-1-0.4-1-1V358z"/>
              <foreignObject transform="matrix(1 0 0 1 -228.1486 357.0001)" className="st2 st3">
                <t>h</t><t>t</t><t>t</t><t>p</t><t>:</t><t>/</t><t>/</t><t>1</t><t>9</t><t>2</t><t>.</t><t>1</t><t>6</t><t>8</t><t>.</t><t>1</t><t>.</t><t>4</t>
              </foreignObject>
              <g className="webPage">
                  <rect x="-248" y="364" className="st4" width="86" height="6.4"/>
                  <text transform="matrix(1 0 0 1 -246.6543 368.7881)" className="st1 st2 st5">PlantMinder</text>
                  <path className="st6" d="M-198.5,382.1H-216c-0.6,0-1-0.4-1-1v-4.7c0-0.6,0.4-1,1-1h17.5c0.6,0,1,0.4,1,1v4.7
                      C-197.5,381.6-197.9,382.1-198.5,382.1z"/>
                  <path className="st6" d="M-198.5,390.8H-216c-0.6,0-1-0.4-1-1v-4.7c0-0.6,0.4-1,1-1h17.5c0.6,0,1,0.4,1,1v4.7
                      C-197.5,390.4-197.9,390.8-198.5,390.8z"/>
                  <text transform="matrix(1 0 0 1 -210.4509 379.8766)" className="st1 st2 st7">Scan</text>
                  <text transform="matrix(1 0 0 1 -212.0738 388.5013)" className="st1 st2 st7">Manual</text>
              </g>
            </svg>
            <h4 id="credTrigger">Enter your WiFi credentials into the web page. Your device will restart and try to connect to the WiFi network.</h4>
            <p>If there was an error, the device will restart and the <b>PlantMinder</b> will reappear. Reconnect to the network and try your credentials again</p>
            <h4>Finally, enter the device identifier found on the back of the device into the form below. This will associated the device with your account.</h4>
              <p>If trying to tranfer a device from one person to another, contact <a href="mailto:nphahn@gmail.com">nphahn@gmail.com</a></p>
          </div>
        </div>
        <div className='row' id="plantTrigger">
          <div className='col-sm-2 col-sm-offset-1 col-xs-3'>
            <img src="/img/plantTop.svg" className="img-responsive" style={{zIndex: -10, position: 'relative'}}/>
            <img src="/img/tableBottom.svg" className="img-responsive" style={{zIndex: 3, position: 'relative'}}/>
          </div>
          <div className='col-xs-9'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add Sensor</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.idValidationState? this.state.idValidationState : ''}>
                    <label className='control-label'>Sensor ID</label>
                    <input type='text' className='form-control' ref='sensorIDField' value={this.state.sensorId}
                           onChange={AddPlantActions.updateId}/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className="form-group pull-left">
                    <button type='submit' className='btn btn-primary btn-space'>Add Sensor</button> 
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="spacer" style={{minHeight: 100}}></div>
      </div>
    )
  }
      
}

AddPlant.contextTypes = { 
    router: React.PropTypes.func.isRequired
};

export default AddPlant;
