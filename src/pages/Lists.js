import React from 'react';
import { List } from 'react-virtualized';
import { Button } from '../components/index';
import 'react-virtualized/styles.css'; 
import './style.css';

const list = [
    'Start', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn',
    'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn',
    'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn',
    'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn',
    'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'End',
];

export default class Lists extends React.PureComponent {
    static rowRenderer({ key, index, style, ...other }) {
        return (
            <div
                key={key}
                style={style}
                className='listItem'
            >
                {list[index]}
            </div>
        )
    }
    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            scroll: 0,
            down: 0,
            index: 0,
            width: 200,
            height: 300,
        }
    }

    // 三个参数，显示的高度，总高度，距离顶部的位置
    handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
        this.setState({ scroll: scrollTop, down: scrollHeight - clientHeight });
    }

    handleTop = () => {
        this.setState({ scroll: 0 });
    }

    handleDown = () => {
        this.setState({ scroll: this.state.down + 2 });
    }

    handleAnimate = () => {
        let { timer } = this.state;
        timer = null;
        if (this.state.scroll > 0) {
            timer = setInterval(() => {
                const { scroll, down } = this.state;
                let isSpeed = Math.floor(- scroll / 10) - 2;
                if (scroll <= 0 ) {
                    clearInterval(timer);
                }
                this.setState({ scroll: scroll + isSpeed })
            }, 30);
            return;
        }
        timer = setInterval(() => {
            const { scroll, down } = this.state;
            let isSpeed = Math.floor((down - scroll) / 10) + 2;
            if (scroll >= down) {
                clearInterval(timer);
            }
            this.setState({ scroll: scroll + isSpeed })
        }, 30);
    }

    render() {
        const { width, height, scroll, index } = this.state;
        return (
            <div className="cont">
                <List
                    className="ListBox"
                    onScroll={this.handleScroll}
                    scrollTop={scroll}
                    scrollToIndex={index}
                    overscanRowCount={5}
                    /* 下面的属性必传 */
                    height={height}  // list 组件的高度
                    width={width} // list 组件的宽度
                    rowHeight={20} // 一列的高度
                    rowCount={list.length}  // list总条数
                    rowRenderer={Lists.rowRenderer}  // 渲染的list        
                />
                <Button onClick={this.handleTop} type="blue">顶部</Button>
                <Button onClick={this.handleDown} >底部</Button>
                <Button onClick={this.handleAnimate} >动画增强</Button>
            </div>
        );
    }
}