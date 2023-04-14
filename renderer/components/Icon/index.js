import React from 'react';
import chevron from '../../assets/icons/bx chevron-down.svg';
import robot from '../../assets/icons/fluent-emoji robot.svg';
import close from '../../assets/icons/mdi close-circle.svg';

const iconComponents = {
    chevron: chevron,
    robot: robot,
    close: close,
};

const Icon = ({ name, width = 24, height = 24, fill = 'white', ...props }) => {
    const IconComponent = iconComponents[name];

    if (!IconComponent) {
        return null;
    }

    return <IconComponent width={width} height={height} fill={fill} {...props} />;
};

export default Icon;