/* 
* 按钮效果动画
* 使用：
* 引入less文件 @import './lines.less';
* 在需要的地方添加class: 
    .button{ 
        //添加光线默认样式
        .lines();
        // 设置光线颜色
        .set-lines-color(#01a4ff, #01ffc2);
    }
*
* 注意：无法使用在圆角较大的按钮上, 大于20就不行了
*/

import React from 'react';

const SvgRect = ({ width, height, borderRadius = 4, color }) => {
    const _style = { stroke: color };
    return (
        <svg viewBox={`0 0 ${width} ${height}`} style={color && _style}>
            <rect x='0' y='0' width='100%' height='100%' rx={borderRadius} ry={borderRadius} pathLength='10' />
        </svg>
    );
};

function Lines({ width, height, style, borderRadius = 4, color }) {
    const _width = width || style.width;
    const _height = height || style.height;
    const SvgRects = [0, 1, 2, 3, 4, 5].map((k) => (
        <SvgRect key={k.toString()} width={_width} height={_height} borderRadius={borderRadius} color={color} />
    ));

    return (
        <div className='__lines'>
            <div>{SvgRects}</div>
            <div>{SvgRects}</div>
        </div>
    );
}

export default Lines;
