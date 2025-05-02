import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import styles from './Button.module.scss';

function Button({
    children,
    to,
    href,
    primary = false,
    outline = false,
    deepBlack = false,
    red = false,
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
        rounder && styles['rounder'],
        superSmall && styles['super-small'],
        small && styles['small'],
        large && styles['large'],
        bold && styles['bold'],
        canHover && styles['can-hover'],
        disabled && styles['disabled'],
    );

    if (to) {
        Comp = <Link />;
        props.to = to;
    } else if (href) {
        Comp = 'a';
        props.href = href;
    }

    return (
        <Comp className={classNames} {...props}>
            {leftIcon && leftIcon()}
            {children}
            {rightIcon && rightIcon()}
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
    rounder: PropTypes.bool,
    superSmall: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    bold: PropTypes.bool,
    canHover: PropTypes.bool,
    disabled: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};

export default Button;
