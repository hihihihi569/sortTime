import React, { Component } from 'react'

export default class RollComponent extends Component {
    componentDidMount() {
        window.onload = roll(60);
        var ul1 = document.getElementById("ul1");
        var ul2 = document.getElementById("ul2");
        var box = document.getElementById("box");
        ul2.innerHTML = ul1.innerHTML;
        console.log('ul1',ul1.innerHTML,'ul2',ul2.innerHTML)
        function roll(t) {
            box.scrollTop = 0;
            var timer = setInterval(rollStart, t);
            box.onmouseover = function () {
                clearInterval(timer)
            }
            box.onmouseout = function () {
                timer = setInterval(rollStart, t);
            }
        }

        function rollStart() {
            if (box.scrollTop >= ul1.scrollHeight) {
                box.scrollTop = 0;
            } else {
                box.scrollTop++;
            }
        }
    }

    render() {
        return (
            <div>
                <div id="box">
                    <ul id="ul1">
                        <li>1111111111111111111111</li>
                        <li>2222222222222222222222</li>
                        <li>3333333333333333333333</li>
                        <li>4444444444444444444444</li>
                        <li>5555555555555555555555</li>
                        <li>6666666666666666666666</li>
                        <li>7777777777777777777777</li>
                        <li>8888888888888888888888</li>
                        <li>9999999999999999999999</li>
                    </ul>
                    <ul id="ul2"></ul>
                </div>

            </div>
        )
    }
}
