import React from 'react';
import { InfiniteLoader, List } from 'react-virtualized';
import { Button } from '../components/index';
import 'react-virtualized/styles.css';
import './style.css';

const lists=[];
for(let i=0;i<70;++i){
    lists.push(i);
}

export default class InfiniteLoaderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            scroll: 0,
            down: 0,
            index: 0,
            width: 200,
            height: 300,
            list: []
        }
    }

    // 返回false代表加载，true代表未加载
    isRowLoaded = ({ index }) => {
        return !!this.state.list[index];
    }

    // 上下滑动都会触发，所以需要自己判断是否应该执行数据操作
    // 必须返回一个Promise,stopIndex会返回数组长度-1
    loadMoreRows = ({ startIndex, stopIndex }) => {
        let { list } = this.state;
        if (stopIndex > list.length) {
            list = list.concat(lists.slice(startIndex, stopIndex + 1));
            this.setState({ list })
        }
        return Promise.resolve()
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

    // handleClear = () => {
    //     console.log('sss')
    //   this.setState({list:[]});
    //   this.isRowLoaded({index:0});
    // }

    rowRenderer = ({ key, index, style, ...other }) => {
        return (
            <div
                key={key}
                style={style}
                className='listItem'
            >
                {this.state.list[index]}
            </div>
        )
    }

    render() {
        const { width, height, scroll, index } = this.state;
        return (
            <div className="cont">
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    loadMoreRows={this.loadMoreRows}
                    rowCount={lists.length}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <List
                            className="ListBox"
                            onScroll={this.handleScroll}
                            scrollTop={scroll}
                            /* 下面的属性必传 */
                            onRowsRendered={onRowsRendered}
                            ref={registerChild} // 这个少了，第一次不会渲染
                            height={height}  // list 组件的高度
                            width={width} // list 组件的宽度
                            rowHeight={20} // 一列的高度
                            rowCount={lists.length}  // list总条数
                            rowRenderer={this.rowRenderer}  // 渲染的list        
                        />
                    )}
                </InfiniteLoader>
                <Button onClick={this.handleTop} type="blue">顶部</Button>
                <Button onClick={this.handleDown} >底部</Button>
                <Button onClick={this.handleAnimate} >动画增强</Button>
            </div>
        );
    }
}