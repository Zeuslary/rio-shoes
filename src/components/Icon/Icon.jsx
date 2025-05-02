function Icon({ icon, name, width = 24, height = 24, ...props }) {
    return <img src={icon} alt={name} width={width} height={height} {...props} />;
}

export default Icon;
