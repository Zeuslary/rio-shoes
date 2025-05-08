import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import styles from './Button.module.scss';

function Button({
    children,
    customStyle,
    to,
    href,
    primary = false,
    outline = false,
    deepBlack = false,
    red = false,
    gray = false,
    rounder = false,
    superSmall = false,
    small = false,
    large = false,
    bold = false,
    canHover = false,
    disabled = false,
    leftIcon,
    rightIcon,
    onClick,
}) {
    let Comp = 'button';
    const props = {
        onClick,
    };

    const classNames = clsx(
        styles['wrapper'],
        primary && styles['primary'],
        outline && styles['outline'],
        deepBlack && styles['deep-black'],
        red && styles['red'],
        gray && styles['gray'],
        rounder && styles['rounder'],
        superSmall && styles['super-small'],
        small && styles['small'],
        large && styles['large'],
        bold && styles['bold'],
        canHover && styles['can-hover'],
        disabled && styles['disabled'],
        customStyle && customStyle,
    );

    if (to) {
        Comp = Link;
        props.to = to;
    } else if (href) {
        Comp = 'a';
        props.href = href;
    }

    return (
        <Comp className={classNames} {...props}>
            {leftIcon && leftIcon}
            <span>{children}</span>
            {rightIcon && rightIcon}
        </Comp>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    deepBlack: PropTypes.bool,
    red: PropTypes.bool,
    gray: PropTypes.bool,
    rounder: PropTypes.bool,
    superSmall: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    bold: PropTypes.bool,
    canHover: PropTypes.bool,
    disabled: PropTypes.bool,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
