import { createGlobalStyle } from 'styled-components';

export const GlobalStyle_Icon = createGlobalStyle`
  @font-face {font-family: "iconfont";
    src: url('./iconfont.eot?t=1555079015700'); /* IE9 */
    src: url('./iconfont.eot?t=1555079015700#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMMAAsAAAAABxAAAALAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqBeIF8ATYCJAMMCwgABCAFhG0HNxtDBhHVk7dkH6cr4j/5KiMV/44AkoucxeEllAAQu3L56hJXD5eJy1S6zbmmnoyKUCO583uPvpACbmme/udwaVN8fstymWtSVoDxtl5AY22KqDuQE/RTgV3EHozTBFTVUndhxKgJM5RlmBQQNqxdvVQ555BlKVwWFGtWZuGKgnI8G3/A5fD3wx/6hjJRIcHMKatGrjDk52q/Tk1HKkcs8BGY8+kgrSOhOzJhUa1hjhQHukuqGrxs5lOUBXEud6VCyDB5RfqHRxQIRUitDjpzwcjP1VwykV+nsu66KIGi12gfhf0zZBGlOnWq45DdM27cdefOjDBjZrh/f/bRe7NmZeOO3J06++Y91Wf5vXuzwpi7d2feubOomhbRsnfeu7f3XMNVL772UYOVL7zc/p/rc+c+7bV9aDz91Ven45DD+GrIjfzvv/nG/OHv/HNMK6/06mXnF1fS7dvparri866ItJTGUtmsq21ffPfduI9k777n6eN773Hvvvdui+1nqu3esvnVDV9/sm25/lNtrUHl7fRzWvLb/8agyQ+aLK414O9ytQwe3Lu9OlxROZKlIyiL9Gb+5E45QJbZUKasC7SmBiTtb9gXUZXcVMBS17PxkgYvEgrKGqQQlbSApKw9MmO7Q0E1/aGobDBU1c3o9dXUs00SchV0dZKBoLZPIarpFiS1/YjM2KdQ0NBfUFQ7JKhqVqi3YzVqx+AvwwkFowb5B69qMY6aL1H6De07CcqyQ9wLqXk3TP1YDF+xIM0xp33szGzAUM2wMudhShU2qgEV9455W4bB1H2oVzV3F8MRJDCkAekPeEpVGL86u5R+/gZZb4lALSUNyhdEGt89mPTGHsiroPQquZd3mg9rxpgBDFJlYGV0KFGgAlv9sAAprOdG+DaLgatk+gr69UX5+9ZAVTgwhRhSyPL2zZfDdhSkXNcB') format('woff2'),
    url('./iconfont.woff?t=1555079015700') format('woff'),
    url('./iconfont.ttf?t=1555079015700') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
    url('./iconfont.svg?t=1555079015700#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-spin:before {
    content: "\e851";
  }

  .icon-search:before {
    content: "\e60b";
  }

`;
