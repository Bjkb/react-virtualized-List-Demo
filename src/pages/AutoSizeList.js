import React from 'react';
import { AutoSizer, List, CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { Button } from '../components/index';
import 'react-virtualized/styles.css';
import './style.css';

const list = [
    'Start', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn',
    'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn',
    'Brian Vaughn', 'Brian Vaughn', 'Brian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian VaughnBrian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn',
    'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn',
    'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'Brian Vaughn', 'End',
];

export default class AutoSizeList extends React.PureComponent {
    static measureCache = new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 58
    })

    static rowRenderer({ index, key, parent, style }) {
        // row的高度是不固定，采用CellMeasurer的方式，但是内部一定要加上style，不然滑动会出现问题
        return (
            <CellMeasurer
                cache={AutoSizeList.measureCache}
                columnIndex={0}
                key={key}
                parent={parent}
                rowIndex={index}
            >
                <div
                    style={style}
                    className='listItem'
                >
                   {list[index]}
                </div>
            </CellMeasurer>
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
                if (scroll <= 0) {
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
        const { scroll, index } = this.state;
        return (
            <div className="cont">
                <div className="autoSizer">
                    {/* 如果AutoSizer被div元素包裹，父组件必须得有高度  */}
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                className="ListBox"
                                onScroll={this.handleScroll}
                                scrollTop={scroll}
                                scrollToIndex={index}
                                overscanRowCount={5}
                                /* 下面的属性必传 */
                                height={height}  // list 组件的高度
                                width={width} // list 组件的宽度
                                deferredMeasurementCache={AutoSizeList.measureCache}
                                rowHeight={AutoSizeList.measureCache.rowHeight} // 一列的高度
                                rowCount={list.length}  // list总条数
                                rowRenderer={AutoSizeList.rowRenderer}  // 渲染的list        
                            />
                        )}
                    </AutoSizer>
                </div>
                <Button onClick={this.handleTop} type="blue">顶部</Button>
                <Button onClick={this.handleDown} >底部</Button>
                <Button onClick={this.handleAnimate} >动画增强</Button>
            </div>
        );
    }
}