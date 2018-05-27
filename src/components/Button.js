import React from 'react';
import classNames from 'classnames';
import './style.css';

export default function Button(props) {
    return <p className={classNames(`button button-${props.type}`)} onClick={props.onClick}>{props.children}</p >;
}