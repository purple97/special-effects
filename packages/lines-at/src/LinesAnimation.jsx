import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Lines from './lines';
import './LinesAnimation.less';

/*
 * 按钮效果动画
 * children, <ReactElement|String>, 内嵌元素
 * color?, <String>, 光线颜色
 * type?, <String>, 光线类型 'none|gradient|transparent'
 * hover? = true, <Boolean>, 'true'时，鼠标移入时显示光线
 * active? = false, <Boolean>, 'true'时，显示光线
 */
const LinesAnimation = ({ children, color, type, hover = true, active = false }) => {
    const child = React.Children.only(children);
    const [linesMod, setLinesMod] = useState(null);
    let buttonRef = useRef(null);
    const styleType = type ? `button-${type}` : 'button-transparent';
    const newChild = React.cloneElement(
        child,
        {
            className: classNames(child.props.className, 'button', styleType),
            style: child.props.style
        },
        [child.props.children, linesMod]
    );

    const play = (e) => {
        e.target.classList.add('start');
        setTimeout(() => {
            e.target.classList.remove('start');
        }, 500);
    };
    const stop = (e) => {
        e.target.classList.remove('start');
    };

    useEffect(() => {
        if (buttonRef.current && buttonRef.current.childNodes) {
            const _current = buttonRef.current.childNodes[0];
            const { clientWidth, clientHeight } = _current;
            const Style = window.getComputedStyle(_current, null);
            const borderRadius = parseInt(Style.getPropertyValue('border-radius'));
            const bgColor = Style.getPropertyValue('background-color');
            if (!bgColor.match(/^(rgb|rgba|#)/)) {
                throw new Error('Only "RGB, RGBA, #" three color formats are supported');
                return;
            }
            const linesColor = color ? color : bgColor;
            setLinesMod(
                <Lines
                    key={new Date().getTime().toString()}
                    width={clientWidth}
                    height={clientHeight}
                    borderRadius={borderRadius}
                    color={type === 'none' ? linesColor : undefined}
                />
            );
        }
    }, [color, type]);

    useEffect(() => {
        if (buttonRef.current && buttonRef.current.childNodes) {
            const _current = buttonRef.current.childNodes[0];
            if (hover) {
                _current.addEventListener('mouseenter', play);
                _current.addEventListener('mouseleave', stop);
            }
            return () => {
                _current.removeEventListener('mouseenter', play);
                _current.removeEventListener('mouseleave', stop);
            };
        }
    }, [hover]);

    useEffect(() => {
        if (buttonRef.current && buttonRef.current.childNodes && active)
            play({
                target: buttonRef.current.childNodes[0]
            });
    }, [active]);

    return (
        <div ref={buttonRef} className='animation-button-lines'>
            {newChild}
        </div>
    );
};

export default LinesAnimation;
