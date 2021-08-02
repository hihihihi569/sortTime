import React, { Component } from 'react'

export default class InfiniteRoll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            winner:[
                {
                    "Acct": "186****23",
                    "Prize": "5元红包",
                    "Date": "2019-09-21"
                  } ,{
                   "Acct": "111****23",
                   "Prize": "20元红包",
                   "Date": "2019-09-22"
                 }, {
                   "Acct": "156****23",
                   "Prize": "100元红包",
                   "Date": "2019-09-23"
                 },{
                    "Acct": "186****23",
                    "Prize": "5元红包",
                    "Date": "2019-09-24"
                  } ,{
                   "Acct": "111****23",
                   "Prize": "20元红包",
                   "Date": "2019-09-25"
                 }, {
                   "Acct": "156****23",
                   "Prize": "100元红包",
                   "Date": "2019-09-26"
                 },{
                    "Acct": "186****23",
                    "Prize": "5元红包",
                    "Date": "2019-09-27"
                  } ,{
                   "Acct": "111****23",
                   "Prize": "20元红包",
                   "Date": "2019-09-28"
                 }, {
                   "Acct": "156****23",
                   "Prize": "100元红包",
                   "Date": "2019-09-29"
                 },{
                    "Acct": "186****23",
                    "Prize": "5元红包",
                    "Date": "2019-09-30"
                  } ,{
                   "Acct": "111****23",
                   "Prize": "20元红包",
                   "Date": "2019-09-31"
                 }, {
                   "Acct": "156****23",
                   "Prize": "100元红包",
                   "Date": "2019-10-1"
                 }
            ]
       }
    }

    changeAnim = () => {
        const { winner,animate } = this.state
        setTimeout(() => {
          winner.push(winner[0]);
          winner.shift();
          this.setState({
            winner,
            animate: false
          })
        }, 500)
      }
       componentWillMount() {
        if(this.state.winner.length>6){
          setInterval(() => {
            this.setState({animate: true})
            this.changeAnim()
          }, 1000);
        }
      
      }
    render() {
        const list = this.state.winner.map((e, i) => {
            return (
              <li key={'allrecords' + i}>
                <div>{e.Acct}</div>
                <div>抽中{e.Prize}</div>
                <span>{e.Date}</span>
              </li>
            )
          })
           return (
            <div>
              <div className='roll'>
                    <ul className='anim'>
                      {list}
                    </ul>
            </div>
            </div>
         )
    }
}
