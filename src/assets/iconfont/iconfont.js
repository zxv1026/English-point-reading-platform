import { createGlobalStyle } from 'styled-components';

export const GlobalStyle_Icon = createGlobalStyle`
  @font-face {font-family: "iconfont";
    src: url('./iconfont.eot?t=1551531932872'); /* IE9 */
    src: url('./iconfont.eot?t=1551531932872#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALAAAsAAAAABnwAAAJzAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBCIEcATYCJAMICwYABCAFhG0HMBvCBRHVky9kXxzYjinGFF2yHcmy4zEgfJlgPwdRrVVZ3T17fYQKUV2cRAQFzwoAJWlUgBJQAsnXAw65ecAWWeb19tv2SLuSFhIWeR36t4pup9hu38pgKAB84t7p/w2gQOY773KZY9LEAOPOB9DeGEVWJon3IQ57ZT6GAD5Ek4mUlNW0YDFYqwSQmcnxQWwujMEIOYvgqTloRI7gYNUh9Ro4HH5f/pAlFhSOxmpoGCsdoeC77AK97W7T4xNEQKDjDqCBTMCAtNSm69CIwND4pA3xsK9age++rutbkb2aEOGvs6r9AIhE8T1JXOmt8ioADIyGRKBwVAC0nzV5+B1tf/vW2vY5ypZImL0YNh1Bp87fDseTZxLf94/oJ0/0UX3EVx7hhakQBdhwdHlLXbumtmzjteueS12/Tr90/VpUPOi7vjB/buZZFhYevA2iAAD3iv6uBxBA4GlCyJUhMOe/lQHgw5UrF8Kge8XQzwv2DB6BPzXMCIARZVZaGaClVQBFIvoOmnzwAVzIH8K3sfrw28oLlvCb83oRlTo1VpcgaeiZcPAlGx4s+fAhg/LjvoSyhEaMN5DOPoAQxB0oAngMTRBvSEP/CocI/sFDkGj40CahF/qSLJpVGSfBFeY/2OXYybGJimpvqN9h4qwsZL6Qo41BXVTFXI878hxb4kc3IgTExwYdPIchHHDy4XCRwoicbVlS3ZuK5dgSlWScBFeY/2CXYye/v6jS52+o32Hilq4a/ws52vGhLqoeZK/ee3XdyyvxoxsRAuJjgw7mYQgHnPXzHC5SmBHJsy3tXtRXXayv3b7uAEmiEsuQpfasPBFx4sUkCQA=') format('woff2'),
    url('./iconfont.woff?t=1551531932872') format('woff'),
    url('./iconfont.ttf?t=1551531932872') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
    url('./iconfont.svg?t=1551531932872#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-search:before {
    content: "\e60b";
  }
`;
