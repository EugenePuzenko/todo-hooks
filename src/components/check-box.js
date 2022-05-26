const CheckBox = ( { onClick } ) => {
    
    return (
        <input className="toggle" type="checkbox" onClick = { onClick } />
    )
};

export default CheckBox;