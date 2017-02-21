import React, {Component} from 'react';

const Textfield = ({error, value, onChange, widthClass, label, labelPlace, discardButton}) => {
    var divClassname = "form-group label-floating full-width"; // set the width
    var labelClassname = "control-label";
    var jumbotron = "";
    var inputGroup = "";

    if (labelPlace === 'top') {
        jumbotron = "jumbotron";
    }

    if (error && (error !== '')) {
        divClassname = divClassname + " has-error";
    }

    if (value === null || value === undefined) {
        value = ''
    }
    if (discardButton) {
        inputGroup = "input-group"
    }

    if(widthClass == null){
         divClassname = "form-group full-width";
         labelClassname = labelClassname + " col-md-3";
         inputGroup  = inputGroup + " col-md-9";
    }

    return (
        <div className={widthClass}>
            <div className={jumbotron}>
                <div className={divClassname}>
                    <label className={labelClassname} htmlFor={label}>{label}</label>
                    <div className={inputGroup}>
                        <input
                            id={label}
                            className="form-control full-width"
                            type="text"
                            value={value}
                            onChange={onChange}
                            onClick={onChange}
                        />
                        {discardButton}
                    </div>
                    <h6 id={label} className="error-message">{error}</h6>
                </div>
            </div>
        </div>
    )
};

export default Textfield;

