/**
 * @name: ic-animate ;
 * @author: admin ;
 * @description: 实现react动画 ;
 * */
import React, {PureComponent} from 'react'
import TWEEN, {Tween} from '@tweenjs/tween.js'
import raf from 'raf'

const animate = () => {
    raf(animate);
    TWEEN.update();
};

const createTween=({start, to, easing, delay, repeat, yoyo})=>{
    const tween=new Tween(start);
    to.forEach((item) => {
        tween.to(...item);
    });
    tween.easing(easing).delay(delay).repeat(repeat).yoyo(yoyo);

    return tween;
};


export default class Animate extends PureComponent {
    constructor(props) {
        super(props);
        const {start, to, easing, delay, repeat, yoyo} = props;
        animate();
        this.state = {
            props: start
        };
        this.tween=createTween(props);
    }

    componentDidMount() {
        this.tween.start();
    }

    render() {
        const {start, to, easing, delay, repeat, yoyo, children, ...props} = this.props;
        return <span {...props}>{children(this.state.props)}</span>
    }
}
