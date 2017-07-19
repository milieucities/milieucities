import React, { Component } from 'react'
import { render } from 'react-dom'
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'
import Tooltip from 'rc-tooltip'
import Slider from 'rc-slider'

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} />
    </Tooltip>
  );
};

export default class Participez extends Component {
  constructor() {
    super()
    this.state = { loading: true, value: 10 };
    this.surveySentiment = document.querySelector('#participez').dataset.surveySentiment;
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <h1>Survey</h1>
        <div className="col-md-6">
      <Slider min={0} max={20} defaultValue={3} handle={handle} />
  </div>
    </div>
    )
  }
}


document.addEventListener('turbolinks:load', () => {
  const participez = document.querySelector('#participez');
  participez && render(<Participez/>, participez)
})
